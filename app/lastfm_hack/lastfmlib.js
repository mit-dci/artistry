var LastFmNode = require('./lastfm').LastFmNode;
var _ = require('lodash');
var config = require('../config');


var lfm = new LastFmNode({
        'api_key' : config.lastfm_api_key,
        'secret' : config.lastfm_secret
});


var getPagePromise = function(username, page=1, timestamp=0){
//this pulls the first page of results, and prints the timestamp, artist, and
//songs of that page to the screen.
    return new Promise(function(resolve, reject){


        lfm.request("User.getRecentTracks", {
            'user': username, 'page':page, 'from':timestamp, 'limit':200,
            'handlers': { success: function (track_list){

                var results = {'tracklist': [], 'currentPage': page, 'totalPages': track_list['recenttracks']['@attr']['totalPages']};

                for (var i = 0; i < track_list['recenttracks']['track'].length; i++){

                    try{ //now playing song won't have a datestring or timestamp ... ignoring

                        var result_song = {};
                        result_song['datestring'] = track_list['recenttracks']['track'][i]['date']['#text'];
                        result_song['timestamp'] = track_list['recenttracks']['track'][i]['date']['uts'];
                        result_song['artist'] = track_list['recenttracks']['track'][i]['artist']['#text'];
                        result_song['album'] = track_list['recenttracks']['track'][i]['album']['#text'];
                        result_song['song'] = track_list['recenttracks']['track'][i]['name'];
                        result_song['mbid'] = track_list['recenttracks']['track'][i]['artist']['mbid'];
                        result_song['image'] = track_list['recenttracks']['track'][i]['image'][0]['#text'];

                        results['tracklist'].push(result_song);

                    }catch(e){
                        //now playing songs fall here, we'll ignore them
                    }

                }

                console.log('found ' + results['tracklist'].length + ' results on page ' + results['currentPage'] + '/' + results['totalPages'] + '.');
                resolve(results);
            },
            error: function(e){
                console.log(e); reject(Error(e));
            }
            }
            });
    });
};


exports.getListeningHistory = function getListeningHistory(username, timestamp=0, cb){
//this pulls the first page of results, and prints the timestamp, artist, and
//songs of that page to the screen.

    getPagePromise(username, 1, timestamp).then(function(results){
        if ( results['totalPages'] != 1 && results['totalPages'] != 0 ){

            return Promise.all(_.range(2,parseInt(results['totalPages'])+1).map(
                function(page){return getPagePromise(username, page, timestamp);})).then(function(results2){

                for (var i = 0; i < results2.length; i++){
                    results['tracklist'] = results['tracklist'].concat(results2[i]['tracklist']);
                }

                return results['tracklist'];
            });

        }else{
            return results['tracklist'];
        }
    }).then(function(results){
        console.log('retrieved all results');
        cb(results);
    });


};


