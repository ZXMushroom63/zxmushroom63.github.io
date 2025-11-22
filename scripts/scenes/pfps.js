renderer["pfps"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = px(24)+"px monospace";
    if (htmlcontent.writeEvent) {
        displayText(`
    <div class="pfp"><img
      class="pfp"
      src="public/pfps/modern.png"
      id="pfp_modern"
    /><span>Modern</span></div>
    <div class="pfp"><img
      class="pfp"
      src="public/pfps/rain.png"
      id="pfp_rain"
    /><span>Rainy</span></div>
    <div class="pfp"><img
      class="pfp"
      src="public/pfps/dreamy.png"
      id="pfp_dreamy"
    /><span>Dreamy</span></div>
    <div class="pfp"><img
      class="pfp"
      src="public/pfps/indistinct.png"
      id="pfp_indistinct"
    /><span>Indistinct</span></div>
    <div class="pfp"><img
      class="pfp"
      src="public/pfps/old.png"
      id="pfp_old"
    /><span>Old</span></div>
            `, "Profile Pictures", true, true);
        htmlcontent.writeEvent = false;
    }
}
/*
    
*/