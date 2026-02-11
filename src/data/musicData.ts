// Data-driven playlist and album test cases
export interface PlaylistTestCase {
  playlistName: string;
  songName: string;
  shouldExist: boolean;
  description: string;
}

export interface AlbumTestCase {
  filter: string;
  shouldFind: boolean;
  description: string;
}

export const playlistData: PlaylistTestCase[] = [
  { playlistName: 'Favourites', songName: 'My latin way', shouldExist: true, description: 'Add valid song to playlist' },
  { playlistName: 'Favourites', songName: 'Nonexistent Song', shouldExist: false, description: 'Try to add non-existent song' }
];

export const albumData: AlbumTestCase[] = [
  { filter: 'fairytale', shouldFind: true, description: 'Filter with existing album/song' },
  { filter: 'NonexistentAlbum', shouldFind: false, description: 'Filter with non-existent album' },
  { filter: 'first words', shouldFind: true, description: 'Filter with existing album/song 2' },
  { filter: 'Nonexistent', shouldFind: false, description: 'Filter with non-existent album 2' },
];
