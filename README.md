# Spotify Playlist Backup Service

This project is a web application built with React.js that allows users to back up their Spotify playlists. Users can log in with their Spotify account, view their playlists, select a playlist to back up, and export the playlist data to a CSV file.

## Features

- **Spotify Authentication**: Securely log in with your Spotify account to access your playlists.
- **Fetch Playlists**: Retrieve and display all your Spotify playlists.
- **Fetch Playlist by ID**: Enter a playlist ID to fetch and display a specific playlist.
- **Export to CSV**: Export the selected playlist's details (track name, artist, album) to a CSV file for backup.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **FileSaver**: A library to save files on the client-side.
- **Spotify Web API**: The API used to fetch playlists and track details.
- **Papaparse**: A powerful CSV library for parsing and generating CSV files.

## Getting Started

### Prerequisites

- Node.js 
- A Spotify Developer account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zsh28/Spotify-Playlist-Backup-Service-Challenge.git
   cd spotify-playlist-backup
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root of the project and add your Spotify API credentials:

   ```bash
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/
   ```

4. Start the development server:

   ```bash
   npm run start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### Usage

1. Log in with your Spotify account.
2. Use the input field to enter a playlist ID and fetch the playlist details.
3. Alternatively, select a playlist from the dropdown menu to fetch its details.
4. Click the "Export to CSV" button to download the playlist details as a CSV file.
