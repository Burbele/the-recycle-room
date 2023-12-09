import PropTypes from "prop-types";
import "./ItemDetails.css";

function ItemDetails({ selectedItem }) {
  if (!selectedItem) {
    return null; // Don't render anything if no item is selected
  }

  const { name, image, categoryImage, instructions } = selectedItem;

  return (
    <>
      <div className="item-details-container">
        <div className="details-padding">
          <h2>{name}</h2>
          <img
            className="image-style"
            src={image}
            alt={image}
          />

          <div className="category-instructions">
            <img
              className="category"
              src={categoryImage}
              alt={categoryImage}
            />
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

ItemDetails.propTypes = {
  selectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    categoryImage: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
  }),
};

export default ItemDetails;
