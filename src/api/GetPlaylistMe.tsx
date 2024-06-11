import axios from 'axios';

const getPlaylistMe = async (token: string) => {
  const playlistUrl = `https://api.spotify.com/v1/me/playlists`;
  const playlistOptions = {
    method: 'GET',
    url: playlistUrl,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios(playlistOptions);
    return response.data;
  } catch (error) {
    console.error('Error getting Spotify playlist:', error);
  }
};

export default getPlaylistMe;