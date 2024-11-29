import { selectStock } from "./index.js";
// let stockPriceList = [];

// Fetch stock data from the API
async function getPriceProfitValues() {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
    );
    const data = await response.json();
    const stockPriceInfo = data.stocksStatsData[0];
    return stockPriceInfo;
  } catch (err) {
    console.error("Error fetching stock data:", err);
  }
}

// Render the list of stocks
function renderStockList(stockPriceList) {
  const stockList = document.getElementById("stock-list");
  stockList.innerHTML = "";

  Object.keys(stockPriceList).forEach((company) => {
    if (company !== "_id") {
      const stock = stockPriceList[company];
      const price = stock.bookValue.toFixed(3);
      const profit = stock.profit.toFixed(2);

      const button = document.createElement("button");
      button.textContent = company;

      const stockItem = document.createElement("li");
      stockItem.innerHTML = `
        <span>$${price} 
          <span style="color: ${profit <= 0 ? "red" : "green"};">
            &nbsp;&nbsp;&nbsp;${profit}%
          </span>
        </span>`;

      button.addEventListener("click", () =>
        selectStock(company, price, profit)
      );

      stockItem.appendChild(button);
      stockList.appendChild(stockItem);
    }
  });
}

// Initialize the stock list and set up event listeners
export async function getStockList() {
  const stockPriceList = await getPriceProfitValues();
  renderStockList(stockPriceList);
}
