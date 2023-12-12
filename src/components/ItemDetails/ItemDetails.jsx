import PropTypes from "prop-types";
import "./ItemDetails.css";

function ItemDetails({ selectedItem }) {
  // Check if no item is selected, return null to avoid rendering anything
  if (!selectedItem) {
    return null;
  }

  // Destructure properties from the selected item
  const { name, image, categoryImage, instructions } = selectedItem;

  return (
    <>
      {/* Container for displaying item details */}
      <div className="item-details-container">
        <div className="details-padding">
          {/* Item name */}
          <h2>{name}</h2>
          {/* Item image */}
          <img
            className="image-style"
            src={image}
            alt={image}
          />

          {/* Container for category image and instructions */}
          <div className="category-instructions">
            {/* Category image */}
            <img
              className="category"
              src={categoryImage}
              alt={categoryImage}
            />
            {/* Instructions section */}
            <div className="instructions">
              <p className="instructions-bold">Instructions:</p>
              <p>{instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// PropTypes for defining the expected shape of the 'selectedItem' prop
ItemDetails.propTypes = {
  selectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    categoryImage: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
  }),
};

export default ItemDetails;
