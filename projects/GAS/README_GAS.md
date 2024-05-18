# Google Sheets Airtable Integration 
[Back to Projects](../../index.md) 
## Background
I chose this project to leverage my skills in Google Apps Script and Airtable's API, aiming to simplify data management tasks for non-technical users. The goal was to create a seamless integration that allows users to interact with Airtable data directly from Google Sheets, thereby enhancing workflow efficiency and data accessibility. This project also aligns with my professional development goals of improving my scripting capabilities and providing practical solutions for everyday data management challenges.

## Key Benefits and Discoveries
- **Improved Workflow Efficiency:** The integration significantly reduced the time and effort required to manage and analyze data, making it accessible directly within Google Sheets.
- **Enhanced Data Accessibility:** Non-technical users were able to interact with and manage Airtable data without needing in-depth knowledge of APIs or scripting.
- **Secure Data Handling:** The project ensured secure management of API tokens, protecting sensitive data while maintaining ease of use.
- **Automated Bulk Record Retrieval:** The integration can be configured to automatically retrieve records in bulk from Airtable, simplifying data management and facilitating the development of reports directly in Google Sheets or by connecting the sheet to a BI tool.



## Scripts Overview

### Settings Management
- **settings.gs**: Manages script settings stored within a Google Sheet, allowing non-technical users to adjust script parameters such as API parameters and other database identifiers directly from a dedicated settings sheet.

### Airtable API Integration
- **airtable_api.gs** & **api_wrapper.gs**: Provides a wrapper for Airtable API, facilitating easy data retrieval and management. It supports authentication, pagination, and handling of various data types.

### UI Components & Token Management
- **ui.gs**: Implements a custom menu in Google Sheets, offering options to import records from Airtable, and set or clear the API token. Allows users to securely set and clear API tokens stored in user properties, ensuring that sensitive data is not exposed.
  
### Data Management
- **sheet_operations.gs**: Utilizes the Airtable SDK to fetch data from specified tables and views in Airtable, handling pagination and efficiently importing data into the active Google Sheet. Handles the output of fetched data into Google Sheets, including dynamic
 column header creation based on the data fields from Airtable and formatting of the sheet.

## Installation
1. Open your Google Sheets document.
2. Go to Extensions -> Apps Script.
3. Copy and paste the [script files](https://github.com/RB-DataAnalyst/rb-dataanalyst.github.io/blob/master/projects/GAS) into the script editor.
4. Save and refresh the Google Sheets document to see the custom menu.

## Setup and Authorization

Before using the integration, you need to set up a personal access token in Airtable with specific permissions:

1. **Create a Personal Access Token**: Follow Airtable's guide on [creating personal access tokens](https://support.airtable.com/docs/creating-personal-access-tokens). Ensure that the token has the `data.records:read` scope and access to the intended bases.

2. **Setup in Google Sheets**:
   - Open your Google Sheets document.
   - Navigate to the custom 'Airtable API' menu.
   - Use the 'Set Token' option to enter your full personal access token, not just the Token ID.
   - After setting the token, go to the menu and select "Create Settings Sheet". Then, fill in all required parameters.

## Running the Script

Once the token is set:
- Use the 'Import Records' option from the 'Airtable API' menu in Google Sheets to start importing data.
- You may need to authorize the script to interact with external services like Airtable on its first run.

Make sure to handle authorization prompts from Google to allow the script to run and access the necessary services.

## Integration Behavior with Complex Fields
- **Linked Records:** This integration retrieves the Airtable Record ID of linked records instead of their display values. This approach facilitates more straightforward reporting and data management within Google Sheets, as Record IDs provide consistent references for data integration and updates.
- **Array Fields:** Fields in Airtable that contain an array of records may be ignored or not returned by this integration. This simplifies the data structure for reporting purposes, as arrays can complicate data aggregation and visualization in Google Sheets.

## Security

Token management is handled through Google Apps Script's user properties, ensuring that each user's API token is stored securely and privately.

---

For more information on setting up and using this integration, refer to the detailed documentation within each script file. Each function is well-documented with comments explaining the purpose and usage.

[Back to Projects](../../index.md) 
