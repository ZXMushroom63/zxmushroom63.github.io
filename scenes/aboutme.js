renderer["aboutme"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = "36px monospace";
    let descPos = renderTop + (36 * 1);
    descPos += wordWrapText(renderLeft, descPos, "Hi, I'm ZXMushroom63.", 36, renderRight);
    descPos += 36;
    descPos += wordWrapText(renderLeft, descPos, "I develop software, mainly in vanilla web tech (HTML, CSS, JS), but I'm also learning Rust.", 36, renderRight);
    descPos += 36;
    descPos += wordWrapText(renderLeft, descPos, "Having developed my own DAW, I know a decent amount about music theory and sound design, but I'm still practising.", 36, renderRight);
    descPos += 36;
    descPos += wordWrapText(renderLeft, descPos, "When I'm not doing either music or SWE, I'll probably be screwing around in Blender making something (or be asleep).", 36, renderRight);
}