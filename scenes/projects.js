renderer["projects"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.lineWidth = 2 * devicePixelRatio;
    mainCtx.font = "36px monospace";
    wordWrapText(renderLeft, renderTop + 36, "Double-click a project for more info.", 36, renderRight);
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
        ent.radius = vw(0.05);

        switch (ent) {
            case inspectedEntity:
                mainCtx.strokeStyle = "red";
                break;
            case grabbedEntity:
                mainCtx.strokeStyle = "cyan";
                break;
            default:
                mainCtx.strokeStyle = "white";
                break;
        }

        mainCtx.shadowColor = `rgba(255,255,255,${clamp(Math.abs(ent.x - ent.preX) + Math.abs(ent.y - ent.preY) / 150, 0.15, 1)})`;
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        mainCtx.stroke();
    });
}