var roman = require('romantique').roman;

var title = '',
    number = '',
    key = '',
    opus = '',
    opusSub = '';

/**
 * Removes the extra data from end of title that is between parentheses
 * @type {RegExp}
 * group 1: extra data
 */
//var rxExtra = /\((.*)\)$/i;

/**
 * group 1: subtitle
 * @type {RegExp}
 */
var rxSubtitle = /\s*[\'\"(]{1}([\w\s]+)[\'\")]{1}\s*/i;

/**
 *
 * @type {RegExp}
 * group 1: opus number
 * group 2: opus sub number
 */
var rxOpus = /op[us.\s]*([0-9ivxc]+)[\s\,]*(?:n[o|um|umber]+)*[\.\s]*([0-9]*\-*[0-9]*)/i;

/**
 * group 1: key letter
 * group 2: accidental
 * group 3: major or minor
 * @type {RegExp}
 */
var rxKey = /\s+([abcdefg]{1})[\s\-]*(b|#|flat|sharp)*[\s]*(major|minor)*\s*(?:\n|$)/i;



/**
 * group 1: work number
 * @type {RegExp}
 */
var rxWorkNumber = /(?:(?:n[o|um|umber])|#)+[\s\.]*(\d*|[ivxc]*)+$/i;

/**
 * group 1: work type
 * group 2: instrumentation
 * matches [work] for [instrument] concerto for piano and orchestra
 * @type {RegExp}
 */
//var rxTitle01 = /(\w+)\s+(?:for)\s+([\s\w]*)/i;
var rxTitle01 = /([\w\s]*[\w]+)\s+(?:for)\s+(.*)/i;

/**
 * group 1: instrumentation
 * group 2: work type
 * matches [instrument] [work]: piano concerto
 * @type {RegExp}
 */
var rxTitle02 = /([\w\s]+)\s+(concerto)/i;

function commaTrim(string){
    return string.replace(/,\s*$/, '');
}

exports.parse = function(album){
    var subtitleMatch = rxSubtitle.exec(album);
    if(subtitleMatch != null){
        var matchLength = subtitleMatch.lastIndex - subtitleMatch.index;
        subtitle = subtitleMatch[1];
        //title = commaTrim(album.slice(0,subtitleMatch.index));
            //+ commaTrim(album.slice(subtitleMatch.lastIndex,album.length)));
        title = commaTrim(album.replace(subtitleMatch[0], ''));
    } else {subtitle = ''; title = album;}

    var opusMatch =  rxOpus.exec(title);
    if(opusMatch !== null){
        opus = roman.validate(opusMatch[1]) ?  roman.toDecimal(opusMatch[1]) : opusMatch[1];
        if (opusMatch[2] != 0){
            opusSub = roman.validate(opusMatch[2]) ?  roman.toDecimal(opusMatch[2]) : opusMatch[2];
        }
        title = commaTrim(album.slice(0, opusMatch.index));
    } else {
        opus = '';
        opusSub = '';
        //title = album;
    }

    var keyMatch = rxKey.exec(title);
    var accidental = '';
    var mm = '';
    if(keyMatch !== null){
        if (keyMatch[2] == '#' || keyMatch[2] == 'sharp'){
            accidental = 'sharp';
        }
        else if (keyMatch[2] == 'b' || keyMatch[2] == 'flat'){
            accidental = 'flat';
        } else {accidental = ''}

        key = keyMatch[1] + ' ' + accidental + ' ' + ((keyMatch[3]) ? keyMatch[3] : '');
        title = commaTrim(title.slice(0, keyMatch.index)).replace(/\s*in\s*$/,'');
    } else {key = ''}

    var workNumberMatch = rxWorkNumber.exec(title);
    if(workNumberMatch != null){
        number = roman.validate(workNumberMatch[1]) ? roman.toDecimal(workNumberMatch[1]) : workNumberMatch[1];
        title = commaTrim(title.slice(0,workNumberMatch.index));
    } else {number = ''}

    var titleMatch1 = rxTitle01.exec(title);

    if(titleMatch1 != null){
        title = commaTrim(titleMatch1[1] + ' for ' + titleMatch1[2]);
    } else {
        var titleMatch2 = rxTitle02.exec(title);
        if(titleMatch2 != null){
            title = commaTrim(titleMatch2[2] + ' for ' + titleMatch2[1] + ' and Orchestra');
        }
    }



    return {
        title: title,
        subtitle: subtitle,
        number: number,
        key: key,
        opus: opus,
        opusSub: opusSub,
        fullTitle: title + ' ' + number + ' ' + key + ' ' + opus
    };
};