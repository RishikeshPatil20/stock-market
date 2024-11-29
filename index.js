import { getChart, getLowHighPrices } from "./getChart.js";
import { getSummary } from "./getSummary.js";
import { getStockList } from "./getList.js";

let selectedCompany = "AAPL"; // Set a default company initially

// Handle stock selection and update the chart and details
export function selectStock(company, price, profit) {
  selectedCompany = company;
  console.log("Stock selected:", company);
  document.getElementById("stock-name").textContent = company;
  document.getElementById("stock-book-value").textContent = `$${price}`;
  updateProfitValue(profit);
  updateStockDetails(company, "5y");
}
// update the profit value
function updateProfitValue(profit) {
  const profitElement = document.getElementById("stock-profit");
  const profitValue = parseFloat(profit);
  profitElement.textContent = `${profitValue}%`;
  profitElement.style.color = profitValue <= 0 ? "red" : "green";
}

// Event listeners for range buttons
function setupRangeButtons() {
  document.getElementById("range-buttons").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") {
      return;
    }

    const range = e.target.id;
    if (range === "low-high") {
      console.log("LOW-HIGH range selected");
      getLowHighPrices(selectedCompany);
    } else {
      console.log("Range selected:", range);
      getChart(selectedCompany, range);
    }
  });
}

// Default stock details
function setDefaultStockDetails() {
  selectStock("AAPL", "3.953", "0.24%");
}

// Update stock details including summary and chart
function updateStockDetails(company, range) {
  getSummary(company);
  getChart(company, range);
}

// Initialize the stock list and set up event listeners
async function initializeStockApp() {
  await getStockList();
  setDefaultStockDetails();
  setupRangeButtons();
}

initializeStockApp();
