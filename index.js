// index.js - Widget logic
window.onload = function () {
    ZOHO.embeddedApp.init().then(() => {
        console.log("Zoho SDK initialized");

        const btn = document.getElementById("confirmBtn");
        const currencyEl = document.getElementById("currency");
        const msg = document.getElementById("message");

        if (!btn || !currencyEl || !msg) {
            console.error("Required elements not found.");
            return;
        }

        btn.onclick = function () {
            const currency = currencyEl.value;
            if (!currency) {
                msg.innerText = "Please select a currency.";
                return;
            }

            msg.innerText = "";
            btn.disabled = true;
            btn.innerText = "Redirecting…";

            // Replace with your Zoho org ID
            const orgId = "695753531";

            // Build Create Quote URL with currency prefill
            let url = `https://crm.zoho.com/crm/org${orgId}/tab/Quotes/create?Currency=${currency}`;

            // Redirect the main window
            window.top.location.href = url;
        };
    }).catch(err => {
        console.error("SDK init failed:", err);
        const msg = document.getElementById("message");
        if (msg) msg.innerText = "Failed to load widget.";
    });
};


