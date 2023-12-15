import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import SearchPage from "./pages/SearchPage/SearchPage";
import InformationPage from "./pages/InformationPage/InformationPage";
import QuestionAnswerPage from "./pages/QuestionAnswerPage/QuestionAnswerPage";
import FullQuestion from "./pages/FullQuestion/FullQuestion";

function App() {
  // State to manage the loading state
  const [loading, setLoading] = useState(false);

  // Simulate loading by setting loading to true and then false after a delay
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        // Render a loading spinner while the app is loading
        <div
          style={{
            textAlign: "center",
            backgroundColor: "var(--oatmeal)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}>
          <PuffLoader
            color={"rgba(92, 146, 114, 1)"}
            loading={loading}
            size={150}
          />
        </div>
      ) : (
        // Render the main content of the app when not loading
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
                path="/questions/:questionsId"
                element={<FullQuestion />}
              />
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
