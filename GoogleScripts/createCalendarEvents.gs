/**
 *  This script will create fortnightly calendar events in your team calendar.
 *  There is an associated spreadsheet which stores the team member's emails and rotates them so everyone
 *   in the team both gives and receives feedback from someone new every fortnight.
 *
 *  Ensure the file createTrigger.gs is run to create the trigger to run this file.
 *  You do not need to run this file manually.
 */
function feedbackLoops() {
  //set constants
  var TWO_WEEKS_MILLIS = 1000 * 60 * 60 * 24 * 14;
  var TEN_MINS_MILLIS = 1000 * 60 * 10;

  //get the spreadsheet's sheet
  var spreadsheet = SpreadsheetApp.openById(""); //ADD YOUR SPREADSHEET ID HERE
  SpreadsheetApp.setActiveSpreadsheet(spreadsheet);
  var sheet = SpreadsheetApp.getActiveSheet();

  //get the calendar to insert events into - ADD YOUR CALENDAR ID HERE
  var teamCalendar = "";

  //rotate names in the spreadsheet
  moveValues(sheet);
  if (
    sheet.getRange("A2").getDisplayValue() ==
    sheet.getRange("B2").getDisplayValue()
  ) {
    moveValues(sheet);
  }

  //get the new starting date/time for the given week
  var dateInMillis = new Date().setHours(13, 0, 0) + TWO_WEEKS_MILLIS; //today @ 1pm + 2 weeks in millis

  //create calendar events
  var data = sheet.getRange("A2:B8").getValues(); //MODIFY THIS RANGE DEPENDING ON THE SIZE OF YOUR TEAM
  for (var i = 0; i < data.length; i++) {
    var start = new Date(dateInMillis);
    var finish = new Date(dateInMillis + TEN_MINS_MILLIS);
    dateInMillis = dateInMillis + TEN_MINS_MILLIS;

    var event = {
      start: {
        dateTime: start.toISOString(),
      },
      end: {
        dateTime: finish.toISOString(),
      },
      attendees: [{ email: data[i][0] }, { email: data[i][1] }],
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
          requestId: Utilities.getUuid(),
        },
      },
      summary: "Feedback Loop",
      description:
        data[i][0].toString().split(".")[0] +
        " --> " +
        data[i][1].toString().split(".")[0],
    };

    Calendar.Events.insert(event, teamCalendar, { conferenceDataVersion: 1 });
    Logger.log("sent invite to: " + data[i][0] + " and " + data[i][1]);
  }
}

/**
 * Move all values in the Receive Feedback column down 1 row, and move the bottom row
 * back to the top.
 * If the team size changes, these values will need to be altered accordingly.
 */
function moveValues(sheet) {
  sheet.getRange("B2:B8").moveTo(sheet.getRange("B3:B9"));
  sheet.getRange("B9").moveTo(sheet.getRange("B2"));
}
