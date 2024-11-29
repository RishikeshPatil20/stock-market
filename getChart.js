let stockChartInstance = null; // Global variable to track the chart instance
// let stockData = [];
// let maxValue =
let maxIndex = 0;
let minIndex = 0;

let minMaxDates;
let minMaxPrices;

// fetching the stocks data like prices and timestamps
async function getStockData() {
  try {
    const res = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
    );
    const data = await res.json();
    return data["stocksData"][0];
  } catch (error) {
    console.log(error);
  }
}

// rendering the chart data
function renderChartData(stockData, companyName, range) {
  const data = stockData[companyName][range];
  if (!data) {
    alert("Data is not valid");
    return;
  }
  const timeStamps = data["timeStamp"];
  const prices = data["value"];

  if (maxIndex != 0 && minIndex != 0) {
    maxIndex = 0;
    minIndex = 0;
  }
  // Iterate over the timeStamps or prices to perform some required operations
  for (let i = 0; i < timeStamps.length; i++) {
    timeStamps[i] = new Date(timeStamps[i] * 1000).toLocaleDateString();

    if (prices[i] > prices[maxIndex]) {
      maxIndex = i;
    }
    if (prices[i] < prices[minIndex]) {
      minIndex = i;
    }
    prices[i] = prices[i].toFixed(2);
  }
  minMaxDates = [timeStamps[minIndex], timeStamps[maxIndex]];
  minMaxPrices = [prices[minIndex], prices[maxIndex]];
  // getLowHighPrices(companyName, minMaxDates, minMaxPrices);
  // console.log("Iterate");
  showChart(companyName, timeStamps, prices);
}

// fetching the low and high prices of the given stock
export function getLowHighPrices(company) {
  showChart(company, minMaxDates, minMaxPrices);
}

// Display the chart according to the data given
function showChart(company, timeStamps, prices) {
  // Check if there is an existing chart instance
  if (stockChartInstance) {
    stockChartInstance.destroy(); // Destroy the existing chart instance
  }
  const ctx = document.getElementById("stockChart").getContext("2d");
  stockChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeStamps,
      datasets: [
        {
          label: `${company}`,
          data: prices,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "category",
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Price",
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${company} : $ ${context.parsed.y}`;
            },
          },
        },
      },
    },
  });
}

// Initaizing the get chart function
export async function getChart(company, range) {
  const stockData = await getStockData();
  console.log("company", company, "Range", range);
  renderChartData(stockData, company, range);
}
