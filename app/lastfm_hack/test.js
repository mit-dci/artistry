var lastfm = require('./lastfmlib');

test = lastfm.getListeningHistory('drmsy', 0, function(results){

    for (i = 0; i < results.length; i++){

        r=results[i];
        console.log('(' + i + ') ' + r['timestamp'] + ':  ' + r['datestring'] + ', ' + r['song'] + ' by ' + r['artist'] + ' from ' + r['album'] + '.\tMBID= ' + r['mbid']);
    }
});

//ask for latest timestamp in records + 1 to get new songs
