const styleGraph = (svg, div) => {
    svg.querySelectorAll("polygon + text").forEach((e) => {
        if (e.innerHTML == "EOW") return e.setAttribute("font-size", "10pt");
        e.setAttribute("font-size", "18pt");
        const x = +e.getAttribute("x");
        e.setAttribute("x", x + 1);
    });
    svg.querySelectorAll("ellipse + text").forEach((n) => (n.innerHTML = " "));
    div.style.width = svg.getAttribute("width");
    div.appendChild(svg);
};

/**
 * This code snippet is from {@link https://ramblings.mcpher.com/gassnippets2/converting-svg-to-png-with-javascript/ mcpher}
 */
const svgToPng = (svgElement) => {
    return new Promise((resolve) => {
        var domUrl = window.URL || window.webkitURL || window;
        var height =
            (svgElement.getAttribute("height").replace("pt", "") * 4) / 3;
        var width =
            (svgElement.getAttribute("width").replace("pt", "") * 4) / 3;
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        var svg = new Blob([svgElement.outerHTML], {
            type: "image/svg+xml;charset=utf-8",
        });
        var url = domUrl.createObjectURL(svg);
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(this, 0, 0);
            domUrl.revokeObjectURL(url);
            resolve(canvas.toDataURL());
        };
        img.src = url;
    });
};
