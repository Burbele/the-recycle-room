import { useState, useEffect } from "react";
import "./SearchBar.css";
import ItemDetails from "./../ItemDetails/ItemDetails";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item

  useEffect(() => {
    if (value.length > 0) {
      fetch("https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app/items.json")
        .then((response) => response.json())
        .then((responseData) => {
          setResult([]);
          let searchQuery = value.toLocaleLowerCase();
          for (const key in responseData) {
            let item = responseData[key].name.toLocaleLowerCase();
            if (item.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
              setResult((prevResult) => {
                return [...prevResult, responseData[key]];
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setResult([]);
    }
  }, [value]);

  // Function to handle item selection
  const handleItemClick = (selectedItem) => {
    setSelectedItem(selectedItem);
    setValue(""); // Clear the search input
    setResult([]); // Clear the search results
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
        {result.map((item, index) => (
          <div
            className="search-result"
            key={index}
            onClick={() => handleItemClick(item)} // Handle item click
          >
            {item.name}
          </div>
        ))}
      </div>
      <ItemDetails selectedItem={selectedItem} />
    </>
  );
}

export default SearchBar;
