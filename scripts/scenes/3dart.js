renderer["fn_3dart"] = function () {
    const Pool = Object.keys(assets).filter(x => x.startsWith("r_"));
    if (!overrideImage) {
        overrideImage = Pool[Math.floor(Math.random() * Pool.length)];
    } else {
        overrideImage = null;
    }
}