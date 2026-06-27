import { AuthClient, RestliClient } from 'linkedin-api-client';
import express from "express";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(import.meta.dirname, '../../.env') });
const app = express();
const port = 3000;

const restliClient = new RestliClient();
const authClient = new AuthClient({
  clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_LINKEDIN_CLIENT_SECRET || '',
  redirectUrl: process.env.REACT_APP_LINKEDIN_REDIRECT_URI || ''
});


app.get('/linkedin/callback', async (req, res) => {
  const code = req.query.code as string;
  
  const tokenData = await authClient.exchangeAuthCodeForAccessToken(code);

  const { data, headers } = await restliClient.get({
  resourcePath: '/verificationReport',
  accessToken: tokenData.access_token,
  versionString: '202510'
  });
  console.log('User Info:', data);
  console.log("headers", headers)
  res.send('LinkedIn authentication successful!.');
});

app.listen(port, () => {
  console.log(`Visit this URL:`);
  const authUrl = authClient.generateMemberAuthorizationUrl(['r_verify']);
  console.log(authUrl);
});
