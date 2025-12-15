window.onload = function () {
    ZOHO.embeddedApp.init().then(() => {
        console.log("SDK initialized");

        const btn = document.getElementById("confirmBtn");
        const currencyEl = document.getElementById("currency");
        const msg = document.getElementById("message");

        btn.addEventListener("click", async () => {
            msg.innerText = "";

            const currency = currencyEl.value;
            if (!currency) {
                msg.innerText = "Please select a currency.";
                return;
            }

            btn.disabled = true;
            btn.innerText = "Opening Quote…";

            try {
                await ZOHO.CRM.UI.Record.create({
                    Entity: "Quotes",
                    prefill: {
                        Currency: currency
                    }
                });

                // close widget after opening form
                ZOHO.embeddedApp.close();

            } catch (e) {
                console.error(e);
                msg.innerText = "Failed to open Quote form.";
                btn.disabled = false;
                btn.innerText = "Confirm";
            }
        });
    });
};





