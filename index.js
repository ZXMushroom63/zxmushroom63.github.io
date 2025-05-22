function splashAnim(elem) {
    elem.classList.add("fadeOut");
    setTimeout(() => {
        elem.remove();

        addTracedNodes([{
            img: "public/scratchplusplus.svg",
            hover: "Click to learn more about Scratch++",
            title: "Scratch++",
            desc: `Scratch++ is a Scratch mod that adds new features like fencing controls and the power operator. However, unlike other scratch mods, it also adds the ability to compile the project for use in normal Scratch!
            
            Built using:
            React, JSX, JavaScript, HTML5, CSS, Scratch, JSON`,
            source: "https://github.com/ZXMushroom63/scratch-gui",
            demo: "https://scratch.mit.edu/projects/960924608"
        },
        {
            img: "public/flow.png",
            hover: "Click to learn more about Flow",
            title: "Flow",
            desc: `Flow is a node-based calculator.
            
            Built using:
            JavaScript, HTML5, CSS, JSON`,
            source: "https://github.com/ZXMushroom63/Flow",
            demo: "https://zxmushroom63.github.io/Flow/"
        },
        {
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABAFJREFUWEfNl8uvX2MUhp+lOBRtOXW/9SKoEvd7UCV6YcCAECMRAzEhBhp/gDAQJmIgYtRUGDBwD6VNlBCXpuoWRQ/HrS16O6fVy2c/J+8vafgDdgc7+5z9+9a33vW+71rf3gXQaEPAIf4N7ChqZ6NNAo4AhoEjgcnAAcAe4J9cuyfCoYADgYNzGbsXGAP+AjYBW4va879c+zxwo/GidjXaocDRuQ5Pkm3AZmBLNt4VMMGNSQ8K0CnAVMBYwRm7wauo8UZznTmqGs2FJh8ranejGXx8krupCf8A/pSdbGilMuZdVqxWVvzdu/v5+1HAMYB7ypwgfi1qS6PJ2OQBAJNbuWBODu3S+1sCxhrNDWXlOGB65PHZAIDJtwIbE2e1OxpN6SzIOJMqx09FbZYJAQxFc1Geks3HXQT8ngQnAKcFnCDdSID/9cDguVIZ/x3wSxg6NvFSL8gRmVAfTehDk4vSSn4M7Wp4JjAnwNR9UKGSbA+1SnVYKB8wpM6u/Qr4Oj5QjhmRR3ZHZMDgEwNA7X6Q9pjoPOCsaG0l3xikGYvam1iLaHG4csiQxZwByJye+BL4PCZWjpnx0gSAacDsOPbnVK9uFwLnhD43WFPUxkazUgGflIo1oklkxPjRorY3mj4x3gIEtgb4JB0kC8ZvE4DJ/Ue3W6E0W/nFQfkZ4OVzq7okspjA+THBALAzlEv3R9lLGc7P5ZqPw4TP3WuKAC5K764rarTRTgWuSXWrgQ/T6JcD86OhydTQ9tQzdoP6qr+g9NBy4IPEXgacG5ZWFLW+0WRxtgCujkE0iyivzGLpdJO/u7trbkqSb7Ox66XdTtD99rxmFejpAfdKB3oloMyCl2mLej/MzRHAvLTM91lwXXp8ZVGrG21uR+cdqVwK3dS1ekGT2SlOOk1qV8wKWCWUiWVFrW00GbAQZ8U78cssAVyVNnFAaLwrgv6NmOs2QFBWvjTJ1XVxvOL80D+6/LX4RRB3hgmTvZBOWhgWV8WQwwK4FPgi/XxtXPspsCLD5+7MgOeBt2Oo+wB11f1WLwt2g355KiCu7wq7PcZ8NkNJb12QtnwXmCQAq1kbI96Qsfle6Fc3K9FwT8cP90cSp9yLYcSKbw3gZZ3mT0b3e2PMpUUtjwxK7px5a+L8aTR71T732JUij+A3M5Bu6ai9Oe3zTDzySObG4+q7z1jWJw8C6zpmHo7G96SdX+6M/VIG0IL4QIk3CeDsjEsPGgE4hF6PMdX/xjj5OcC1j+YofSg6PtFNuAfin8c80rvWXBJZ74rxXo0PPOgWZRgJYMN+wUDvHui9C3qfA71Pwt7Pgt5Pw97fB3p/I+r3nXB/eCvu97sgX0O9fhn1/m04+DTv5ev4XyrvgPv9iDDEAAAAAElFTkSuQmCC",
            hover: "Click to learn more about the HTML5 Audio Player",
            title: "HTML5 Audio Player",
            desc: `This is an audio player with multiple vizualisers built purely in web tech, packaged in a single .html file.
            
            Built using:
            JavaScript, HTML5, CSS`,
            source: "https://github.com/ZXMushroom63/simple-web-audio-player",
            demo: "https://zxmushroom63.github.io/simple-web-audio-player/"
        },
        {
            img: "public/EaglerForge.png",
            hover: "Click to learn more about EaglerForge",
            title: "EaglerForge",
            desc: `EaglerForge is a fork of EaglercraftX (a web-port of Minecraft 1.8.8) that adds a modding API. I contributed the majority of the modding API, back when the project was called EaglerReborn. My recent contributions mainly include a prototype mod list GUI built in Java rather than HTML, and a semi-automatic reflection structure generator.
            
            Built using:
            Java, GLSL, JavaScript, HTML5, CSS`,
            source: "https://github.com/EaglerForge/EaglerForge",
            demo: "https://github.com/EaglerForge/EaglerForge"
        },
        {
            img: "public/EaglerForge.png",
            hover: "Click to learn more about EaglerForgeInjector",
            title: "EFI",
            desc: `EaglerForgeInjector is a tool I created with for the EaglerForge project to automatically inject a reflect-enabled modding API into eaglercraft builds.
            
            Built using:
            JavaScript, HTML5, CSS`,
            source: "https://github.com/EaglerForge/EaglerForgeInjector",
            demo: "https://eaglerforge.github.io/EaglerForgeInjector/"
        },
        {
            img: false,
            hover: "Click to learn more about YT2Book",
            title: "YT2Book",
            desc: `YT2Book is a web-tool to convert youtube videos to e-books. It supports chapters, selecting fonts, and including images at various points from the video in the e-book. Broken until glitch.me adds support for node v18 and up
            
            Built using:
            Node.js, XML, JavaScript, HTML5, CSS`,
            source: "https://glitch.com/edit/#!/yt2book",
            demo: "https://yt2book.glitch.me"
        },
        {
            img: "public/google_docs_chipper.png",
            hover: "Click to learn more about GDC",
            title: "Google Docs Customiser",
            desc: `Google Docs Customiser is a tool I made that lets you generate and copy unobtainable "smart chips" to your clipboard. This include overstacked calendar chips. For example: 41st May 2020
            
            Built using:
            HTML5, JavaScript, CSS`,
            source: "https://glitch.com/edit/#!/google-docs-customiser",
            demo: "https://google-docs-customiser.glitch.me"
        },
        {
            img: "public/useful-notebook.png",
            hover: "Finally, a useful notebook.",
            title: "Useful Notebook",
            desc: `A node-based notebook that supports nesting and markdown syntax. Autosaves to localStorage, but can use the file system API to save to a file instead.
            
            Built using:
            HTML5, JavaScript, CSS`,
            source: "https://github.com/ZXMushroom63/useful-notebook/",
            demo: "https://zxmushroom63.github.io/useful-notebook/"
        },
        {
            img: "public/makemeablender.png",
            hover: "Tool that helps with pulling, building, and running blender branches.",
            title: "MkMeABlender",
            desc: `Graphical tool that to help with pulling, building, and running Blender branches. Can mix-and-match pull requests if they don't conflict, too.
            
            Built using:
            HTML5, JavaScript, CSS, Rust, Tauri`,
            source: "https://github.com/ZXMushroom63/MakeMeABlender/",
            demo: "https://www.youtube.com/watch?v=lw0k9YSwZ8w"
        },
        {
            img: "public/synthetic.png",
            hover: "Web DAW",
            title: "SYNTHETIC Audio",
            desc: `Web based DAW that supports mutliplayer, has synths & soundfonts, custom waveforms and LFOs, you get the idea.
            
            Built using:
            HTML5, JavaScript, CSS, Ungodly amount of web APIs`,
            source: "https://github.com/ZXMushroom63/synthetic-audio/",
            demo: "https://zxmushroom63.github.io/synthetic-audio/"
        },
        ]);

    }, 500)
}
function sleep(t) {
    return new Promise((res, rej) => {
        setTimeout(() => { res() }, t * 1000);
    });
}
async function addTracedNodes(data) {
    const ringSpacing = 10;
    var currentRingSize = 6;
    var currentRing = 1;
    var cumulativeIndex = 0;
    for (let index = 0; index < data.length; index++) {
        cumulativeIndex++;
        if (index !== 0 && cumulativeIndex % (currentRingSize + 1) === 0) {
            cumulativeIndex -= currentRingSize;
            currentRingSize *= 2;
            currentRing += 1;
        }
        await sleep(0.2);
        const elem = data[index];
        const node = document.createElement("div");
        node.style = "--degree-offset: " + (ringSpacing * currentRing) + "rem; --degree-pos: " + ((360 / currentRingSize) * (index % currentRingSize)) + "deg; background-image: " + (elem.img ? "url(" + elem.img + ")" : `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC)`) + "; --title-text: \"" + elem.title + "\"";
        node.setAttribute("title", elem.hover);
        node.classList.add("node");
        node.classList.add("fadeIn");
        node.addEventListener("click", () => {
            document.querySelectorAll(".selected").forEach(nodes => {
                nodes.classList.remove("selected");
            });
            document.querySelector("#info>span").innerText = elem.desc;
            document.querySelector("#viewsource").removeAttribute("disabled");
            document.querySelector("#viewsource").onclick = () => {
                window.open(elem.source);
            }

            document.querySelector("#viewdemo").removeAttribute("disabled");
            document.querySelector("#viewdemo").onclick = () => {
                window.open(elem.demo);
            }
            if (elem.source.startsWith("https://github.com")) {
                var embed = elem.source.replace("https://github.com/", "");
                if (embed.endsWith("/")) {
                    embed = embed.substring(0, embed.length - 1);
                }
                document.querySelector("#repostars").style.display = "inline-block";
                document.querySelector("#repostars").src = `https://img.shields.io/github/stars/${embed}?style=social`;
            } else {
                document.querySelector("#repostars").style.display = "none";
            }
            node.classList.add("selected");
        });
        document.body.appendChild(node);
        node.style.opacity = "1";
    }
}
document.querySelector(".mainNode").addEventListener("click", () => {
    document.querySelector("#repostars").style.display = "none";
    document.querySelectorAll(".selected").forEach(nodes => {
        nodes.classList.remove("selected");
    });
    document.querySelector("#info>span").innerText = "Welcome to my portfolio!";
    document.querySelector("#viewsource").setAttribute("disabled", "");
    document.querySelector("#viewdemo").setAttribute("disabled", "");
});
