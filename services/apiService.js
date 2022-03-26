import { create } from 'apisauce'

export const apiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: ' http://a76d-210-18-157-68.ngrok.io',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // need to add User Token here which is get from Login API
    Authorization: '',
  },
  timeout: 10000,
});

/**
 * @param {string} endpoint contains the api endpoint to hit API service call
 * @param {string} token contains the auth token
 * @returns {Object} api response
 */
function getApi(endpoint, token) {
  if (token) {
    apiClient.setHeader('Authorization', 'Bearer ' + token)
  }
  console.log('endpoint', endpoint)
  return apiClient.get(endpoint)
}

/**
 * @param {string} endpoint contains the api endpoint to hit API service call
 * @param {Object} data contains the request informations to hit API service call
 * @param {string} token contains the auth token
 * @returns {Object} api response
 */
function postApi(endpoint, data, token) {
  if (token) {
    apiClient.setHeader('Authorization', 'Bearer ' + token)
  }
  return apiClient.post(endpoint, data)
}
/**
 * @param {string} endpoint contains the api endpoint to hit API service call
 * @param {Object} data contains the request informations to hit API service call
 * @param {string} token contains the auth token
 * @returns {Object} api response
 */
function putApi(endpoint, data, token) {
  if (token) {
    apiClient.setHeader('Authorization', 'Bearer ' + token)
  }
  return apiClient.put(endpoint, data)
}

/**
 * @param {string} endpoint contains the api endpoint to hit API service call
 * @param {string} token contains the auth token
 * @returns {Object} api response
 */
function deleteApi(endpoint, token) {
  if (token) {
    apiClient.setHeader('Authorization', 'Bearer ' + token)
  }
  return apiClient.delete(endpoint)
}

export const ApiService = {
  getApi,
  postApi,
  putApi,
  deleteApi,
}
