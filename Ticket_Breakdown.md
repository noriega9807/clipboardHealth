# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1 Create customized ID functionality
- Create a new field on the Agents model called custom_id. This field should be a string, unique and can be null.
- Modify the model in the code to add the new field.
- Add to the save functionality the custom_id, this value must be encrypted.
- Add tests.
- Criteria: 
  - if the custom_id is longer than 50, it should be rejected.

### 2 Add custom_id in the UI
- Add to the UI the field to save the custom id.
- Validate that the length of the field is no longer than 50 and it doesn't contain any special characters, otherwise it should show a message indicating that the custom_id should be shorter than 50.
- Add the field to the formData, so the save functionality receives the value.
- Write tests
- Criteria
  - if the custom_id is longer than 50 or has a special character, it should show a message indicating it.
  - The field must complain to the specs as specified in figma. I'll asume we have figma and we can check the design there.

### 3 Create getAgentID function to return the id of the Agent
- Create a function that receives an Agent object that checks if the custom_id is set and is not an empty string and if so, return tha value decrypted, otherwise return the id. 
- Write 2 different test cases when an Agent has a custom_id and one where he doesn't

### 4 Modify getShiftsByFacility to get custom_id
- Call within getShiftsByFacility the function getAgentID, once we have the data from the Agents and assign the returned value to the Agent object.

### 4 Modify generateReport
- This function should show the returned value from ticket 4 instead of the id