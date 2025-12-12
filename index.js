// index.js - simple widget logic
ZOHO.embeddedApp.init().then(() => {
    const currencyEl = document.getElementById('currency');
    const confirmBtn = document.getElementById('confirmBtn');
    const msgEl = document.getElementById('message');

    confirmBtn.addEventListener('click', async function() {
        msgEl.textContent = "";
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Opening...";

        const currency = currencyEl.value || "SGD"; // default to SGD if nothing selected

        try {
            // Open new Quote form prefilled with selected currency
            await ZOHO.CRM.UI.Record.create({
                Entity: "Quotes",
                prefill: {
                    "Currency": currency
                }
            });

            // Close the widget automatically
            ZOHO.embeddedApp.close();

        } catch (err) {
            console.error(err);
            msgEl.textContent = "Error opening Quote form: " + (err.message || JSON.stringify(err));
            confirmBtn.disabled = false;
            confirmBtn.textContent = "Confirm";
        }
    });
});
