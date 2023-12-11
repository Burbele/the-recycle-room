import { useState, useEffect } from "react";
import "./SearchBar.css";
import ItemDetails from "./../ItemDetails/ItemDetails";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      fetch("https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app/items.json")
        .then((response) => response.json())
        .then((responseData) => {
          let searchQuery = value.toLocaleLowerCase();
          const newResult = [];
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
    setSelectedItem(selectedItem);
    setValue("");
    setResult([]);
    setShowMessage(false);
  };

  return (
    <>
      <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input
            placeholder="Type to search an item..."
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
        </div>
      </div>
      <div className="results-list">
        {showMessage && <div className="no-results-message">Cannot find an item? Click help!</div>}
        {result.map((item, index) => (
          <div
            className="search-result"
            key={index}
            onClick={() => handleItemClick(item)}>
            {item.name}
          </div>
        ))}
      </div>
      <ItemDetails selectedItem={selectedItem} />
    </>
  );
}

export default SearchBar;
