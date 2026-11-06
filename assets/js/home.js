(function () {
    var files = [
        "packs/pack8/sound1-a.mp3",
        "packs/pack8/sound2-a.mp3",
        "packs/pack8/sound3-a.mp3",
        "packs/pack8/sound6-a.mp3",
        "packs/pack8/sound8-a.mp3",
        "packs/pack8/sound9-a.mp3",
        "packs/pack8/sound5-a.mp3",
        "packs/pack8/sound4-a.mp3",
        "packs/pack8/sound7-a.mp3",
        "packs/pack8/sound10-a.mp3",
        "packs/pack8/sound11-a.mp3",
        "packs/pack8/sound12-a.mp3"
    ];
    var base = "https://firebasestorage.googleapis.com/v0/b/mpc-app-c2e7a.firebasestorage.app/o/";
    var clips = files.map(function (path) {
        var audio = new Audio(base + encodeURIComponent(path) + "?alt=media");
        audio.preload = "auto";
        return audio;
    });

    function play(index) {
        var source = clips[index];
        if (!source) return;
        var audio = new Audio(source.src);
        audio.play().catch(function () {});
    }

    document.querySelectorAll(".screen").forEach(function (screen) {
        var grid = document.createElement("div");
        grid.className = "pad-grid";
        for (var i = 0; i < 12; i++) {
            var pad = document.createElement("button");
            pad.type = "button";
            pad.className = "pad";
            pad.setAttribute("aria-label", "Pad");
            pad.dataset.sound = String(i);
            pad.addEventListener("pointerdown", function (event) {
                var hit = event.currentTarget;
                hit.classList.remove("is-lit");
                void hit.offsetWidth;
                hit.classList.add("is-lit");
                play(Number(hit.dataset.sound));
            });
            grid.appendChild(pad);
        }
        screen.appendChild(grid);
    });
})();

(function () {
    var ipad = document.querySelector(".device-ipad .screen");
    var phone = document.querySelector(".device-phone .screen");
    if (!ipad || !phone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var flipped = false;
    function show(screen, name) {
        screen.querySelectorAll(".shot").forEach(function (shot) {
            shot.classList.toggle("is-on", shot.getAttribute("data-shot") === name);
        });
    }

    setInterval(function () {
        flipped = !flipped;
        show(ipad, flipped ? "packs" : "pads");
        show(phone, flipped ? "pads" : "packs");
    }, 7000);
})();

(function () {
    var bars = document.getElementById("bars");
    if (!bars) return;
    for (var n = 0; n < 72; n++) {
        var bar = document.createElement("i");
        var hi = 22 + Math.random() * 78;
        var lo = 8 + Math.random() * Math.min(24, hi * 0.35);
        bar.style.setProperty("--hi", hi.toFixed(1) + "%");
        bar.style.setProperty("--lo", lo.toFixed(1) + "%");
        bar.style.setProperty("--d", (3.4 + Math.random() * 5.2).toFixed(2) + "s");
        bar.style.setProperty("--delay", (-Math.random() * 7).toFixed(2) + "s");
        bars.appendChild(bar);
    }
})();
