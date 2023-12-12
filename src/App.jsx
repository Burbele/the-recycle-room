import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SearchPage from "./pages/SearchPage/SearchPage";
import InformationPage from "./pages/InformationPage/InformationPage";
import QuestionAnswerPage from "./pages/QuestionAnswerPage/QuestionAnswerPage";

function App() {
  return (
    <>
      <Navigation />
      <main>
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
            path="/questionanswer"
            element={<QuestionAnswerPage />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
