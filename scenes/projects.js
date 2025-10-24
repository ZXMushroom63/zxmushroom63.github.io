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
    mainCtx.strokeStyle = "white";
    mainCtx.shadowColor = "white";
    mainCtx.shadowBlur = 15;
    
    entities.forEach(ent => {
        if (ent.id === "mouse") {
            return;
        }
        ent.radius = Math.min(vw(0.1), vh(0.1));
        mainCtx.shadowColor = `rgba(255,255,255,${clamp(Math.abs(ent.x - ent.preX) + Math.abs(ent.y - ent.preY) / 150, 0.15, 1)})`;
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        mainCtx.stroke();
    });
}