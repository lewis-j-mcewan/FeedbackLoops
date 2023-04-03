# FeedbackLoops

FeedbackLoops is a system where each team member is matched with two other team members to both provide and receive feedback.

### How it works

The provided script makes creating calendar events (with Google Meet) for this easy.<br />
Starting at a given time, a new event will be created in the team calendar for every person, each spread 10mins apart. Each event will have two team members (feedback provider & feedback receiver). At the end of the Feedback Loop session you should have given feedback to one person, and received feedback from another person.<br />
Although this suggests a time and creates events, participants have the freedom to move this event should the time not suit.

### Setup

- Create a Google Apps Script in your team's Google Drive folder and copy/paste the `createCalendarEvents.gs` script into it.
- On the left-hand side, add the two services `Google Calendar API` and `Google Sheets API`.
- Modify the script to use your team calendar's ID.
- Create a spreadsheet with two columns. Populate these columns with the team's emails.
  - 1st column providing feedback, 2nd column receiving feedback
  - See example csv file.
- Modify the script to use the new spreadsheet's ID
  - in the URL this will be `spreadsheets/d/*ID*/edit`
- Modify the script by adjusting the range the spreadsheet data is retrieved from
  - this will be in both the "data" variable, and the moveValues() function
- Create another Apps Script file called `createTrigger.gs` and copy/paste the code from the file of the same name into it.
- Run your `createTrigger.gs` file
  - This will create an "Installable trigger" that you can see in the Triggers menu.
  - Since this trigger has been created, it will automatically run your `createCalendarEvent.gs` file on the time frequency set by the trigger.
- Bob's your Uncle
