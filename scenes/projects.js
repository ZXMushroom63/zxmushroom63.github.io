renderer["projects"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = "36px monospace";
    wordWrapText(renderLeft, renderTop + 36, "WIP", 36, renderRight);
    world.left = renderLeft;
    world.right = renderRight;
    world.top = renderTop;
    world.bottom = renderBottom;
    worldTick(deltaTime);
    mainCtx.strokeStyle = "";
    mainCtx.shadowColor = "transparent";
    mainCtx.shadowBlur = 0;
    mainCtx.fillStyle = `rgba(255,255,255,0.1)`;
    entities.forEach(ent => {
        if (ent.id === "mouse") {
            return;
        }
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        mainCtx.fill();
    });
}