// index.js - widget logic
ZOHO.embeddedApp.init();

const currencyEl = document.getElementById('currency');
const confirmBtn = document.getElementById('confirmBtn');
const subjectEl = document.getElementById('subject');
const msgEl = document.getElementById('message');

confirmBtn.addEventListener('click', async function() {
  msgEl.textContent = "";
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Creating...";

  const currency = currencyEl.value;
  const subject = subjectEl.value || "Draft - Currency confirmed";

  try {
    // Pre-fill fields for new Quote
    const prefillData = {
      "Subject": subject,
      "Currency": currency
      // Add any other default fields if needed
    };

    // Open the new Quote creation form prefilled
    await ZOHO.CRM.UI.Record.create({
      Entity: "Quotes",
      prefill: prefillData
    });

    // Close the widget after opening the form
    ZOHO.embeddedApp.close();

  } catch (err) {
    console.error(err);
    msgEl.textContent = "Error opening Quote form: " + (err.message || JSON.stringify(err));
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm & Create Quote";
  }
});
