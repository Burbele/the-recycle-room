import { useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionSearchBar from "../../components/QuestionSearchBar/QuestionSearchBar";

import "./QuestionAnswerPage.css";

function QuestionAnswerPage() {
  const questionFormRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [visibleQuestions, setVisibleQuestions] = useState(5);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const handleAskQuestion = () => {
    questionFormRef.current.openPopup();
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    // You can perform any necessary actions with the form data
  };

  const handleLoadMore = () => {
    // Increase the number of visible questions by 5
    setVisibleQuestions((prevVisibleQuestions) => prevVisibleQuestions + 5);
  };

  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());
    setIsSearching(value !== "");
  };

  useEffect(() => {
    // Replace this example with your actual logic to fetch the total number of questions
    // For demonstration purposes, setting a placeholder total number of questions
    const placeholderTotalQuestions = 20;
    setTotalQuestions(placeholderTotalQuestions);
  }, []);

  return (
    <>
      <div className="page">
        <Header />
        <h1>Ask your question</h1>
        <p>We will provide you with more specific information about recycling.</p>

        <div className="add-search-container">
          <button
            className="ask"
            onClick={handleAskQuestion}>
            Ask a question
          </button>
          <QuestionSearchBar
            placeholder="Search questions"
            searchValue={searchValue}
            setSearchValue={handleSearch}
          />
        </div>

        <QuestionForm
          ref={questionFormRef}
          onSubmit={handleFormSubmit}
        />

        {/* Pass visibleQuestions and searchValue to QuestionCard */}
        <QuestionCard
          searchValue={searchValue}
          visibleQuestions={visibleQuestions}
        />

        {/* Conditionally render "Load more" button based on isSearching state */}
        {totalQuestions > visibleQuestions && !isSearching && (
          <div className="load-more-container">
            <button
              className="load-more"
              onClick={handleLoadMore}>
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default QuestionAnswerPage;
