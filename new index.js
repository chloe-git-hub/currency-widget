window.onload = function () {
    ZOHO.embeddedApp.init().then(() => {

        const btn = document.getElementById("confirmBtn");
        const currencyEl = document.getElementById("currency");
        const msg = document.getElementById("message");

        btn.onclick = async function () {
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

                ZOHO.embeddedApp.close();

            } catch (e) {
                console.error(e);
                msg.innerText = "Unable to open Quote form.";
                btn.disabled = false;
                btn.innerText = "Confirm";
            }
        };

    });
};

