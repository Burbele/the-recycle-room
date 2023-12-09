import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SearchPage from "./pages/SearchPage/SearchPage";
import InformationPage from "./pages/InformationPage/InformationPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<SearchPage />}
        />
        <Route
          path="/recyclinginformation"
          element={<InformationPage />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
