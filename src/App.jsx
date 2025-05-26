import './App.css'
import {Link, Routes, Route} from "react-router-dom";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
