/**
 * This script includes functions adapted from the GoogleSheetSettings.js by Dimitris Paxinos.
 * Source: https://gist.github.com/dimitrispaxinos/7eda38c7faf8f55910e056a77a2fc737
 * Accessed on: 5/11/2024
 *
 * This script is used to manage Google Sheets settings directly via a custom UI, allowing for dynamic configuration by users.
 */

/**
 * Constants for boolean settings values.
 */
const YES = 'Yes';
const NO = 'No';

/**
 * The Settings class provides a way to manage script parameters/settings 
 * directly within a Google Sheet, making it accessible for non-technical users.
 */
class Settings {

  /**
   * Constructor initializes the settings sheet and map.
   * @param {string} [sheetName="Settings"] - Name of the sheet where settings are stored.
   */
  constructor(sheetName = "Settings") {
    this.sheetName = sheetName;
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    this.settingsSheet = this.spreadsheet.getSheetByName(sheetName);
    this.settingsMap = this.initSettingsMap();
  }

  /**
   * Initializes the settings sheet if it doesn't exist.
   */
  init() {
    if (!this.settingsSheet) {
      this.settingsSheet = this.spreadsheet.insertSheet(this.sheetName);
      this.settingsSheet.appendRow(['Setting', 'Value', 'Description']);
      this.settingsSheet.getRange('1:1').setFontWeight('bold');
      this.settingsSheet.appendRow(['baseID', '', 'REQUIRED: Enter the Airtable Base ID from the Developer API documentation or URL.']);
      this.settingsSheet.appendRow(['TableName', '', 'REQUIRED: Enter the exact, case-sensitive name or ID of the Airtable table from the Developer API documentation or URL.']);
      this.settingsSheet.appendRow(['ViewId', '', 'Optional: Enter the Airtable View ID from the URL.']);
      this.settingsSheet.appendRow(['DestinationSheet', '', 'REQUIRED: Specify the exact, case-sensitive name of the Google Sheets tab where data will be imported. Existing contents will be cleared!']);
    }
  }

  /**
   * Initializes the settings map from the sheet data.
   * @returns {Map} - A map of settings.
   */
  initSettingsMap() {
    if (!this.settingsSheet) return new Map();

    const data = this.settingsSheet.getDataRange().getValues();
    const map = new Map();

    for (const [key, value] of data) {
      map.set(key, value);
    }

    return map;
  }

  /**
   * Sets or updates a setting in the sheet.
   * @param {string} settingName - Name of the setting.
   * @param {string} settingValue - Value of the setting.
   */
  setSetting(settingName, settingValue) {
    const rowIndex = [...this.settingsMap.keys()].indexOf(settingName) + 1;

    if (rowIndex > 0) {
      this.settingsSheet.getRange(rowIndex, 2).setValue(settingValue);
    } else {
      this.settingsSheet.appendRow([settingName, settingValue]);
    }

    this.settingsMap.set(settingName, settingValue);
  }

  /**
   * Retrieves a setting's value from the map.
   * @param {string} settingName - Name of the setting.
   * @returns {string|null} - Value of the setting or null if not found.
   */
  getSetting(settingName) {
    return this.settingsMap.get(settingName) || null;
  }

  /**
   * Retrieves a boolean setting's value.
   * @param {string} settingName - Name of the setting.
   * @returns {boolean|null} - True if 'Yes', False if 'No', or null if neither.
   */
  getBooleanSetting(settingName) {
    const settingValue = this.getSetting(settingName);

    if (settingValue === YES) return true;
    if (settingValue === NO) return false;

    Logger.log(`Setting value is not ${YES} or ${NO}: ${settingName}`);
    return null;
  }
}

function generateSettings() {
  const settings = new Settings();
  settings.init();
}
