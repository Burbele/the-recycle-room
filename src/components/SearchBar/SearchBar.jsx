import { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import ItemDetails from "./../ItemDetails/ItemDetails";
import { FaSearch } from "react-icons/fa";
import ModalPopup from "../../components/Modal/ModalPopup";

function SearchBar() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const modalPopupRef = useRef();

  useEffect(() => {
    // Fetch items data from Firebase when the search value changes
    if (value.length > 0) {
      fetch("https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app/items.json")
        .then((response) => response.json())
        .then((responseData) => {
          let searchQuery = value.toLocaleLowerCase();
          const newResult = [];

          // Filter items based on the search query
          for (const key in responseData) {
            let item = responseData[key].name.toLocaleLowerCase();
            if (item.includes(searchQuery)) {
              newResult.push(responseData[key]);
            }
          }

          setResult(newResult);
          setShowMessage(newResult.length === 0); // Show the message only if there are no results
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setResult([]);
      setShowMessage(false);
    }
  }, [value]);

  const handleItemClick = (selectedItem) => {
    // Handle click on a search result item
    setSelectedItem(selectedItem);
    setValue("");
    setResult([]);
    setShowMessage(false);
  };

  const handleHelpClick = () => {
    // Open the help modal when the user clicks on the message
    modalPopupRef.current.openPopup();
  };

  return (
    <>
      {/* Search bar container */}
      <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          {/* Input for searching items */}
          <input
            placeholder="Type to search an item..."
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
        </div>
      </div>
      {/* Results list */}
      <div className="results-list">
        {showMessage && (
          // Display message when no results are found
          <div
            className="no-results-message"
            onClick={handleHelpClick}>
            Cannot find an item? Click here!
          </div>
        )}
        {/* Display search results */}
        {result.map((item, index) => (
          <div
            className="search-result"
            key={index}
            onClick={() => handleItemClick(item)}>
            {item.name}
          </div>
        ))}
      </div>
      {/* Display detailed information about the selected item */}
      <ItemDetails selectedItem={selectedItem} />
      {/* Modal for providing help */}
      <ModalPopup ref={modalPopupRef} />
    </>
  );
}

export default SearchBar;
