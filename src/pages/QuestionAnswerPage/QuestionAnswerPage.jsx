import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionSearchBar from "../../components/QuestionSearchBar/QuestionSearchBar";

import "./QuestionAnswerPage.css";

function QuestionAnswerPage() {
  const questionFormRef = useRef();
  const [searchValue, setSearchValue] = useState(""); // Step 1: Add state for search value

  const handleAskQuestion = () => {
    questionFormRef.current.openPopup();
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    // You can perform any necessary actions with the form data
  };

  return (
    <>
      <div className="page">
        <Header />
        <h1>Ask your question</h1>
        <p>We will provide you with more specific information about recycling.</p>
        <button
          className="ask"
          onClick={handleAskQuestion}>
          Ask a question
        </button>

        <QuestionForm
          ref={questionFormRef}
          onSubmit={handleFormSubmit}
        />

        {/* Step 2: Pass search value and setSearchValue to QuestionSearchBar */}
        <QuestionSearchBar
          placeholder="Search questions"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {/* Step 3: Pass searchValue to QuestionCard */}
        <QuestionCard searchValue={searchValue} />
      </div>
    </>
  );
}

export default QuestionAnswerPage;
