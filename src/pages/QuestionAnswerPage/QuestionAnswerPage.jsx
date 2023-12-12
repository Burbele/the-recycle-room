import { useRef } from "react";
import Header from "../../components/Header/Header";
import QuestionForm from "../../components/QuestionForm/QuestionForm";

import "./QuestionAnswerPage.css";

function QuestionAnswerPage() {
  const questionFormRef = useRef();

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
      </div>
    </>
  );
}

export default QuestionAnswerPage;
