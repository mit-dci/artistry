import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import { SongList } from '../components/SongList';
import { getAndPushSongs, toggleSongRemoved } from '../actions/actions';


export const SongHistory = connect(
  function mapStateToProps(state) {
    return { song_history: state.song_list };
  },
  function mapDispatchToProps(dispatch) {
    return {
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
