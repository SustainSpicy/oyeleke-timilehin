import { TokenData } from "../constants/types"

export async function convertCurrency(
  fromToken: TokenData,
  toToken: TokenData,
  amount: number,
  supportedCurrencies: TokenData[]
) {
  if (fromToken && toToken && amount) {
    const token1Value = supportedCurrencies.find(
      (token) => token.currency === fromToken.currency
    )?.price
    const token2Value = supportedCurrencies.find(
      (token) => token.currency === toToken.currency
    )?.price
    if (token1Value && token2Value) {
      const convertedPrice = (amount * token2Value) / token1Value

      return parseFloat(convertedPrice.toFixed(5))
    }
  }
}

const API_URL = "https://interview.switcheo.com/prices.json"

// Function to fetch allTokens
export async function fetchCurrenciesList() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    const currenciesData: TokenData[] = data.map((token: TokenData) => ({
      currency: token.currency,
      price: token.price
    }))
    if (response.ok) {
      return currenciesData
    } else {
      throw new Error("Failed to fetch currencies list")
    }
  } catch (error: any) {
    // console.error("Error fetching currencies list:", error.message);
    throw error
  }
}

export async function tokenConversion(
  amount: string,
  fromToken: TokenData,
  toToken: TokenData,
  supportedCurrencies: TokenData[]
) {
  const result = await convertCurrency(
    fromToken,
    toToken,
    parseFloat(amount),
    supportedCurrencies
  )

  return result
}
