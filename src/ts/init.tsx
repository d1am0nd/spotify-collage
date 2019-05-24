import {spotify} from '../env/services';
const scope = 'user-top-read';

const LOCAL_STORAGE_TOKEN = 'LOCAL_STORAGE_TOKEN';

type HashParams = 'access_token' | 'expires_in';

export const setLink = () => {
  const {protocol, hostname} = window.location;
  const url = `https://accounts.spotify.com/authorize`
    + `?client_id=${spotify.clientId}`
    + `&response_type=token`
    + `&redirect_uri=${protocol}//${hostname}/`
    + `&scope=${scope}`;

  document
    .getElementById('spotify-login')
    .setAttribute('href', url);

  document
    .getElementById('spotify-login')
    .style
    .display = 'visible';
};

export const removeLink = () => {
  document
    .getElementById('spotify-login')
    .style
    .display = 'none';
};

export interface IToken {
  accessToken: string;
  expires: string; // Parsable by new Date()
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};

const getTokenFromStorage = (): IToken | undefined => {
  // Check if a token is already stored in local storage
  const item = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  if (!item) {
    return;
  }

  // Parse the JSON
  const parsed = JSON.parse(item) as {
    accessToken: string;
    expires: string;
  };;

  // If token is expired, delete it from local storage
  // and return undefined
  if (new Date() > new Date(parsed.expires)) {
    removeTokenFromStorage();
    return;
  }

  // If all is good, return the existing token
  return parsed;
};


const getTokenFromHash = (): IToken | undefined => {
  // Get hash and remove #
  // should leave us with access_token=x&expires=y
  const hash = window.location.hash.substring(1);

  if (hash.length === 0) return;

  window.location.hash = '';

  // Parse the hash params into a map
  const params = hash
    .split('&')
    // Filter only params that have exactly 1 = sign
    .filter((param) => (param.match(/=/g) || []).length === 1)
    .reduce((carry, param) => {
      const [key, val] = param.split('=');
      carry.set(key as HashParams, val);
      return carry;
    }, new Map<HashParams, string>());

  // If expected params are not found, return undefined
  if (!params.has('access_token') || !params.has('expires_in')) return;

  const expiresDate = new Date();
  expiresDate.setSeconds(
    new Date().getSeconds() + parseInt(params.get('expires_in'))
  );

  // Make a token object from map
  const token = {
    accessToken: params.get('access_token'),
    expires: expiresDate.toString(),
  };

  // Store it to localStorage
  localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(token));
  return token;
}

export const getToken = (): IToken | undefined => {
  return getTokenFromStorage() || getTokenFromHash();
};
