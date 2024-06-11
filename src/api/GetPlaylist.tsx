import axios from 'axios';

const getPlaylist = async (playlistId: string, token: string) => {
  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
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

export default getPlaylist;
