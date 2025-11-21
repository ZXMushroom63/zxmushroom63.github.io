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
    mainCtx.fillStyle = `rgba(0,0,0,0.3)`;
    mainCtx.fillRect(renderLeft + px(48 / (1 + mobileMode)), renderTop + px(48 / (1 + mobileMode)), (renderRight - renderLeft) - px(96 / (1 + mobileMode)), (renderBottom - renderTop) - px(96 / (1 + mobileMode)));
    if (songIndex < 0) {
        songIndex = songs.length - 3;
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
    wordWrapText((renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 - textSize + px(28), currentSong[1].trim(), textSize, renderRight * 1.5);

    mainCtx.fillStyle = `rgba(255,255,255,0.8)`;
    const spacing = px((3 + 3 + 6) * 10);
    const width = px((3 + 3 + 5) * 10);
    const mkHitbox = (p, q) => ({ x1: width / -2 + p - px(4), x2: width / 2 + p + px(4), y1: q - px(4), y2: px(20) + q + px(4), p, q });

    mainCtx.fillText("← prev", (renderLeft + renderRight) / 2 - spacing, (renderTop + renderBottom) / 2 + px(60));
    mainCtx.fillText("open ↗", (renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 + px(60));
    mainCtx.fillText("next →", (renderLeft + renderRight) / 2 + spacing, (renderTop + renderBottom) / 2 + px(60));

    const hitboxes = [
        mkHitbox((renderLeft + renderRight) / 2 - spacing, (renderTop + renderBottom) / 2 + px(60)),
        mkHitbox((renderLeft + renderRight) / 2, (renderTop + renderBottom) / 2 + px(60)),
        mkHitbox((renderLeft + renderRight) / 2 + spacing, (renderTop + renderBottom) / 2 + px(60)),
    ];
    for (let j = 0; j < hitboxes.length; j++) {
        const hitbox = hitboxes[j];
        const test_x = mouse.x * devicePixelRatio;
        const test_y = mouse.y * devicePixelRatio;
        if (
            (test_x >= hitbox.x1) &&
            (test_x <= hitbox.x2) &&
            (test_y >= (hitbox.y1 - px(12))) &&
            (test_y <= (hitbox.y2 - px(12)))
        ) {
            mainCtx.fillText("______", hitbox.p, hitbox.q);
            if (!prevFrameMouseData && mouseDown) {
                if (j === 0) {
                    songIndex -= 3;
                } else if (j === 1) {
                    window.open(currentSong[2].trim());
                } else {
                    songIndex += 3;
                }
            }
        }
    }
}