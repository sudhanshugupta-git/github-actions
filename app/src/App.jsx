
import "./assets/styles.scss";
import Header from "./header";
import Footer from "./footer";
import FilmPage from "./pages/FilmPage";
import StoresPage from "./pages/StoresPage";
import RentalPage from "./pages/RentalPage"
import { FilmProvider } from "./context/filmContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Header />
      <div className="main_page_holder">
        <div className="table_outer_holder">
          <FilmProvider>
            <Routes>
              <Route path="/" element={<FilmPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/rental" element={<RentalPage />} />
            </Routes>
          </FilmProvider>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
