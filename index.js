window.onload = function () {
    console.log("Widget JS loaded");

    ZOHO.embeddedApp.init().then(() => {
        console.log("Zoho SDK initialized");

        const currencyEl = document.getElementById("currency");
        const confirmBtn = document.getElementById("confirmBtn");
        const msgEl = document.getElementById("message");

        confirmBtn.onclick = async function () {
            console.log("Confirm clicked");

            confirmBtn.disabled = true;
            confirmBtn.innerText = "Opening...";

            try {
                await ZOHO.CRM.UI.Record.create({
                    Entity: "Quotes",
                    prefill: {
                        Currency: currencyEl.value || "SGD"
                    }
                });

                // close widget AFTER opening form
                ZOHO.embeddedApp.close();

            } catch (e) {
                console.error(e);
                msgEl.innerText = "Failed to open Quote";
                confirmBtn.disabled = false;
                confirmBtn.innerText = "Confirm";
            }
        };
    });
};
