const songs = [
    "Breakcore       ", "femtanyl - LOTTERY                                             ", "https://www.youtube.com/watch?v=_lAyonVMuls",
    "Dark Ambient    ", "Mike Klubnika - Blank Shell                                    ", "https://www.youtube.com/watch?v=_fdXsTsfQhM",
    "EDM             ", "Liam Vickers - Yellow Halogen Theme                            ", "https://www.youtube.com/watch?v=oSRhxZFhw1s",
    "Electro Piano   ", "Liam Vickers - Haze                                            ", "https://www.youtube.com/watch?v=YeLN6pLGevM",
    "Space Ambient   ", "AJ DiSpirito - The Plot 2                                      ", "https://www.youtube.com/watch?v=94NXWkZi7Wg",
    "Vocaloid        ", "inabakumori - Lagtrain (Vo. Kaai Yuki)                         ", "https://www.youtube.com/watch?v=UnIhRpIT7nc",
    "Webcore         ", "Oliver Buckland - backroom labyrinth                           ", "https://www.youtube.com/watch?v=iC452qNLXFg",
];

var songIndex = Math.floor(Math.random() * Math.floor(songs.length / 3)) * 3;
renderer["music"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    songIndex %= songs.length;
    mainCtx.fillStyle = `rgba(255,255,255,0.5)`;
    mainCtx.textAlign = "center";
    var textSize = px(20);
    mainCtx.font = textSize + "px monospace";
    wordWrapText((renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 - textSize - px(48), "my music taste, by genre:", textSize, renderRight);
    textSize = Math.min(vw(1), px(26));
    mainCtx.font = textSize + "px monospace";
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "center";

    const currentSong = songs.slice(songIndex, songIndex + 3);
    const genre = "Genre: " + currentSong[0].trim();
    var genreUnderline = "";
    for (let i = 0; i < genre.length; i++) {
        genreUnderline += "_";
    }

    mainCtx.fillText(genre, (renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 - px(20));
    mainCtx.fillText(genreUnderline, (renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 - px(20));
    mainCtx.font = px(20) + "px monospace";
    mainCtx.fillStyle = `rgba(255,255,255,0.7)`;
    mainCtx.textAlign = "center";
    mainCtx.fillText(currentSong[1].trim(), (renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 + px(20));
}