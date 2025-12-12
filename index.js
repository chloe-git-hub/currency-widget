// index.js - fully debugged widget
window.onload = function() {
    console.log("Widget JS loaded");

    ZOHO.embeddedApp.init().then(() => {
        console.log("Zoho SDK initialized");

        const currencyEl = document.getElementById('currency');
        const confirmBtn = document.getElementById('confirmBtn');
        const msgEl = document.getElementById('message');

        if (!currencyEl || !confirmBtn) {
            console.error("Currency dropdown or Confirm button not found!");
            msgEl.textContent = "Widget not loaded properly.";
            return;
        }

        confirmBtn.addEventListener('click', async function() {
            console.log("Confirm button clicked");
            msgEl.textContent = "";
            confirmBtn.disabled = true;
            confirmBtn.textContent = "Opening...";

            const currency = currencyEl.value || "SGD"; // default to SGD if none selected

            try {
                console.log("Opening new Quote form with currency:", currency);

                await ZOHO.CRM.UI.Record.create({
                    Entity: "Quotes",
                    prefill: {
                        "Currency": currency
                    }
                });

                console.log("Quote form opened successfully");
                ZOHO.embeddedApp.close(); // close the widget

            } catch (err) {
                console.error("Error opening Quote form:", err);
                msgEl.textContent = "Error opening Quote form: " + (err.message || JSON.stringify(err));
                confirmBtn.disabled = false;
                confirmBtn.textContent = "Confirm";
            }
        });
    }).catch(err => {
        console.error("Embedded SDK init failed:", err);
        document.getElementById('message').textContent = "Failed to load Zoho SDK.";
    });
};
