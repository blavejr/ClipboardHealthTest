# Tickets

## Ticket 1: Add Agent custom id field to database
## Acceptance Criteria
- A new field called agent_custom_id is added to the Agents table in the database
- The agent_custom_id field is nullable and can be left empty if the Facility hasn't saved a custom id for the Agent
## Implementation

- Open the database schema in a database management tool
- Add the agent_custom_id field to the Agents table
- Save and deploy the updated schema

Time/Effort Estimate
2 hours
## Notes

- This ticket should be completed before starting any other tickets in this series, as the other tickets will depend on the existence of the agent_custom_id field.
- This ticket should be tested by running a query to verify that the agent_custom_id field has been added to the Agents table.

## Ticket 2: Update getShiftsByFacility function to include Agent custom id
## Acceptance Criteria

- The getShiftsByFacility function is updated to include the agent_custom_id field in the returned Shift metadata, if it exists
- If the agent_custom_id field is empty or null, the getShiftsByFacility function should continue to return the internal database id for the Agent
## Implementation

- Open the file containing the getShiftsByFacility function
- Modify the function to include the agent_custom_id field in the returned Shift metadata if it exists, otherwise return the internal database id for the Agent
- Test the updated getShiftsByFacility function to ensure it is returning the correct information
Time/Effort Estimate

1 hour
## Notes

- This ticket should be completed after Ticket 1, as it depends on the agent_custom_id field being added to the database.
- This ticket should be tested by calling the getShiftsByFacility function with a Facility id and verifying that the returned Shift metadata includes the agent_custom_id field if it exists, or the internal database id if it doesn't.


## Ticket 3: Update generateReport function to use Agent custom id
## Acceptance Criteria

- The generateReport function is updated to use the agent_custom_id field from the Shift metadata, if it exists, when generating the report PDF
- If the agent_custom_id field is empty or null, the generateReport function should continue to use the internal database id for the Agent
## Implementation

- Open the file containing the generateReport function
- Modify the function to use the agent_custom_id field from the Shift metadata, if it exists, when generating the report PDF
- Test the updated generateReport function to ensure it is generating the report PDF correctly
Time/Effort Estimate

1.5 hours
## Notes

- This ticket should be completed after Ticket 2, as it depends on the getShiftsByFacility function being updated to include the agent_custom_id field.
- This ticket should be tested by calling the generateReport function with Shift data that includes the agent_custom_id field and verifying that the generated PDF uses the custom id for the Agent.

## Ticket 4
Summary
- Add the ability for Facilities to save their own custom ids for each Agent they work with.

## Acceptance Criteria
- The Facility should be able to specify a custom id for each Agent they work with
- The custom id should be saved in the database in the Agents table
- The custom id should be displayed on the Facility's report in place of the internal database id
Time/Effort Estimate
Analysis and design: 2 hours
Development: 4 hours
Testing: 2 hours

## Implementation Details
- Add a new custom_id field to the Agents table in the database.
- When a Facility is creating or updating an Agent's information, allow them to specify a custom id.
- When generating the report, use the custom id in place of the internal database id if it exists. If it does not exist, use the internal database id.

## Ticket 5
Summary
- Update the generateReport function to use the custom id for Agents on reports.

## Acceptance Criteria
- The generateReport function should use the custom id for each Agent if it exists, otherwise it should use the internal database id
- The reports generated should display the correct id for each Agent
Time/Effort Estimate
Analysis and design: 1 hour
Development: 2 hours
Testing: 1 hour

## Implementation Details
- Update the generateReport function to check for a custom id for each Agent in the list of Shifts passed to it.
- If a custom id exists, use it in the report. If it does not exist, use the internal database id.
- Test the generateReport function to ensure it is using the correct id for each Agent on the report.


