function QuestionSearchBar({ searchValue, setSearchValue, placeholder }) {
  return (
    <div className="question-search">
      <input
        className="question-search-input"
        type="text"
        placeholder={placeholder} // Use the placeholder prop here
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
      />
    </div>
  );
}

export default QuestionSearchBar;
