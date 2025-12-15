window.onload = function () {
    ZOHO.embeddedApp.init().then(() => {

        alert("SDK INIT OK");

        document.getElementById("confirmBtn").onclick = function () {
            alert("BUTTON CLICKED");
        };

    });
};

