import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import { SongList } from '../components/SongList';
import { getImage, getAndPushSongs, toggleSongRemoved } from '../actions/actions';


export const SongHistory = connect(
  function mapStateToProps(state) {
    return { song_history: state.song_list,
             image_paths: state.image_paths };
  },
  function mapDispatchToProps(dispatch) {
    return {
      getImage: () => { dispatch(getImage()) },
      getAndPushNewSongs: () => { dispatch(getAndPushSongs()) },
      toggleSongRemoved: (timestamp) => { dispatch(toggleSongRemoved(timestamp)) }
    };
  }
)(SongList);

export default class ListeningHistory extends Component {

  render() {
    return (
     <div style={{'height':'100%', 'width':'100%', 'position':'relative'}}>
      <Menu selected='listening_history'/>
      <SongHistory />
    </div>
    );
  }
}
