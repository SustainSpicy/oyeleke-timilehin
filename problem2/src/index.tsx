import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import AlertContextProvider from "./provider/alert"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </React.StrictMode>
)

reportWebVitals()
