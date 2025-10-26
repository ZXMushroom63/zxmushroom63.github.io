// custom made physics engine based on verlet integration
// thank you Ricky-Jan https://scratch.mit.edu/projects/899958937/fullscreen/

const world = {
    left: 0,
    top: 0,
    right: 2000,
    bottom: 2000
}
const noise = 0.01;
const airResistance = 0.6;
const entities = [
    {
        x: 606, y: 600, preX: 901, preY: 900, radius: 125, name: "SYNTHETIC Audio", tex: "zx_synthetic", data: {
            desc: `Web based DAW that supports mutliplayer, has synths & soundfonts, custom waveforms and LFOs, you get the idea.
            
            Built using:
            HTML5, JavaScript, CSS, Ungodly amount of web APIs`,
            source: "https://github.com/ZXMushroom63/synthetic-audio/",
            demo: "https://zxmushroom63.github.io/synthetic-audio/"
        },
    },
    {
        x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Color Calendar", tex: "zx_calendar", data: {
            desc: `Color-coded PWA Calendar that runs offline using SW caching. It has a cool endless scrolling effect created by recycling 5 elements.
            
            Built using:
            HTML5, JavaScript, CSS
            `,
            source: "https://github.com/ZXMushroom63/color-calendar/",
            demo: "https://zxmushroom63.github.io/color-calendar/"
        }
    },
    {
        x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "EaglerForge", tex: "ef_eaglerforge", meta: {
            desc: `EaglerForge is a fork of EaglercraftX (a web-port of Minecraft 1.8.8) that adds a modding API. I contributed the majority of the modding API, back when the project was called EaglerReborn. My recent contributions mainly include a prototype mod list GUI built in Java rather than HTML, and a semi-automatic reflection structure generator.
            
            Built using:
            Java, GLSL, JavaScript, HTML5, CSS`,
            source: "https://github.com/EaglerForge/EaglerForge",
            demo: "https://github.com/EaglerForge/EaglerForge"
        },
    },
    {
        x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Flow", tex: "zx_flow", data: {
            desc: `Flow is a node-based calculator.
            
            Built using:
            JavaScript, HTML5, CSS, JSON`,
            source: "https://github.com/ZXMushroom63/Flow",
            demo: "https://zxmushroom63.github.io/Flow/"
        }
    },
    {
        x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Scratch++", tex: "zx_scratchplusplus", data: {
            desc: `Scratch++ is a Scratch mod that adds new features like fencing controls and the power operator. However, unlike other scratch mods, it also adds the ability to compile the project for use in normal Scratch!
            
            Built using:
            React, JSX, JavaScript, HTML5, CSS, Scratch, JSON`,
            source: "https://github.com/ZXMushroom63/scratch-gui",
            demo: "https://scratch.mit.edu/projects/960924608"
        }
    },
    {
        x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Useful Notebook", tex: "zx_notebook", data: {
            desc: `A node-based notebook that supports nesting and markdown syntax. Autosaves to localStorage, but can use the file system API to save to a file instead.
            
            Built using:
            HTML5, JavaScript, CSS`,
            source: "https://github.com/ZXMushroom63/useful-notebook/",
            demo: "https://zxmushroom63.github.io/useful-notebook/"
        },
    },
    {
        x: 601, y: 601, preX: 902, preY: 900, radius: 125, name: "HTML5 Audio Player", tex: "zx_audioplayer", data: {
            desc: `This is an audio player with multiple vizualisers built purely in web tech, packaged in a single .html file.
            
            Built using:
            JavaScript, HTML5, CSS`,
            source: "https://github.com/ZXMushroom63/simple-web-audio-player",
            demo: "https://zxmushroom63.github.io/simple-web-audio-player/"
        },
    },
];
let inspectedEntity = null;
const gravity = { x: 0, y: 20 };
const restitution = 0.7;
function clamp(x, min, max) {
    return Math.min(max, Math.max(min, x));
}
const timeScale = 1;
let grabbedEntity = null;
function startGrab(mouseEvent) {
    if (mouseEvent instanceof MouseEvent && mouseEvent.button !== 0) {
        return;
    }

    const now = Date.now();
    const x = (mouseEvent.x ?? mouseEvent.targetTouches[0].clientX) * devicePixelRatio;
    const y = (mouseEvent.y ?? mouseEvent.targetTouches[0].clientY) * devicePixelRatio;

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (Math.sqrt(Math.pow(x - entity.x, 2) + Math.pow(y - entity.y, 2)) < entity.radius) {
            // we have found the ball.
            mouse.nx = entity.x / devicePixelRatio;
            mouse.ny = entity.y / devicePixelRatio;
            grabbedEntity = entity;
            if ((now - entity.lastGrabbed) < 200) {
                // doubleclick?
                inspectedEntity = entity;

                displayText(entity.data.desc, entity.name);
            }
            entity.lastGrabbed = now;
            break;
        }
    }
}
function endGrab() {
    grabbedEntity = null;
}

