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
    mainCtx.moveTo(renderLeft, renderBottom);
    mainCtx.lineTo(renderRight, renderBottom);
    mainCtx.stroke();

    mainCtx.lineWidth = 1 * devicePixelRatio;

    entities.forEach(ent => {
        ent.radius = vw(0.05);

        switch (ent) {
            case inspectedEntity:
                mainCtx.strokeStyle = "rgba(255,255,255,1)";
                break;
            case grabbedEntity:
                mainCtx.strokeStyle = `rgba(255,255,255,${0.5 + (Math.sin(now / 200) * 0.3)})`;
                break;
            default:
                mainCtx.strokeStyle = "rgba(255,255,255,0.1)";
                break;
        }


        mainCtx.save();
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        mainCtx.clip();
        mainCtx.shadowColor = ``;
        mainCtx.shadowBlur = 0;
        mainCtx.drawImage(assets[ent.tex](), ent.x - ent.radius, ent.y - ent.radius, ent.radius * 2, ent.radius * 2);
        mainCtx.restore();
        mainCtx.shadowColor = `rgba(255,255,255,${clamp(Math.abs(ent.x - ent.preX) + Math.abs(ent.y - ent.preY) / 150, 0.15, 1)})`;
        mainCtx.beginPath();
        mainCtx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        mainCtx.stroke();
    });
    if (grabbedEntity) {
        mainCtx.textAlign = "center";
        mainCtx.fillStyle = "rgba(0,0,0,0.4)";
        const metrics = mainCtx.measureText(grabbedEntity.name);
        mainCtx.shadowColor = ``;
        mainCtx.shadowBlur = 0;
        mainCtx.fillRect(grabbedEntity.x - (metrics.width / 2) - 6, grabbedEntity.y + grabbedEntity.radius - 6 + (18/2), metrics.width + 12, 36 + 6);
        mainCtx.fillStyle = "white";
        mainCtx.fillText(grabbedEntity.name, grabbedEntity.x, grabbedEntity.y + grabbedEntity.radius + 36);
    }
    mainCtx.shadowColor = ``;
    mainCtx.shadowBlur = 0;
    mainCtx.textAlign = "left";
    wordWrapText(renderLeft, renderTop + 36, "Double-click a project to view information about it.", 36, renderRight);
}