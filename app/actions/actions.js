import { getListeningHistory } from '../lastfm_hack/lastfmlib';
var http = require("http"),
    fs = require("fs");

function getImageFileAndSave(imageUrl, cb){
//actually get image and save to path
    console.log('getImageFileAndSave');
    const options = {
        host: '',
        port: 80,
        path: imageUrl,
        method: "GET",
    };

    let path = './images/'+imageUrl +'.png';
    console.log(path);

    let req = http.get(options, function(res){
        let imagedata = ''
        res.setEncoding('binary')

        res.on('data', function(chunk){
            imagedata += chunk
        })

        res.on('end', function(){
            fs.writeFile(path, imagedata, 'binary', function(err){
                if (err) throw err
                console.log('File saved.')
                cb(path);
            })
        })


  });
}

export function getImage(imageUrl) {
    //step 1. check store for cached image
    //add if not there
    //update timestamp if there
    console.log('getImage - ' + imageUrl);
    return (dispatch, getState) => {

        const stateVar = getState();
        let image_paths = stateVar.image_paths;

        for (let i =0; i<image_paths.length; i++){
            if (image_paths[i]['imageUrl'] == imageUrl){

                replace_item = image_paths[i];
                now = Date.now();
                replace_item['timestamp'] = now;

                dispatch(function(){ return {type:'UPDATE_IMAGE',
                    index:i,
                    item: replace_item
                }});
            }
        }

        getImageFileAndSave(imageUrl, function(path){
            console.log('dispatching!');
            now = Date.now();
            item['timestamp'] = now;
            item['imageUrl'] = imageUrl;
            item['path'] = path;
            dispatch(function(){return {type:'ADD_IMAGE', item:item};});
        });
    }

}

//---------------------------------------------------------------
//--------------  ACTIONS FOR SONGS --------------------------

export function pushSongs(songs=[], type='PUSH_NEW_SONGS') {

  if (['PUSH_NEW_SONGS','REPLACE_SONGS'].indexOf(type) < 0) {
    console.log('ERROR: tried to update songs with invalid action');
    return;
  }

  for (let i =0; i<songs.length; i++){

    //add isRemoved field to raw result from LastFM
    songs[i]['isRemoved'] = false;

    //some artists dont have mbids!! gonna use  'temp_' + <artistname>
    if (songs[i]['mbid'] == "") songs[i]['mbid'] = 'temp_' + songs[i]['artist'];
    console.log(songs[i]['image']);
      console.log('this');
  }

  return {
    type: type,
    songlist: songs
    };
}


export function getAndPushSongs(type='PUSH_NEW_SONGS'){
//gets all songs with timestamp>= latest timestamp in songlist and  pushes them 
//to current list if type='PUSH_NEW_SONGS'.  Otherwise deletes and resets
//current list with all songs from timestamp=0 if type='REPLACE_SONGS'

  if (['PUSH_NEW_SONGS','REPLACE_SONGS'].indexOf(type) < 0) {
    console.log('ERROR: tried to update songs with invalid action');
    return;
  }

  console.log('get and push songs called! (' + type + ')');


    const getMostRecentTimestamp = (songs) => { //get largest timestamp + 1

        if (songs.length > 0){
            return Math.max.apply(Math,songs.map(song => {return song.timestamp;})) + 1;
        }

        return 0;
    };

    return (dispatch, getState) => {

        const stateVar = getState();

        let timestamp = 0;
        if (type == 'PUSH_NEW_SONGS') timestamp = getMostRecentTimestamp(stateVar.song_list);

        let username = stateVar.settings.lastfm.username;

        console.log('thunk, uname: ' + username + ' timestamp: ' + timestamp);

        getListeningHistory(username, timestamp, function(songs){
            console.log('dispatching!');
            dispatch(pushSongs(songs, type));
        });
    }

}

export function resetSongs(){
}

export function toggleSongRemoved(timestamp) {
  return {
    type: 'TOGGLE_SONG_REMOVE',
    timestamp: timestamp
  };
}


//---------------------------------------------------------------
//--------------  ACTIONS FOR SETTINGS --------------------------

export function updateLastFMUsername(name){
  console.log('called update username with name ' + name);

  return {
    type: 'UPDATE_LASTFM_USERNAME',
    username: name
    };
}

export function updatePaymentAmount(amount=0){
  return {
    type: 'UPDATE_PAYMENT_AMOUNT',
    amount: amount
    };
}

export function togglePaymentEnabled(){
  return {
    type: 'TOGGLE_PAYMENT_ENABLED',
    username: name
    };
}

export function updatePaymentTerm(term='THIS_MONTH'){

  if (['THIS_MONTH','ALL_TIME','LAST_PAYMENT'].indexOf(term) < 0) {
    console.log('ERROR: tried to update payment term with invalid value');
    return;
  }

  return {
      type: 'UPDATE_PAYMENT_TERM',
      term: term
  };

}


export function updateMinPayment(min_payment=0.01){
  return {
    type: 'UPDATE_MIN_PAYMENT',
    min_payment: min_payment
    };
}

export function toggleArtistPayment(mbid){

    return (dispatch, getState) => {

        const artists_off = getState().settings.payments.artists_off;

        if (artists_off.indexOf(mbid) < 0) {
            console.log('adding MBID to artists off list');
            dispatch({ type: 'ARTIST_PAYMENT_ON', mbid: mbid});

        }else{
            console.log('removing MBID from artists off list');
            dispatch({ type: 'ARTIST_PAYMENT_OFF', mbid: mbid});

        }
    }
}

//---------------------------------------------------------------
//--------------  ACTIONS FOR PAY_HISTORY -----------------------

export function addPaymentToHistory(payment_array){
//expects an array of objects with {mbid, artist, payment, image, num_plays}
console.log('called payment history add.');

  return (dispatch, getState) => {
    let payment = {};
    payment['payments'] = payment_array.filter(e => e.payment != 0);
    payment['total_payment'] = payment_array.reduce((a,b) => a + b['payment'], 0.00);
    payment['total_plays'] = payment_array.reduce((a,b) => a + b['num_plays'], 0);
    payment['payment_term'] = getState().settings.payments.term;
    payment['visible'] = true;
    payment['timestamp'] = Math.floor(Date.now() / 1000);

    if (payment['total_plays'] > 0 && payment['total_payment'] > 0){
        dispatch({
            type: 'ADD_NEW_PAYMENT',
            payment: payment
            });
    } else{
        return;
    }

  }
}

export function deletePaymentHistory(){
  return {
    type: 'DELETE_PAY_HISTORY'
    };
}
