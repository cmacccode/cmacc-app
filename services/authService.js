const fetch = require('node-fetch');
const querystring = require('querystring');

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET
const redirectUri = process.env.GITHUB_REDIRECT_URI

const base = process.env.ENDPOINT_BASE
const apiBase = process.env.API_BASE

const getToken = function (code) {

  const input = {
    client_id: clientId,
    redirect_uri: redirectUri,
    client_secret: clientSecret,
    code: code,
  };

  const url = `${base}/login/oauth/access_token?` + querystring.stringify(input);
  const opts = {
    method: 'POST',
  };

  return fetch(url, opts)
    .then(x => x.text())
    .then(x => {
      const res = querystring.parse(x)
      return res['access_token']
    })
    .catch(console.log)
};

module.exports = {
  getToken
};