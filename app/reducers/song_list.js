import { List, Map } from 'immutable';

const song_init = List([]);
//expect array elements to be dictionaries with {datestring,
//timestamp, artist, mbid, album, song, image, isRemoved}

export default function song_list(song_history=song_init, action) {
  switch(action.type) {
    case 'PUSH_ONE_SONG':
      return [...song_history, action.songlist];
    case 'PUSH_NEW_SONGS':
      return [...action.songlist,
              ...song_history];
    case 'REPLACE_SONGS':
      return action.songlist;
    case 'TOGGLE_SONG_REMOVE':
      return song_history.map(song => {
        if(song.timestamp === action.timestamp) {
          return Object.assign({}, song, {isRemoved: !song.isRemoved});
        } else {
          return song;
        }
      });
    default:
      return song_history;
  }
}

