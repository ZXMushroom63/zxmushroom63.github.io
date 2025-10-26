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
    { x: 606, y: 600, preX: 901, preY: 900, radius: 125, name: "SYNTHETIC Audio", tex: "zx_synthetic" },
    { x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Color Calendar", tex: "zx_calendar" },
    { x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "EaglerForge", tex: "ef_eaglerforge" },
    { x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Flow", tex: "zx_flow" },
    { x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Scratch++", tex: "zx_scratchplusplus" },
    { x: 602, y: 600, preX: 902, preY: 900, radius: 125, name: "Useful Notebook", tex: "zx_notebook" },
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