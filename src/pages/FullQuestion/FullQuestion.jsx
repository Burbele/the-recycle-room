import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./FullQuestion.css";
import { FaArrowLeft } from "react-icons/fa6";

function FullQuestion() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This will navigate one page back
  };

  return (
    <>
      <div className="page">
        <Header />
        <div
          className="header-display"
          onClick={goBack}>
          <FaArrowLeft className="arrow-back" />
          <p>return to questions</p>
        </div>
        <div>Empty</div>
      </div>
    </>
  );
}

export default FullQuestion;
