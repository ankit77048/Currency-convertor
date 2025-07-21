const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

const CURRENCIES = ["USD", "EUR", "INR", "JPY", "GBP", "AUD", "CAD", "CHF"];

// Populate dropdowns
CURRENCIES.forEach(curr => {
  const opt1 = new Option(curr, curr);
  const opt2 = new Option(curr, curr);
  fromCurrency.add(opt1);
  toCurrency.add(opt2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convert() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    result.innerText = "Same currency selected.";
    return;
  }

  const api = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
  
  try {
    const response = await fetch(api);
    const data = await response.json();
    result.innerText = `${amount} ${from} = ${data.rates[to].toFixed(2)} ${to}`;
  } catch (err) {
    result.innerText = "❌ Conversion failed.";
  }
}
