import { useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionSearchBar from "../../components/QuestionSearchBar/QuestionSearchBar";

import "./QuestionAnswerPage.css";

function QuestionAnswerPage() {
  // Ref for accessing methods in the QuestionForm component
  const questionFormRef = useRef();

  // State for managing the search functionality
  const [searchValue, setSearchValue] = useState("");
  const [visibleQuestions, setVisibleQuestions] = useState(5);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  // Open the QuestionForm popup when "Ask a question" button is clicked
  const handleAskQuestion = () => {
    questionFormRef.current.openPopup();
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
  };

  // Load more questions when the "Load more" button is clicked
  const handleLoadMore = () => {
    // Increase the number of visible questions by 5, but not more than the total number of questions
    const newVisibleQuestions = Math.min(visibleQuestions + 5, totalQuestions);
    setVisibleQuestions(newVisibleQuestions);
  };

  // Handle search input changes
  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());
    setIsSearching(value !== "");
  };

  // Set up placeholder totalQuestions when the component mounts
  useEffect(() => {
    const placeholderTotalQuestions = 10;
    setTotalQuestions(placeholderTotalQuestions);
  }, []);

  return (
    <>
      <div className="page">
        {/* Header component */}
        <Header />

        <h1>Ask your question</h1>
        <p>We will provide you with more specific information about recycling.</p>

        {/* Container for "Ask a question" button and search bar */}
        <div className="add-search-container">
          <button
            className="ask"
            onClick={handleAskQuestion}>
            Ask a question
          </button>
          {/* Search bar component */}
          <QuestionSearchBar
            placeholder="Search questions"
            searchValue={searchValue}
            setSearchValue={handleSearch}
          />
        </div>

        {/* QuestionForm component */}
        <QuestionForm
          ref={questionFormRef}
          onSubmit={handleFormSubmit}
        />

        {/* QuestionCard component */}
        {/* Pass visibleQuestions and searchValue to QuestionCard */}
        <QuestionCard
          searchValue={searchValue}
          visibleQuestions={visibleQuestions}
        />

        {/* Load more button */}
        {totalQuestions > visibleQuestions && !isSearching && (
          <div className="load-more-container">
            <button
              className="load-more"
              onClick={handleLoadMore}
              // Disable the button when there are no more questions to load
              disabled={totalQuestions <= visibleQuestions}>
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default QuestionAnswerPage;
