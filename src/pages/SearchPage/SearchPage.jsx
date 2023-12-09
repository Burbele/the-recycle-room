import "../../pages/SearchPage/SearchPage.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";

function SearchPage() {
  return (
    <>
      <div className="page">
        <Header />
        <h1>How do I recycle this?</h1>
        <SearchBar />
      </div>
    </>
  );
}

export default SearchPage;
