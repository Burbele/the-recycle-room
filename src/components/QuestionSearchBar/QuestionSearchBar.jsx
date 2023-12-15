import "./QuestionSearchBar.css";
import { FaSearch } from "react-icons/fa";

function QuestionSearchBar({ searchValue, setSearchValue, placeholder }) {
  return (
    <div className="question-search">
      <FaSearch id="search-icon" />
      <input
        className="question-search-input"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
      />
    </div>
  );
}

export default QuestionSearchBar;
