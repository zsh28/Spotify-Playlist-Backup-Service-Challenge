import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface Track {
  name: string;
  artists: { name: string }[];
  album: { name: string };
}

interface Playlist {
  name: string;
  tracks: {
    items: {
      track: Track;
    }[];
  };
}

const exportToCSV = (playlist: Playlist): void => {
  const data = playlist.tracks.items.map(item => ({
    'Track Name': item.track.name,
    'Artist': item.track.artists.map(artist => artist.name).join(' & '),
    'Album': item.track.album.name,
  }));

  const csv = Papa.unparse(data);

  // Create a Blob with UTF-8 encoding and a BOM
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${playlist.name}.csv`);
};

export default exportToCSV;
