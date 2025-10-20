let lastChangeTimer = 0;
let currentScene = "aboutme";
const mainUI = document.querySelector("#mainui");
canvas_entries.push(mainUI);

const flags = 0 << 0;

/**
   * @type {CanvasRenderingContext2D}
   */
const mainCtx = mainUI.getContext("2d");
const bgrain1 = document.querySelector("#bgrain1");
const bgrain2 = document.querySelector("#bgrain2");
const floatermenu = document.querySelector("#floatermenu");
let currentRain = bgrain1;
bgrain1.load();
bgrain2.load();
window.bgFilter = "none";
bgrain1.addEventListener('ended', () => {
    currentRain = bgrain2;
    bgrain2.currentTime = 0;
    bgrain2.play();
});
bgrain2.addEventListener('ended', () => {
    currentRain = bgrain1;
    bgrain1.currentTime = 0;
    bgrain1.play();
});
wr_resize();
function lerp(a, b, k) {
    return (b - a) * k + a;
}
function cdist(x, y, distdiv) {
    distdiv ||= 100;
    return Math.min(1, Math.max(0, Math.sqrt(((x - mouse.x) ** 2) + ((y - mouse.y) ** 2)) / distdiv));
}
const CHARSET = Object.keys(font);
var start = Date.now();
function animatedText() {
    const now = Date.now();
    const dt = now - start;
    if (dt > 4000) {
        return "zxmushroom63";
    }
    var arr = "zxmushroom63".split("");
    const chance = Math.pow(dt / 4000, 0.75);
    arr.forEach((x, i) => {
        if (Math.random() > chance) {
            arr[i] = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
    });
    return arr.join("");
}
const mouse = { nx: -1000, ny: -1000, x: 0, y: 0 };
let lastFrame = Date.now();
let launchText = "click to launch";
function frame() {
    const mobileMode = 950 > innerWidth;
    const currentTime = Date.now();
    const deltaTime = (Date.now() - lastFrame) / 1000;
    lastFrame = currentTime;
    if (lastChangeTimer > 0) {
        lastChangeTimer -= deltaTime;
    } else {
        lastChangeTimer = 0;
    }
    mouse.x = lerp(mouse.x, mouse.nx, 0.2);
    mouse.y = lerp(mouse.y, mouse.ny, 0.2);
    if (!window.gain) {
        mainCtx.fillStyle = `rgba(0,0,0,1)`;
        mainCtx.fillRect(0, 0, vw(1), vh(1));
        mainCtx.fillStyle = "white";
        mainCtx.textAlign = "center";
        mainCtx.font = "36px monospace";
        mainCtx.fillText(launchText, vw(0.5), vh(0.5) - (18 * devicePixelRatio));
        return requestAnimationFrame(frame);
    }

    mainCtx.fillStyle = "black";
    mainCtx.fillRect(0, 0, vw(1), vh(1));

    const gainLerp = ((gain.value % 1) * 10) % 10;
    const aspectScaleX = mainCtx.canvas.width / (1920 * 2 * devicePixelRatio);
    const aspectScaleY = mainCtx.canvas.height / (1080 * 2 * devicePixelRatio);
    let aspectFillScale = Math.max(aspectScaleX, aspectScaleY);
    let fillWidth = (1920 * 2 * devicePixelRatio) * aspectFillScale;
    let fillHeight = (1080 * 2 * devicePixelRatio) * aspectFillScale;
    let fillX = (mainCtx.canvas.width - fillWidth) / 2;
    let fillY = (mainCtx.canvas.height - fillHeight) / 2;

    if (gainLerp > 0.01) {
        mainCtx.filter = window.bgFilter;
        mainCtx.drawImage(currentRain, fillX, fillY, fillWidth, fillHeight);
        mainCtx.filter = "none";
    }

    mainCtx.strokeStyle = "white";
    mainCtx.lineWidth = 1 * devicePixelRatio;
    mainCtx.shadowColor = "white";
    mainCtx.shadowBlur = 8 * devicePixelRatio;

    function myText(phrase, xp, yp, scale) {
        let startX = xp;
        const p = phrase.toLowerCase();
        for (let i = 0; i < p.length; i++) {
            const letter = p[i];
            const graphic = font[letter] || font["unknown"];
            if (!graphic) {
                return;
            }
            mainCtx.beginPath();
            graphic.forEach((x, j) => {
                if (j === 0 || x[2]) {
                    mainCtx.moveTo(x[0] * scale + xp, x[1] * scale * -1 + yp);
                    if (x[2] === 2) {
                        mainCtx.arc(x[0] * scale + xp, x[1] * scale * -1 + yp, 0.1 * scale, 0, 2 * Math.PI);
                    }
                } else {
                    mainCtx.lineTo(x[0] * scale + xp, x[1] * scale * -1 + yp);
                }
            });
            mainCtx.stroke();

            xp += 3 * scale;
        }
        return {
            left: startX,
            right: xp,
            top: yp,
            bottom: yp + (3 * scale)
        }
    }
    function wordWrapText(x, y, text, fontHeight, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];


        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = mainCtx.measureText(currentLine + " " + word).width;
            if ((x + width) < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        lines.forEach((l, i) => {
            mainCtx.fillText(l, x, y + (fontHeight * i));
        });
        return fontHeight * lines.length;
    }
    mainCtx.shadowColor = "transparent";
    mainCtx.shadowBlur = 0;
    mainCtx.fillStyle = "rgba(0,0,0,0.5)";
    const text = animatedText();
    const boxWidth = text.length * 10 * 3 * devicePixelRatio;
    const delta = vw(0.25) + (12.5 * 2 * devicePixelRatio) - boxWidth;
    mainCtx.fillRect(Math.max(delta / 2 - 5 * devicePixelRatio, 12.5 * devicePixelRatio), 12.5 * devicePixelRatio, boxWidth + 10 * devicePixelRatio, devicePixelRatio * 10 * 5);

    mainCtx.shadowColor = `rgba(255,255,255,${1 - cdist(
        Math.max(delta / 2 - 5 * devicePixelRatio, 12.5 * devicePixelRatio) + (boxWidth / 2),
        lerp(12.5 * devicePixelRatio + devicePixelRatio * 10 * 5,
            12.5 * devicePixelRatio,
            0.5),
        500)})`;
    mainCtx.shadowBlur = 8 * devicePixelRatio;
    myText(text, Math.max(delta / 2 + 5 * devicePixelRatio, 22.5 * devicePixelRatio), 22.5 * devicePixelRatio, 10 * devicePixelRatio);
    mainCtx.shadowColor = "transparent";
    mainCtx.shadowBlur = 0;

    const renderTop = devicePixelRatio * 10 * 5 + 18.75 * devicePixelRatio + (lastChangeTimer * 40 * devicePixelRatio);
    const renderLeft = mobileMode ? 12.5 * devicePixelRatio : (25 + 12.5) * devicePixelRatio + vw(0.25);
    const renderRight = vw(1) - (12.5 * devicePixelRatio);
    mainCtx.fillStyle = `white`;
    mainCtx.textAlign = "left";
    mainCtx.font = "36px monospace";
    let descPos = renderTop + (36 * 1);
    descPos += wordWrapText(renderLeft, descPos, "Hi, I'm ZXMushroom63.", 36, renderRight);
    descPos += 36;
    descPos += wordWrapText(renderLeft, descPos, "I develop software, mainly in vanilla web tech (HTML, CSS, JS), but I'm also learning Rust.", 36, renderRight);
    descPos += 36;
    descPos += wordWrapText(renderLeft, descPos, "Having developed my own DAW, I know a decent amount about music theory and sound design, but I'm still practising.", 36, renderRight);
    descPos += 36;
    descPos += wordWrapText(renderLeft, descPos, "When I'm not doing either music or SWE, I'll probably be screwing around in Blender making something (or be asleep).", 36, renderRight);

    mainCtx.fillStyle = `rgba(0,0,0,${1 - gainLerp})`;

    floatermenu.style.display = (gainLerp < 0.01) ? "none" : "block";
    if (floatermenu.style.display === "block") {
        floatermenu.style.opacity = gainLerp;
    }

    mainCtx.fillRect(0, 0, vw(1), vh(1));
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

addEventListener("mousemove", (e) => {
    mouse.nx = e.x;
    mouse.ny = e.y;
});
addEventListener("mouseout", (e) => {
    mouse.nx = -500;
    mouse.ny = -500;
});
addEventListener("load", () => {
    document.querySelector("#floatermenu").addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-val")) {
            document.querySelector(".selected").classList.remove("selected");
            e.target.classList.add("selected");
            currentScene = e.target.getAttribute("data-val");
            lastChangeTimer = 0.25;
        }
    });
});
function lightning(manual) {
    if (!window.gain) {
        return setTimeout(lightning, 1000 * 30 + (1000 * 20 * Math.random()));
    }
    const gainLerp = ((gain.value % 1) * 10) % 10;
    if (gainLerp < 0.9) {
        return setTimeout(lightning, 1000 * 30 + (1000 * 20 * Math.random()));
    }
    const lightningDistance = 50 + 2150 * Math.random();
    window.bgFilter = `brightness(${5000 / lightningDistance}) contrast(1) saturate(0)`;
    setTimeout(() => {
        window.bgFilter = "none";
        setTimeout(() => {
            window.bgFilter = `brightness(${3000 / lightningDistance}) contrast(1) saturate(0)`;
            setTimeout(() => {
                window.bgFilter = `none`;
            }, 20 + 70 * Math.random())
        }, 20 + 70 * Math.random())
    }, 20 + 70 * Math.random());
    const sfx = new Audio(`Thunder${1 + Math.floor(3 * Math.random())}.ogg`);
    sfx.volume = Math.min(1, 400 / lightningDistance);
    setTimeout(() => sfx.play(), lightningDistance / 343 * 250);
    if (!manual) {
        return setTimeout(lightning, 1000 * 30 + (1000 * 50 * Math.random()));
    }
}
setTimeout(lightning, 1000 * 30 + (1000 * 20 * Math.random));
// addEventListener("keydown", (e) => {
//     if (e.key === "l") {
//         lightning(true);
//     }
// });