window.onload = function () {
    alert("Window loaded");

    ZOHO.embeddedApp.init().then(() => {
        alert("SDK INITIALIZED");
    }).catch(e => {
        alert("SDK FAILED");
        console.error(e);
    });
};



