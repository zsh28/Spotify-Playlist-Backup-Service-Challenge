import axios from 'axios';

const getAuthToken = async (code: string) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error('Missing environment variables for Spotify API.');
    return;
  }

  const tokenOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  };
    const response = await axios(tokenOptions);
    console.log('response of get auth:', response);
    const token = response.data.access_token;
    //store this token in local storage
    localStorage.setItem('spotify_access_token', token);
    return token;
};

// Function to redirect to Spotify login
export const redirectToSpotifyLogin = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error('Missing environment variables for Spotify API.');
    return;
  }

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-read-private`;
  window.location.href = spotifyAuthUrl;
};

export default getAuthToken;
