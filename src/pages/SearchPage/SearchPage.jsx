import "../../pages/SearchPage/SearchPage.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import RecyclingImage from "../../assets/recycling-image.png";
import "./SearchPage.css";
import ModalPopup from "../../components/Modal/ModalPopup";

function SearchPage() {
  return (
    <>
      <div className="page">
        <Header />
        <div className="container-cover">
          <img
            className="image-style-cover"
            src={RecyclingImage}
          />
          <div className="text-block">
            <h1>How do I recycle this?</h1>
          </div>
        </div>
        <SearchBar />
        <ModalPopup />
      </div>
    </>
  );
}

export default SearchPage;
