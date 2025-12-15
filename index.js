window.onload = function () {
    alert("JS LOADED");

    const btn = document.getElementById("confirmBtn");

    if (!btn) {
        alert("BUTTON NOT FOUND");
        return;
    }

    btn.onclick = function () {
        alert("BUTTON CLICK WORKS");
    };
};
