/**
 * Creates a time-driven trigger.
 * Run this file on it's own for a new trigger to appear in the triggers section of the Google Apps Script
 * @see https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers
 */
function createFeedbackLoopTimeDrivenTrigger() {
  // Trigger on Tuesday every 2 weeks
  ScriptApp.newTrigger("feedbackLoops")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.TUESDAY)
    .everyWeeks(2)
    .create();
}
