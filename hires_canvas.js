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
addEventListener("resize", wr_resize);