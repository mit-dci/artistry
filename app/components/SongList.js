import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './SongList.css';

export function SongItem(props) {
  //TODO change image_paths to dictionary

  const { song, image_paths, getImage } = props;
  console.log('SONG ITEM-------');
  console.log(song);
  console.log(song.image);
  console.log(song['image']);
  console.log(image_paths);
  getImage(song.image);

  let songSource = ''; //should be default in case load fails
  for (let i =0; i<image_paths.length; i++){
    if (image_paths[i]['imageUrl'] == song.image){
      songSource = image_paths[i]['path'];
    }
  }

  if(song.isRemoved) {
    return <strike>{song.datestring} :  {song.song} by {song.artist}, from {song.album}</strike>;
  } else {
    return (<div>
        <img src={songSource}/>
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
  const { song_history, image_paths, getImage, getAndPushNewSongs, toggleSongRemoved } = props;

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
                <SongItem song={song} image_paths={image_paths} getImage={getImage}/>
            </li>
            ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

