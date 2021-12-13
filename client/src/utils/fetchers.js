/**
 * @param {Response} response
 * @returns
 */
const fetchError = async (response) =>
  new Error(`Failed to fetch. Occurred ${response.status} error. ${response.statusText}`);

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });

  if (!response.ok) {
    throw fetchError(response);
  }

  return response.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw fetchError(response);
  }

  return response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    data: file,
  });

  if (!response.ok) {
    throw fetchError(response);
  }

  return response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);

  const res = await fetch(url, {
    method: 'POST',
    body: jsonString,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw fetchError(response);
  }

  return res.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
