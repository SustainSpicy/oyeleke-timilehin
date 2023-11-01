import {} from "../constants/types";

const API_URL = "https://api.coingecko.com/api/v3/simple";

// Function to fetch allTokens
export async function fetchCurrenciesList() {
  try {
    const response = await fetch(API_URL + "/supported_vs_currencies");
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
  const URL = `${API_URL}/price?ids=${fromToken}&vs_currencies=${toToken}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (response.ok) {
      const exchangeRate = data[fromToken][toToken];
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

export function mapImageToToken(tokensList: any) {
  // Create a mapping object for toekn symbols to image filenames
  const currencyImageMap: any = {};
  tokensList.forEach((token: any) => {
    const imageName = `/tokens/${token}.svg`; // Assuming token symbols are unique
    currencyImageMap[token] = imageName;
  });
  return currencyImageMap;
}
