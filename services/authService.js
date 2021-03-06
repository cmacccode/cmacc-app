const fetch = require('node-fetch');
const querystring = require('querystring');

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET
const redirectUri = process.env.GITHUB_REDIRECT_URI

const authUrl = process.env.GITHUB_AUTH_URL;

const getToken = function (code) {

  const input = {
    client_id: clientId,
    redirect_uri: redirectUri,
    client_secret: clientSecret,
    code: code,
  };

  const url = `${authUrl}/access_token?${querystring.stringify(input)}`;
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  };

  return fetch(url, opts)
    .then(x => x.json())
    .then(x => {
      return x;
    })
    .then(x => {
      return x['access_token']
    })
    .catch(console.error)
};

module.exports = {
  getToken
};