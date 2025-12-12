// index.js - widget logic
ZOHO.embeddedApp.init();

const currencyEl = document.getElementById('currency');
const confirmBtn = document.getElementById('confirmBtn');
const subjectEl = document.getElementById('subject');
const msgEl = document.getElementById('message');

confirmBtn.addEventListener('click', async function(){
  msgEl.textContent = "";
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Creating...";

  const currency = currencyEl.value;
  const subject = subjectEl.value || "Draft - Currency confirmed";

  try {
    // Insert a new Quote record with the currency set.
    // If your org has other mandatory fields, include them here.
    const payload = {
      data: [
        {
          "Subject": subject,
          "Currency": currency
        }
      ]
    };

    // Use ZOHO.CRM.API.insertRecord (v2) via widget SDK
    const resp = await ZOHO.CRM.API.insertRecord({Entity: "Quotes", APIData: payload});
    // resp.data is an array; each item has code and details.id
    if (resp && resp.data && resp.data[0] && resp.data[0].details) {
      const recordId = resp.data[0].details.id;
      // Open the edit page for the newly created Quote
      // (opens the edit page so user continues filling the quote)
      await ZOHO.CRM.UI.Record.edit({Entity: "Quotes", RecordID: recordId});
      // close the widget (if desired). Often edit() opens in parent so widget can close.
      // If widget needs to explicitly close:
      // ZOHO.embeddedApp.close();
    } else {
      throw new Error("Insert returned unexpected response: " + JSON.stringify(resp));
    }
  } catch (err) {
    console.error(err);
    msgEl.textContent = "Error creating quote: " + (err.message || JSON.stringify(err));
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm & Create Quote";
  }
});
