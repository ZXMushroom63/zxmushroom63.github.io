// fetch("rain_transparent.webm").then(async res => {
//     const blob = await res.blob();
//     const url = URL.createObjectURL(blob);
//     document.querySelectorAll(".videoasset").forEach(x => {
//         x.src = url;
//         x.load();
//     });
// });
const audioCtx = new AudioContext({
    sampleRate: 48000
});
async function main() {
    launched = true;
    const rainBytes = await (await fetch("rain_a.mp3")).arrayBuffer();
    const windBytes = await (await fetch("3min_wind_synth.wav")).arrayBuffer();
    const rainBuffer = await audioCtx.decodeAudioData(rainBytes);
    const windBuffer = await audioCtx.decodeAudioData(windBytes);

    const rainSource = audioCtx.createBufferSource();
    rainSource.loop = true;
    rainSource.buffer = rainBuffer;

    const windSource = audioCtx.createBufferSource();
    windSource.loop = true;
    windSource.buffer = windBuffer;

    const gainNode = audioCtx.createGain();

    rainSource.connect(gainNode);
    windSource.connect(gainNode);


    gainNode.gain.setValueAtTime(0, 0);
    globalThis.gain = gainNode.gain;
    gainNode.connect(audioCtx.destination);

    rainSource.start(0);
    windSource.start(0);

    gainNode.gain.setTargetAtTime(0.1, 0, 1);

    start = Date.now();
}
document.onclick = () => {
    document.onclick = null;
    main();
}
var blurred = false;
addEventListener("blur", () => {
    if (!blurred && window.gain) {
        blurred = true;
        gain.setTargetAtTime(0.0, audioCtx.currentTime, 1);
    }
});
addEventListener("focus", () => {
    if (blurred && window.gain) {
        blurred = false;
        gain.setTargetAtTime(0.1, audioCtx.currentTime, 1);
    }
})