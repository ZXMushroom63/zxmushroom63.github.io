renderer["projects"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    const now = Date.now();
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.lineWidth = 1 * devicePixelRatio;
    mainCtx.font = "36px monospace";
    world.left = renderLeft;
    world.right = renderRight;
    world.top = renderTop;
    world.bottom = renderBottom;
    worldTick(deltaTime);
    mainCtx.strokeStyle = "rgba(255,255,255,0.5)";
    mainCtx.shadowColor = "rgba(255,255,255,0.5)";
    mainCtx.shadowBlur = 15;

    mainCtx.beginPath();
    mainCtx.moveTo(renderLeft, renderBottom - 1);
    mainCtx.lineTo(renderRight, renderBottom - 1);
    mainCtx.stroke();

    mainCtx.lineWidth = 1 * devicePixelRatio;

    entities.forEach(ent => {
        ent.radius = vw(0.07);

        switch (ent) {
            case inspectedEntity:
                mainCtx.lineWidth = 2 * devicePixelRatio;
                mainCtx.strokeStyle = "rgba(255,255,255,1)";
                break;
            case grabbedEntity:
                mainCtx.lineWidth = 1.5 * devicePixelRatio;
                mainCtx.strokeStyle = `rgba(255,255,255,${0.7 + (Math.sin(now / 200) * 0.3)})`;
                break;
            default:
                mainCtx.lineWidth = 1 * devicePixelRatio;
                mainCtx.strokeStyle = "rgba(255,255,255,0.4)";
                break;
        }


        mainCtx.save();
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y - 1, ent.radius, 0, Math.PI * 2);
        mainCtx.clip();
        mainCtx.shadowColor = ``;
        mainCtx.shadowBlur = 0;
        mainCtx.fillStyle = "black";
        mainCtx.fillRect(ent.x - ent.radius, ent.y - ent.radius - 1, ent.radius * 2, ent.radius * 2);
        mainCtx.drawImage(assets[ent.tex](), ent.x - ent.radius, ent.y - ent.radius - 1, ent.radius * 2, ent.radius * 2);
        mainCtx.restore();
        mainCtx.shadowColor = `rgba(255,255,255,${clamp(Math.abs(ent.x - ent.preX) + Math.abs(ent.y - ent.preY) / 150, 0.15, 1)})`;
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        mainCtx.stroke();
    });

    if (grabbedEntity || inspectedEntity) {
        const targ = (grabbedEntity ?? inspectedEntity);
        mainCtx.textAlign = "center";
        mainCtx.fillStyle = "rgba(0,0,0,0.75)";
        const metrics = mainCtx.measureText(targ.name);
        mainCtx.shadowColor = ``;
        mainCtx.shadowBlur = 0;
        mainCtx.fillRect(targ.x - (metrics.width / 2) - 6, targ.y + targ.radius - 6 + (18/2), metrics.width + 12, 36 + 6);
        mainCtx.fillStyle = "white";
        mainCtx.fillText(targ.name, targ.x, targ.y + targ.radius + 36);
    }
    mainCtx.shadowColor = ``;
    mainCtx.shadowBlur = 0;
    mainCtx.textAlign = "left";
    wordWrapText(renderLeft, renderTop + 36, "Double-click a project to view information about it.", 36, renderRight);
}