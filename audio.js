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
globalThis.gain2 = {
    setValueAtTime: ()=>{},
};
async function main() {
    launched = true;
    launchText = "loading rain_a.mp3...";
    const rainBytes = await (await fetch("rain_a.mp3")).arrayBuffer();
    launchText = "loading 3min_wind_synth.mp3...";
    const windBytes = await (await fetch("3min_wind_synth.mp3")).arrayBuffer();
    launchText = "loading [EXPURGED]...";
    const _Bytes = await (await fetch("recording.mp3")).arrayBuffer();

    bgrain1.play();

    launchText = "decoding rain_a.mp3...";
    const rainBuffer = await audioCtx.decodeAudioData(rainBytes);
    launchText = "decoding 3min_wind_synth.wav...";
    const windBuffer = await audioCtx.decodeAudioData(windBytes);
    launchText = "decoding [EXPURGED]...";
    const _Buffer = await audioCtx.decodeAudioData(_Bytes);
    launchText = "";

    const rainSource = audioCtx.createBufferSource();
    rainSource.loop = true;
    rainSource.buffer = rainBuffer;

    const windSource = audioCtx.createBufferSource();
    windSource.loop = true;
    windSource.buffer = windBuffer;

    const _Source = audioCtx.createBufferSource();
    _Source.buffer = _Buffer;

    const gainNode = audioCtx.createGain();

    const sliderNode = audioCtx.createGain();

    rainSource.connect(gainNode);
    windSource.connect(gainNode);
    _Source.connect(gainNode);


    gainNode.gain.setValueAtTime(0, 0);
    globalThis.gain = gainNode.gain;

    sliderNode.gain.setValueAtTime(sliderVol, 0);
    window.gain2 = sliderNode.gain;
    gainNode.connect(sliderNode);
    sliderNode.connect(audioCtx.destination);

    rainSource.start(0);
    windSource.start(0);

    if (Math.random() < 0.125) { // hello :]
        _Source.start(Math.random() * 63);
    }

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