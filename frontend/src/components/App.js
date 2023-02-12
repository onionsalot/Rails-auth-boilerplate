import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminRoutes from "../routes/AdminRoutes"
import UserRoutes from "../routes/UserRoutes"
import DefaultToaster from '../lib/toaster'
import { useAuth } from "../hooks/use-auth"

function App() {
  const { getCurrentUserQuery } = useAuth()

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="*"
            element={<UserRoutes />}
          />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
      <DefaultToaster/>
    </>
  )
}

export default App
