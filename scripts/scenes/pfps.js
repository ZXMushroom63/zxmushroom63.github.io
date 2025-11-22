renderer["pfps"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = px(24)+"px monospace";
    if (htmlcontent.writeEvent) {
        displayText("Test content :D", "Profile Pictures")
        htmlcontent.writeEvent = false;
    }
}
/*
    <img
      class="asset"
      loading="lazy"
      src="public/pfps/modern.png"
      id="pfp_modern"
    />
    <img
      class="asset"
      loading="lazy"
      src="public/pfps/rain.png"
      id="pfp_rain"
    />
    <img
      class="asset"
      loading="lazy"
      src="public/pfps/dreamy.png"
      id="pfp_dreamy"
    />
    <img
      class="asset"
      loading="lazy"
      src="public/pfps/indistinct.png"
      id="pfp_indistinct"
    />
*/