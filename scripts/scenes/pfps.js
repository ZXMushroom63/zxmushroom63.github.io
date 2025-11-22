renderer["pfps"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = px(24)+"px monospace";
    if (htmlcontent.writeEvent) {
        displayText(`
            <img
      class="pfp"
      src="public/pfps/modern.png"
      id="pfp_modern"
    />
    <img
      class="pfp"
      src="public/pfps/rain.png"
      id="pfp_rain"
    />
    <img
      class="pfp"
      src="public/pfps/dreamy.png"
      id="pfp_dreamy"
    />
    <img
      class="pfp"
      src="public/pfps/indistinct.png"
      id="pfp_indistinct"
    />
            `, "Profile Pictures", true, true);
        htmlcontent.writeEvent = false;
    }
}
/*
    
*/