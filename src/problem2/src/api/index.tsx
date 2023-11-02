import {} from "../constants/types";

const API_URL = "https://api.coingecko.com/api/v3";

// Function to fetch allTokens
export async function fetchCurrenciesList() {
  try {
    const response = await fetch(API_URL + "/coins/list");
    const data = await response.json();

    if (response.ok) {
      return await data;
    } else {
      throw new Error("Failed to fetch currencies list");
    }
  } catch (error: any) {
    console.error("Error fetching currencies list:", error.message);
    throw error;
  }
}

export async function convertCurrency(
  fromToken: string,
  toToken: string,
  amount: number
) {
  const URL = `${API_URL}/simple/price?ids=${fromToken},${toToken}&vs_currencies=usd`;
  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (response.ok) {
      const exchangeRate = data[fromToken]["usd"];

      if (exchangeRate) {
        const convertedAmount = amount * exchangeRate;

        return convertedAmount.toFixed(2); // Limit to 2 decimal places
      } else {
        throw new Error("Invalid currency codes provided");
      }
    } else {
      throw new Error(`Failed to fetch exchange rates: ${data.error.info}`);
    }
  } catch (error: any) {
    console.error("Error fetching exchange rates:", error.message);
    throw error;
  }
}

const API_URL2 = "https://interview.switcheo.com/prices.json";

// Function to fetch allTokens
export async function fetchCurrenciesList2() {
  try {
    const response = await fetch(API_URL2);
    const data = await response.json();

    if (response.ok) {
      return await data;
    } else {
      throw new Error("Failed to fetch currencies list");
    }
  } catch (error: any) {
    console.error("Error fetching currencies list:", error.message);
    throw error;
  }
}
