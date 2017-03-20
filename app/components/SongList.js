import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './SongList.css';

export function SongItem(props) {
  const { song } = props;

  if(song.isRemoved) {
    return <strike>{song.datestring} :  {song.song} by {song.artist}, from {song.album}</strike>;
  } else {
    return (<div>
        <span className={styles.songlist_date}> {song.datestring} : </span>
        <div className={styles.songlist_songname}> {song.song} </div>
        by
        <div className={styles.songlist_artist}> {song.artist} </div>
        from {song.album}
        </div>
    );
  }
}


export function SongList(props) {
  const { song_history, getAndPushNewSongs, toggleSongRemoved } = props;

  const callLastFMClick = () => event => {
      console.log('click');
      getAndPushNewSongs();
  };

  const toggleClick = (timestamp) => event => toggleSongRemoved(timestamp);

  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
      <button onClick={callLastFMClick()}> Click Here to Load</button>
      <br/>
      <div className={styles.innerwrapper}>

        <ul className={styles.songlist_list}>
            {song_history.map(song => (
            <li key={song.timestamp}
                className={styles.songlist_item}
                onClick={toggleClick(song.timestamp)}>
                <SongItem song={song} />
            </li>
            ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

