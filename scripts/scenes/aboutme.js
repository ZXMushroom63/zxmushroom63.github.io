renderer["aboutme"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    const sz = mobileMode ? px(18) : px(24);
    mainCtx.font = sz + "px monospace";
    let descPos = renderTop + sz;
    descPos += wordWrapText(renderLeft, descPos, "Hi, I'm ZXMushroom63.", sz, renderRight);
    descPos += sz;
    descPos += wordWrapText(renderLeft, descPos, "I develop software, mainly in vanilla web tech (HTML, CSS, JS), but I'm also learning Rust.", sz, renderRight);
    descPos += sz;
    descPos += wordWrapText(renderLeft, descPos, "Having developed my own DAW, I know a decent amount about music theory and sound design, but I'm still practising.", sz, renderRight);
    descPos += sz;
    descPos += wordWrapText(renderLeft, descPos, "When I'm not doing either music or SWE, I'll probably be screwing around in Blender making something (or be asleep).", sz, renderRight);
}