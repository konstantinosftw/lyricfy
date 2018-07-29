// Prepare button
$(document).ready(function () {

    // Create Lyrics button
    $(".extra-controls").prepend('<button id="get_lyrics" class="control-button">Lyrics</button>')

    // GET lyrics by clicking the button
    // $('#get_lyrics').click(getLyrics)

    // Create lyrics sidebar
    $(".main-view-container").after('<div id="lyrics_container"></div>')
    $(".main-view-container").toggleClass("lyrics_padding");

    // $("#lyrics_container").resizable();


    // getLyrics()

    $('#get_lyrics').click(function () {
        if ($("#lyrics_container").css('display') != 'none') {
            $("#lyrics_container").toggle();
            $(".main-view-container").toggleClass("lyrics_padding");
        } else {
            $("#lyrics_container").toggle("fast", "swing");
            $(".main-view-container").toggleClass("lyrics_padding");
            getLyrics()
        }
    });

    setTimeout(function () {
        var mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                console.log(mutation);
                getLyrics();
            });
        });

        mutationObserver.observe(document.querySelector(".track-info__name a"), {
            //attributes: true,
            characterData: true,
            //childList: true,
            subtree: true,
            //attributeOldValue: true,
            //characterDataOldValue: true
        });

        getLyrics()

    }, 3000);

});

// Functions
function getLyrics() {

    // Get Artist and Song names
    artist = document.querySelector(".track-info__artists a").innerText
    song = document.querySelector(".track-info__name a").innerText

    // If a song name has parenthesis "(" and/or hyphens "-" (e.g. "California Love - 2011 Remix"),
    // split the sting on the first symbol appearence and keep the first part.
    hyphen = song.indexOf(" -");
    parenthesis = song.indexOf("(");

    song = song.split("(")[0].split(" -")[0].trim()

    console.log(artist + "/" + song);

    // AUDD API - https://api.audd.io/doc/ - 10 req/day
    // data = $.getJSON("https://api.audd.io/?method=findLyrics&q=" + artist + " " + song ,function(load) {
    // 	console.log(load.result[0].lyrics);
    // });

    // Heroku lyrics.wikia API - https://github.com/rhnvrm/lyric-api
    $("#lyrics_container").html('')
    data = $.getJSON("https://lyric-api.herokuapp.com/api/find/" + artist + "/" + song, function (load) {
        if (load.err == "none") {
            lyrics = load.lyric
        } else {
            lyrics = "Unfortunately the lyrics for " + artist + "'s <span>" + song + "</span> do not exist in lyrics.wikia.com"
        }
        console.log(load.lyric);
        $("#lyrics_container").append('<h1>' + song + '</h1><h3>' + artist + '</h3><br><br><p>' + lyrics + '</p>')
    });
}

