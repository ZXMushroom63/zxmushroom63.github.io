let passes = 0;
function lagswitch() {
    if (passes > 1) {
        return;
    }
    avgTime = 0;
    window.devicePixelRatio = devicePixelRatio / 1.5;
    wr_resize();
    passes++;
}
const canvas_entries = [];
function wr_resize() {
    canvas_entries.forEach(x => {
        x.height = devicePixelRatio * window.innerHeight;
        x.width = devicePixelRatio * window.innerWidth;
    })
}
function vw(n) {
    return devicePixelRatio * innerWidth * n;
}
function vh(n) {
    return devicePixelRatio * innerHeight * n;
}
function px(n) {
    return Math.floor(devicePixelRatio * n);
}
addEventListener("resize", wr_resize);