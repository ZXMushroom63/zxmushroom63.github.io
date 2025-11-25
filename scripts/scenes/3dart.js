renderer["fn_3dart"] = function () {
    const Pool = Object.keys(assets).filter(x => x.startsWith("r_"));
    if (!overrideImage) {
        overrideImage = Pool[Math.floor(Math.random() * Pool.length)];
    } else {
        overrideImage = null;
    }
}
addEventListener("load", () => {
    const save3d = document.querySelector("#save3d");
    save3d.addEventListener("click", () => {
        if (overrideImage) {
            const dlTarget = document.createElement("a");
            dlTarget.download = overrideImage.endsWith("_w") ? overrideImage.replace("_w", "") + ".webp" : overrideImage + ".png";
            dlTarget.href = assets[overrideImage]().src;
            dlTarget.click();
        } else {
            const dlTarget = document.createElement("a");
            dlTarget.download = "output_file.webm";
            dlTarget.href = "images/output_file.webm";
            dlTarget.click();
        }
    });
});