import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import "flowbite-react"
import "tailwindcss/tailwind.css"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { UserProvider } from "./context/useContext.jsx"
const future = {
  v7_startTransition: true,
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter future={future}>
        <Toaster />
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
