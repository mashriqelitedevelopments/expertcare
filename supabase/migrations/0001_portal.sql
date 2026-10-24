-- ExpertCare listings portal: listings managed by admins, enquiries and newsletter sign-ups from the
-- public site. The public site is a static export: it only ever uses the anon key, which may read
-- published listings and insert enquiries and sign-ups, nothing else.

create extension if not exists pgcrypto;

-- Admins: auth users allowed into /admin. Add a row after the person has signed up once.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Listings: one row per project or home, in the shape the site's build reads (lib/listings.ts).
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 120),
  ref text not null default '',
  title text not null check (length(title) between 1 and 160),
  developer text not null default '',
  developer_url text not null default '',
  community text not null default '',
  area text,
  types text[] not null default '{Apartment}' check (types <@ array['Apartment','Penthouse','Villa','Townhouse']::text[] and cardinality(types) >= 1),
  status text not null default 'off-plan' check (status in ('off-plan','ready')),
  price bigint check (price is null or price > 0),
  price_note text,
  beds int not null default 1 check (beds between 0 and 20),
  beds_max int not null default 1 check (beds_max between 0 and 20),
  size int check (size is null or size > 0),
  summary text not null default '',
  description text[] not null default '{}',
  features text[] not null default '{}',
  amenities text[] not null default '{}',
  handover text,
  plan jsonb,
  plan_label text,
  permit text not null default '',
  project_number text not null default '',
  escrow text not null default '',
  source text not null default '',
  checked date not null default current_date,
  -- [{ "key": "p/<slug>-1" }] for images already built into the site, or
  -- [{ "path": "<slug>/<file>.jpg" }] for uploads in the "listings" storage bucket; both carry "alt".
  images jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index listings_published_sort on public.listings (published, sort);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger listings_touch before update on public.listings for each row execute function public.touch_updated_at();

-- Enquiries: every form on the site. The visitor's WhatsApp or email hand-off still happens; this is the record.
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  intent text not null check (intent in ('viewing','brief','general','valuation','landlord','tenant')),
  name text not null check (length(name) between 1 and 120),
  phone text not null default '' check (length(phone) <= 40),
  email text not null default '' check (length(email) <= 160),
  context text not null default '' check (length(context) <= 300),
  unit text not null default '' check (length(unit) <= 20),
  fields jsonb not null default '{}'::jsonb check (pg_column_size(fields) <= 8000),
  page text not null default '' check (length(page) <= 300),
  referrer text not null default '' check (length(referrer) <= 200),
  status text not null default 'new' check (status in ('new','contacted','viewing','closed','spam')),
  notes text not null default '',
  updated_at timestamptz not null default now()
);
create index enquiries_created on public.enquiries (created_at desc);
create trigger enquiries_touch before update on public.enquiries for each row execute function public.touch_updated_at();

-- Newsletter sign-ups (the market note).
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 160),
  topics text[] not null default '{}',
  page text not null default '' check (length(page) <= 300),
  status text not null default 'subscribed' check (status in ('subscribed','unsubscribed'))
);

-- Row-level security.
alter table public.admins enable row level security;
alter table public.listings enable row level security;
alter table public.enquiries enable row level security;
alter table public.subscribers enable row level security;

create policy admins_self_read on public.admins for select to authenticated using (user_id = auth.uid() or public.is_admin());

create policy listings_public_read on public.listings for select to anon, authenticated using (published or public.is_admin());
create policy listings_admin_write on public.listings for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy enquiries_public_insert on public.enquiries for insert to anon, authenticated
  with check (status = 'new' and notes = '');
create policy enquiries_admin_read on public.enquiries for select to authenticated using (public.is_admin());
create policy enquiries_admin_update on public.enquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy enquiries_admin_delete on public.enquiries for delete to authenticated using (public.is_admin());

create policy subscribers_public_insert on public.subscribers for insert to anon, authenticated with check (status = 'subscribed');
create policy subscribers_admin_all on public.subscribers for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Grants: Supabase gives anon broad table grants by default; narrow them to what the policies allow.
revoke all on public.admins, public.listings, public.enquiries, public.subscribers from anon;
grant select on public.listings to anon;
grant insert on public.enquiries, public.subscribers to anon;
grant select, insert, update, delete on public.listings, public.enquiries, public.subscribers to authenticated;
grant select on public.admins to authenticated;

-- Storage: listing photos, public to read, admins to write.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('listings', 'listings', true, 15728640, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy listings_images_admin_insert on storage.objects for insert to authenticated with check (bucket_id = 'listings' and public.is_admin());
create policy listings_images_admin_update on storage.objects for update to authenticated using (bucket_id = 'listings' and public.is_admin());
create policy listings_images_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'listings' and public.is_admin());
