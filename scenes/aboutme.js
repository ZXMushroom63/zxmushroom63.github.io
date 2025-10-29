renderer["aboutme"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = px(24) + "px monospace";
    let descPos = renderTop + px(24);
    descPos += wordWrapText(renderLeft, descPos, "Hi, I'm ZXMushroom63.", px(24), renderRight);
    descPos += px(24);
    descPos += wordWrapText(renderLeft, descPos, "I develop software, mainly in vanilla web tech (HTML, CSS, JS), but I'm also learning Rust.", px(24), renderRight);
    descPos += px(24);
    descPos += wordWrapText(renderLeft, descPos, "Having developed my own DAW, I know a decent amount about music theory and sound design, but I'm still practising.", px(24), renderRight);
    descPos += px(24);
    descPos += wordWrapText(renderLeft, descPos, "When I'm not doing either music or SWE, I'll probably be screwing around in Blender making something (or be asleep).", px(24), renderRight);
}