const throwDamping = 0.7;

addEventListener("touchstart", startGrab);
addEventListener("mousedown", startGrab);
addEventListener("mouseup", endGrab);
addEventListener("touchend", endGrab);
addEventListener("touchcancel", endGrab);
function worldTick(deltaTime) {
    deltaTime *= timeScale;

    const minX = world.left;
    const minY = world.top;
    const maxX = world.right;
    const maxY = world.bottom;

    if (grabbedEntity) {
        grabbedEntity.x = mouse.nx * devicePixelRatio;
        grabbedEntity.y = mouse.ny * devicePixelRatio;
        grabbedEntity.preX = lerp(mouse.x, mouse.nx, throwDamping) * devicePixelRatio;
        grabbedEntity.preY = lerp(mouse.y, mouse.ny, throwDamping) * devicePixelRatio;
    }

    const velMult = 1 - (airResistance * deltaTime);

    // collision pairs
    for (let iter = 0; iter < 1; iter++) {
        for (let i = 0; i < entities.length; i++) {
            for (let j = 0; j < entities.length; j++) {
                if (i === j) {
                    continue;
                }
                const a = entities[i];
                const b = entities[j];

                const dx = b.x - a.x;
                const dy = b.y - a.y;

                const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                const combinedRadius = a.radius + b.radius;
                if (combinedRadius > dist) {
                    const depth = (dist - combinedRadius) / (b === grabbedEntity ? 2 : 2);
                    const cos = dx / dist;
                    const sin = dy / dist;
                    a.x += depth * cos;
                    a.y += depth * sin;
                    a.preY -= depth * cos * restitution;
                    a.preY -= depth * sin * restitution;
                }
            }
        }
    }

    entities.forEach(entity => {
        const r = entity.radius;

        entity.x ||= 0;
        entity.y ||= 0;

        entity.preX ||= 0;
        entity.preY ||= 0;

        const currentX = entity.x;
        const currentY = entity.y;

        const nextX = currentX + (currentX - entity.preX) * velMult + (gravity.x * deltaTime);
        const nextY = currentY + (currentY - entity.preY) * velMult + (gravity.y * deltaTime);

        entity.preX = currentX;
        entity.preY = currentY;

        let finalX = nextX + (Math.random() - 0.5) * noise;
        let finalY = nextY + (Math.random() - 0.5) * noise;

        const minBoundX = minX + r;
        const maxBoundX = maxX - r;

        if (finalX < minBoundX) {
            finalX = minBoundX;
            entity.preX = currentX - (minBoundX - nextX) * restitution;

        } else if (finalX > maxBoundX) {
            finalX = maxBoundX;
            entity.preX = currentX - (maxBoundX - nextX) * restitution;
        }

        const minBoundY = minY + r;
        const maxBoundY = maxY - r;

        if (finalY < minBoundY) {
            finalY = minBoundY;
            entity.preY = currentY - (minBoundY - nextY) * restitution;

        } else if (finalY > maxBoundY) {
            finalY = maxBoundY;
            entity.preY = currentY - (maxBoundY - nextY) * restitution;
        }

        entity.x = finalX;
        entity.y = finalY;
    });
}