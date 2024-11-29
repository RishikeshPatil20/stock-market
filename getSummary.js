// fetch the summary from stock API
async function fetchStockSummary() {
  try {
    const res = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata"
    );
    const data = await res.json();
    const stockData = data["stocksProfileData"][0];
    return stockData;
  } catch (error) {
    console.log("Error", error);
  }
}
// Rendering the summary data in the details section
function renderSummaryData(data, companyName) {
  const summary = data[companyName]["summary"];
  document.getElementById("stock-summary").textContent = summary;
}

// This function fetch and render the data
export async function getSummary(company) {
  const data = await fetchStockSummary();
  renderSummaryData(data, company);
}
