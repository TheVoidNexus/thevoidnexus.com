function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.top = `${60 + Math.random() * (window.innerHeight - 50)}px`;
    dot.style.animationDuration = `${30 + Math.random() * 5}s`;

    const hue = Math.random() < 0.5 ? Math.floor(300 + Math.random() * 31) : Math.floor(270 + Math.random() * 31);
    dot.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;

    document.querySelector('.dynamic-background').appendChild(dot);

    setTimeout(function() {
        document.querySelector('.dynamic-background').removeChild(dot);
        dot.remove;
    }, 60000);
}

setInterval(function() {
    createDot();
}, 1750);


document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("load", function() {
        const loading = document.getElementById("loading");
        setTimeout(function() {
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = "none";
            }, 1000)
        }, 750);
    });
});