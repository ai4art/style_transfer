let ws;


function setWithDataURL(url, elem) {
    let img = $("<img>");
    let h, w;
    img[0].onload = () => {
        h = img[0].naturalHeight;
        w = img[0].naturalWidth;
        img.attr("class", "replace");
        let scale = parseInt($(elem).css("width")) / Math.max(h, w);
        img.attr("height", Math.min(h, h * scale));
        img.attr("width", Math.min(w, w * scale));
        $("#" + elem.id + " .replace").replaceWith(img);
    };
    img.attr("src", url);
}


function wsConnect() {
    ws = new WebSocket("ws://" + window.location.host + "/websocket");

    ws.onclose = () => {
        let error = $("#error")[0];
        error.innerText = "Disconnected from the backend.";
        error.style.display = "initial";
    };

    ws.onerror = ws.onclose;

    ws.onmessage = (e) => {
        let msg = JSON.parse(e.data);
        setWithDataURL(msg.image, $("#image")[0]);
        $("#step")[0].innerText = msg.step;
        $("#steps")[0].innerText = msg.steps;
        $("#time")[0].innerText = msg.time.toFixed(2);
        $("#update-size")[0].innerText = msg.update_size.toFixed(2);
        $("#loss")[0].innerText = msg.loss.toExponential(6);
        $("#tv")[0].innerText = msg.tv.toFixed(2);
    };
}


$(document).ready(() => {
    wsConnect();
});