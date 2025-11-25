renderer["fn_3dart"] = function () {
    const Pool = [null, ...Object.keys(assets).filter(x => x.startsWith("r_"))];
    overrideImage = Pool[Math.floor(Math.random() * Pool.length)];
}