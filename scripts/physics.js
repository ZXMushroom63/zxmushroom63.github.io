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
        x: 600, y: 600, preX: 600, preY: 600, radius: 125, name: "SYNTHETIC Audio", tex: "zx_synthetic", data: {
            desc: `Web based DAW that supports multiplayer, has synths & soundfonts, custom waveforms and LFOs, you get the idea.
            
            <br><br><br>Built using:<br>
            HTML5, JavaScript, CSS, Ungodly amount of web APIs`,
            source: "https://github.com/ZXMushroom63/synthetic-audio/",
            demo: "https://zxmushroom63.github.io/synthetic-audio/",
            scrshot: "public/demo_images/synthetic_cover.png"
        },
    },
    {
        x: 601, y: 600, preX: 600, preY: 600, radius: 125, name: "Color Calendar", tex: "zx_calendar", data: {
            desc: `Color-coded PWA Calendar that runs offline using SW caching. It has a cool endless scrolling effect created by recycling 5 elements.
            
            <br><br><br>Built using:<br>
            HTML5, JavaScript, CSS
            `,
            source: "https://github.com/ZXMushroom63/color-calendar/",
            demo: "https://zxmushroom63.github.io/color-calendar/",
            scrshot: "public/demo_images/colorcal.png"
        }
    },
    {
        x: 602, y: 603, preX: 600, preY: 600, radius: 125, name: "EaglerForge", tex: "ef_eaglerforgeold", data: {
            desc: `EaglerForge is a fork of EaglercraftX (a web-port of Minecraft 1.8.8) that adds a modding API. I contributed the majority of the modding API, back when the project was called EaglerReborn. My recent contributions mainly include a prototype mod list GUI built in Java rather than HTML, and a semi-automatic reflection structure generator.
            
            <br><br><br>Built using:<br>
            Java, GLSL, JavaScript, HTML5, CSS`,
            source: "https://github.com/EaglerForge/EaglerForge",
            demo: "https://github.com/EaglerForge/EaglerForge",
            scrshot: "public/demo_images/eflegacy.png"
        },
    },
    {
        x: 603, y: 600, preX: 600, preY: 600, radius: 125, name: "EFI", tex: "ef_eaglerforge", data: {
            desc: `EaglerForgeInjector is a tool I created for the EaglerForge project to automatically inject a reflection-enabled modding API into eaglercraft builds.
            It works by matching transpiled JavaScript and inserting hooks and monkey patching any important methods, then exposing methods, classes, and properties with a more user friendly API, along with a corelib.
            
            <br><br><br>Built using:<br>
            JavaScript, HTML5, CSS`,
            source: "https://github.com/EaglerForge/EaglerForgeInjector",
            demo: "https://www.youtube.com/watch?v=lFR_370l89E",
            scrshot: "public/demo_images/duck_mod.png"
        },
    },
    {
        x: 604, y: 600, preX: 600, preY: 600, radius: 125, name: "EF Builder New", tex: "ef_efbn", data: {
            desc: `EaglerForgeBuilder was a project by <a href="https://github.com/OeildeLynx31">@OeilDeLynx32</a>, made for the legacy version of EaglerForge. EFBN is a more advanced & opinionated version for modern EaglerForge, and can create blocks and items with custom behaviour.
            
            <br><br><br>Built using:<br>
            JavaScript, HTML5, CSS`,
            source: "https://github.com/EaglerForge/EaglerForgeBuilderNew",
            demo: "https://eaglerforge.github.io/EaglerForgeBuilderNew/",
            scrshot: "public/demo_images/efbn_scrshot.png"
        },
    },
    {
        x: 602, y: 600, preX: 600, preY: 600, radius: 125, name: "Flow", tex: "zx_flow", data: {
            desc: `Flow is a node-based calculator.
            
            <br><br><br>Built using:<br>
            JavaScript, HTML5, CSS, JSON`,
            source: "https://github.com/ZXMushroom63/Flow",
            demo: "https://zxmushroom63.github.io/Flow/",
            scrshot: "public/demo_images/flow_graph.png"
        }
    },
    {
        x: 602, y: 601, preX: 600, preY: 600, radius: 125, name: "Scratch++", tex: "zx_scratchplusplus", data: {
            desc: `Scratch++ is a Scratch mod that adds new features like fencing controls and the power operator. However, unlike other scratch mods, it also adds the ability to compile the project for use in normal Scratch!
            
            <br><br><br>Built using:<br>
            React, JSX, JavaScript, HTML5, CSS, Scratch, JSON`,
            source: "https://github.com/ZXMushroom63/scratch-gui",
            demo: "https://scratch.mit.edu/projects/960924608",
            scrshot: "public/demo_images/spp_demo_image.png"
        }
    },
    {
        x: 602, y: 600, preX: 600, preY: 600, radius: 125, name: "Useful Notebook", tex: "zx_notebook", data: {
            desc: `A node-based notebook that supports nesting and markdown syntax. Autosaves to localStorage, but can use the file system API to save to a file instead.
            
            <br><br><br>Built using:<br>
            HTML5, JavaScript, CSS`,
            source: "https://github.com/ZXMushroom63/useful-notebook/",
            demo: "https://zxmushroom63.github.io/useful-notebook/",
            scrshot: "public/demo_images/notebook.png"
        },
    },
    {
        x: 601, y: 601, preX: 600, preY: 600, radius: 125, name: "HTML5 Audio Player", tex: "zx_audioplayer", data: {
            desc: `This is an audio player with multiple vizualisers built purely in web tech, packaged in a single .html file.
            
            <br><br><br>Built using:<br>
            JavaScript, HTML5, CSS`,
            source: "https://github.com/ZXMushroom63/simple-web-audio-player",
            demo: "https://zxmushroom63.github.io/simple-web-audio-player/",
            scrshot: "public/demo_images/goodmusic.png"
        },
    },
    {
        x: 601, y: 602, preX: 604, preY: 601, radius: 125, name: "UE4 Wakatime Integration", tex: "zx_ue4waka", data: {
            desc: `WakatimeIntegration is an Unreal Engine 4 plugin that sends heartbeats to track your time. Unlike other tracking plugins, it keeps track of adding and removing assets, as well as the last edited asset and sends that data with the heartbeat. This makes it ideal for use in Hack Club. This is also my second ever experience with C++, and I'm already sick of null pointer exceptions!
            
            <br><br><br>Built using:<br>
            C++, C#`,
            source: "https://github.com/ZXMushroom63/WakatimeIntegration",
            demo: "https://hackatime.hackclub.com/docs/editors/unreal-engine-4",
            scrshot: "public/demo_images/wakatime_scrshot.png"
        },
    },
    {
        x: 599, y: 598, preX: 604, preY: 601, radius: 125, name: "Junk Graveyard", tex: "zx_junkgraveyard", data: {
            desc: `small horror game about metal detecting for a profit to clear the dig site of its valuables.
            
            <br><br><br>Built using:<br>
            Unreal Engine 5, SYNTHETIC Audio, Blender 4.5`,
            source: "https://github.com/ZXMushroom63/DiggingGame",
            demo: "https://zxmushroom63.itch.io/junk-graveyard",
            scrshot: "public/demo_images/craig.png"
        },
    }
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
    if (currentScene !== "projects") {
        return;
    }
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
            if ((now - entity.lastGrabbed) < (200 * (1 + mobileMode))) {
                // doubleclick?
                inspectedEntity = entity;

                displayProj(entity.data.desc, entity.name, entity.data.source, entity.data.demo, entity.data.scrshot);
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
        const len = entities.length;
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) { // now nlogn
                const a = entities[i];
                const b = entities[j];

                const dx = b.x - a.x;
                const dy = b.y - a.y;

                const distSq = (dx * dx) + (dy * dy);
                const combinedRadius = a.radius + b.radius;
                const combinedRadiusSq = combinedRadius * combinedRadius;

                if (combinedRadiusSq > distSq) {
                    const dist = Math.sqrt(distSq);
                    const depth = (dist - combinedRadius) * Math.min(1, deltaTime * 60);

                    const normX = dist === 0 ? 1 : dx / dist;
                    const normY = dist === 0 ? 0 : dy / dist;

                    const correctAX = (depth / 2) * normX;
                    const correctAY = (depth / 2) * normY;

                    a.x += correctAX;
                    a.y += correctAY;
                    b.x -= correctAX;
                    b.y -= correctAY;

                    a.preX -= correctAX * restitution;
                    a.preY -= correctAY * restitution;
                    b.preX += correctAX * restitution;
                    b.preY += correctAY * restitution;
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
