import { useEffect, useState } from "react";
import getAuthToken, { redirectToSpotifyLogin } from "./api/GetAuthToken";
import getPlaylist from "./api/GetPlaylist";
import exportToCSV from "./utils/export";
import getPlaylistMe from "./api/GetPlaylistMe";

interface Playlist {
  name: string;
  tracks: {
    items: {
      track: {
        name: string;
        artists: { name: string }[];
        album: { name: string };
      };
    }[];
  };
}

interface UserPlaylist {
  id: string;
  name: string;
}

const App = () => {
  const [playlistId, setPlaylistId] = useState<string>("");
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Exchange the code for an access token
      getAuthToken(code)
        .then((token) => {
          if (token) {
            localStorage.setItem("spotify_access_token", token);
            setAccessToken(token);
            fetchUserPlaylists(token);
          }
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    } else {
      const token = localStorage.getItem("spotify_access_token");
      if (token) {
        setAccessToken(token);
        fetchUserPlaylists(token);
      }
    }
  }, []);

  const fetchUserPlaylists = async (token: string) => {
    try {
      const data = await getPlaylistMe(token);
      setUserPlaylists(data.items.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
      })));
    } catch (error) {
      console.error("Error fetching user playlists:", error);
    }
  };

  const fetchPlaylist = async (id: string) => {
    if (!id) {
      console.error("Playlist ID is required");
      return;
    }

    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      try {
        const data = await getPlaylist(id, token);
        setPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    } else {
      redirectToSpotifyLogin();
      console.error("No access token found");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spotify Playlist Backup</h1>
      {!accessToken ? (
        <button
          onClick={redirectToSpotifyLogin}
          className="bg-blue-500 text-white p-2"
        >
          Log in to Spotify
        </button>
      ) : (
        <div>
          <div className="mb-4">
          <select
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              className="border p-2 mr-2"
            >
              <option value="">Select from your saved playlist</option>
              {userPlaylists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter Playlist ID"
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              className="border p-2 mr-2"
            />
            <button
              onClick={() => fetchPlaylist(playlistId)}
              className="bg-blue-500 text-white p-2"
            >
              Fetch Playlist by ID
            </button>
            {playlist && (
              <button
                onClick={() => exportToCSV(playlist)}
                className="bg-green-500 text-white p-2 ml-2"
              >
                Export to CSV
              </button>
            )}
          </div>
          {playlist && (
            <div>
              <h2 className="text-xl font-bold mb-4">{playlist.name}</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Track Name</th>
                    <th className="py-2">Artist</th>
                    <th className="py-2">Album</th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.tracks.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.track.name}</td>
                      <td className="py-2">{item.track.artists.map((artist) => artist.name).join(", ")}</td>
                      <td className="py-2">{item.track.album.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
