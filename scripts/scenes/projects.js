renderer["projects"] = function (mainCtx, renderLeft, renderTop, renderRight, renderBottom, wordWrapText, myText, deltaTime) {
    const now = Date.now();

    const dpr = devicePixelRatio;
    const radius = mobileMode ? vh(0.065) : vw(0.05);
    const diam = radius * 2;

    const defaultWidth = 1 * dpr;
    const inspectedWidth = 2 * dpr;
    const grabbedWidth = 1.5 * dpr;

    const defaultStyle = "rgba(255,255,255,0.4)";
    const inspectedStyle = "rgba(255,255,255,1)";
    const grabbedOpacity = 0.7 + (Math.sin(now / 200) * 0.3);
    const grabbedStyle = `rgba(255,255,255,${grabbedOpacity})`;

    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = px(24)+"px monospace";
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
    
    const len = entities.length;
    for (let i = 0; i < len; i++) {
        const ent = entities[i];
        
        ent.radius = radius;

        const x = ent.x;
        const y = ent.y;

        if (ent === inspectedEntity) {
            mainCtx.lineWidth = inspectedWidth;
            mainCtx.strokeStyle = inspectedStyle;
        } else if (ent === grabbedEntity) {
            mainCtx.lineWidth = grabbedWidth;
            mainCtx.strokeStyle = grabbedStyle;
        } else {
            mainCtx.lineWidth = defaultWidth;
            mainCtx.strokeStyle = defaultStyle;
        }

        mainCtx.save();
        mainCtx.beginPath();
        mainCtx.arc(x, y - 1, radius, 0, Math.PI * 2);
        mainCtx.clip();
        mainCtx.shadowColor = ``;
        mainCtx.shadowBlur = 0;
        mainCtx.fillStyle = "black";
        mainCtx.fillRect(x - radius, y - radius - 1, diam, diam);
        mainCtx.drawImage(assets[ent.tex](), x - radius, y - radius - 1, diam, diam);
        mainCtx.restore();

        //const shadowAlpha = clamp(Math.abs(x - ent.preX) + Math.abs(y - ent.preY) / 150, 0.15, 1);
        //mainCtx.shadowColor = `rgba(255,255,255,${shadowAlpha})`;
        
        mainCtx.beginPath();
        mainCtx.arc(x, y, radius, 0, Math.PI * 2);
        mainCtx.stroke();
    }

    const targ = (grabbedEntity ?? inspectedEntity);
    if (targ) {
        mainCtx.textAlign = "center";
        mainCtx.fillStyle = "rgba(0,0,0,0.75)";
        const metrics = mainCtx.measureText(targ.name);

        mainCtx.shadowColor = ``;
        mainCtx.shadowBlur = 0;
        
        mainCtx.fillRect(targ.x - (metrics.width / 2) - 6, targ.y + radius - 6 + (18/2), metrics.width + 12, px(24) + 6);
        mainCtx.fillStyle = "white";
        mainCtx.fillText(targ.name, targ.x, targ.y + radius + px(24));
    }
    
    mainCtx.shadowColor = ``;
    mainCtx.shadowBlur = 0;
    mainCtx.textAlign = "left";
    wordWrapText(renderLeft, renderTop + px(24), "Double-click a project to view information about it.", px(24), renderRight);
}