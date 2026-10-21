/**
 * Newsletter sheet: the Google Apps Script behind lib/newsletter.ts.
 *
 * Set-up, once (about five minutes):
 *   1. Make a Google Sheet called "ExpertCare market note". Leave it empty; the script writes
 *      the header row itself.
 *   2. In the sheet: Extensions, then Apps Script. Delete what is there, paste this whole file,
 *      save.
 *   3. Deploy, New deployment, type "Web app":
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Authorise it when asked (it only touches this sheet).
 *   4. Copy the "Web app URL" (it ends in /exec) into NEWSLETTER_ENDPOINT in lib/newsletter.ts
 *      and redeploy the site.
 *
 * After any edit to this script: Deploy, Manage deployments, edit, version "New", Deploy, or the
 * live URL keeps running the old code.
 *
 * Each sign-up appends one row. An address already on the sheet is not added twice. To remove
 * someone who unsubscribes, set their Status to "Unsubscribed" (keep the row as the record).
 */
var SHEET_NAME = "Subscribers";
var HEADER = ["Time (Dubai)", "Email", "Topics", "Status", "Page", "Referrer"];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var email = String(p.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return ContentService.createTextOutput("invalid");
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADER);
      sh.getRange(1, 1, 1, HEADER.length).setFontWeight("bold");
      sh.setFrozenRows(1);
    }
    if (sh.getLastRow() > 1) {
      var found = sh.getRange(2, 2, sh.getLastRow() - 1, 1).createTextFinder(email).matchEntireCell(true).findNext();
      if (found) return ContentService.createTextOutput("exists");
    }
    var now = Utilities.formatDate(new Date(), "Asia/Dubai", "yyyy-MM-dd HH:mm");
    sh.appendRow([now, email, String(p.topics || "").slice(0, 200), "Subscribed", String(p.page || "").slice(0, 200), String(p.referrer || "").slice(0, 200)]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}

/** A browser opening the URL directly, so the deployment can be checked. */
function doGet() {
  return ContentService.createTextOutput("newsletter endpoint up");
}
