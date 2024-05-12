//Functions related to Airtable API interaction

/**
 * Initializes the Airtable SDK with authentication and method configurations.
 * @return {Object} An instance of APIWrapperBuilder configured for Airtable.
 */
function airtableSDK() {
  return new APIWrapperBuilder(`https://api.airtable.com/v0`, {
    type: 'Bearer',
    addTo: 'headers',
    token: getApiToken(),
  })
    .addMethod('getRecords', {
      path: '/{{baseId}}/{{tableName}}',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      queryParams: {
        offset: '{{offset}}'
      }
    })
    .build();
};

/**
 * Retrieves the stored API token for Airtable API from user properties.
 * @return {string|null} The retrieved API token or null if not set.
 */
function getApiToken() {
  const properties = PropertiesService.getUserProperties();
  const apiToken = properties.getProperty('airtableApiToken');
  return apiToken;
};


