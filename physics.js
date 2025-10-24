// custom made physics engine based on verlet integration
// thank you Ricky-Jan https://scratch.mit.edu/projects/899958937/fullscreen/

const world = {
    left: 0,
    top: 0,
    right: 2000,
    bottom: 2000
}
const noise = 0.01;
const airResistance = 0.7;
const entities = [
    { x: 1000, y: 1000, preX: 1000, preY: 1000, radius: 25, id: "mouse" },
    { x: 606, y: 600, preX: 901, preY: 900, radius: 125, id: "" },
    { x: 602, y: 600, preX: 902, preY: 900, radius: 125, id: "" },
    { x: 607, y: 600, preX: 903, preY: 900, radius: 125, id: "" },
]
const gravity = { x: 0, y: 15 };
const restitution = 0.9;
function clamp(x, min, max) {
    return Math.min(max, Math.max(min, x));
}
const timeScale = 1;
function worldTick(deltaTime) {
    deltaTime *= timeScale;

    const minX = world.left;
    const minY = world.top;
    const maxX = world.right;
    const maxY = world.bottom;

    const obj_mouse = entities[0];

    obj_mouse.x = obj_mouse.preX = mouse.nx * devicePixelRatio;
    obj_mouse.y = obj_mouse.preY = mouse.ny * devicePixelRatio;

    if (mouse.nx < 0) {
        obj_mouse.radius = 0;
    } else {
        obj_mouse.radius = 25;
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
                if (a.id === "mouse") {
                    continue;
                }

                const dx = b.x - a.x;
                const dy = b.y - a.y;

                const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                const combinedRadius = a.radius + b.radius;
                if (combinedRadius > dist) {
                    const depth = (dist - combinedRadius) / (b.id === "mouse" ? 16 : 2);
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