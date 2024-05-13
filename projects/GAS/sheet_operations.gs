//Functions that directly manipulate the spreadsheet 

/**
 * Imports records from Airtable based on settings and paginates through all available records.
 */
function importRecords() {
  const settings = new Settings();
  settings.init();

  const baseId = settings.getSetting("baseID");
  const tableName = settings.getSetting("TableName");
  const viewId = settings.getSetting("ViewId");

  const sdk = airtableSDK();
  let allRecords = [];
  let offset;

  do {
    const params = { baseId, tableName};
    if (offset) {
      params.offset = offset;
    }
    if (viewName) {
      params.view = viewId;
    }
    console.log("Fetching records with params:", params);
    const response = sdk.getRecords(params);
    allRecords = allRecords.concat(response.records);
    offset = response.offset;
  } while (offset);

  console.log("Total records fetched:", allRecords.length);
  outputToSheet(allRecords, settings);  // Pass settings as a parameter
}

/**
 * Outputs the fetched records into a designated Google Sheet.
 * @param {Array} records - The records to be written to the sheet.
 * @param {Settings} settings - The settings instance to retrieve sheet configuration.
 */
function outputToSheet(records, settings) {
  const sheetName = settings.getSetting("DestinationSheet");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  const totalRows = sheet.getMaxRows();
  if (totalRows > 1) {
    sheet.getRange(2, 1, totalRows - 1, sheet.getMaxColumns()).clearContent();
  }

  if (records.length === 0) {
    console.log("No records to write.");
    return;
  }

  const headers = ['Record ID', ...Object.keys(records[0].fields)];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const data = records.map(record => {
    return [record.id, ...headers.slice(1).map(header => record.fields[header] || "")];
  });

  if (data.length > 0) {
    if (data.length + 1 > totalRows) {
      sheet.insertRowsAfter(totalRows, data.length + 1 - totalRows);
    }
    sheet.getRange(2, 1, data.length, headers.length).setValues(data);
  }

  console.log("Data written to the sheet");
}

