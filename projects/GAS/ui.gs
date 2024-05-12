// Functions that handle user interactions through the Google Sheets UI

/**
 * Sets up the custom menu in Google Sheets UI for Airtable API interactions.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('Airtable API');

  menu.addItem('Import Records', 'importRecords');
  menu.addItem('Create Settings Sheet', 'generateSettings');

  // Creating a submenu for token settings
  const tokenMenu = ui.createMenu('Token Settings');
  tokenMenu.addItem('Set Token', 'setApiToken')
           .addItem('Clear Token', 'clearApiToken');
  menu.addSubMenu(tokenMenu);

  menu.addToUi();
};

/**
 * Prompts the user to set the API token for Airtable API.
 */
function setApiToken() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt('Set API Token',
    'Please enter your API token:',
    ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    const apiToken = response.getResponseText().trim();
    const properties = PropertiesService.getUserProperties();
    properties.setProperty('airtableApiToken', apiToken);
    ui.alert('API Token set successfully.');
  } else {
    ui.alert('No changes made.');
  }
};

/**
 * Clears the stored API token for Airtable API from user properties.
 */
function clearApiToken() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('Clear API Token',
    'Are you sure you want to clear the API token?',
    ui.ButtonSet.YES_NO);

  if (response === ui.Button.YES) {
    const properties = PropertiesService.getUserProperties();
    properties.deleteProperty('airtableApiToken');
    ui.alert('API Token cleared successfully.');
  } else {
    ui.alert('No changes made.');
  }
};
