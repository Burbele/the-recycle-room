import { useRef, useState } from "react";
import PropTypes from "prop-types";
import data from "./AccordionData";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Accordion.css";

// AccordionItem component
const AccordionItem = ({ categoryImage, title, exampleyes, exampleno, isOpen, onClick }) => {
  const contentHeight = useRef();

  return (
    <>
      <div className="wrapper">
        {/* Button to toggle the accordion item */}
        <button
          className={`information-container ${isOpen ? "active" : ""}`}
          onClick={onClick}>
          <div className="title-container">
            {/* Category image */}
            <img
              className="category-image"
              src={categoryImage}
              alt={categoryImage}
            />
            {/* Accordion item title */}
            <p className={`${isOpen ? "active-title" : ""}`}>{title}</p>
          </div>
          {/* Arrow icon indicating accordion item state */}
          <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
        </button>

        {/* Content container that expands/collapses based on isOpen state */}
        <div
          ref={contentHeight}
          className="examples-container"
          style={isOpen ? { height: contentHeight.current.scrollHeight } : { height: "0px" }}>
          {/* Examples of recyclable items */}
          <p className="darkgreen">You can place items such as:</p>
          <p className="examples-content-yes">{exampleyes}</p>
          {/* Examples of non-recyclable items */}
          <p className="darkred">You cannot place items such as:</p>
          <p className="examples-content-no">{exampleno}</p>
        </div>
      </div>
    </>
  );
};

AccordionItem.propTypes = {
  categoryImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  exampleyes: PropTypes.string.isRequired,
  exampleno: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Accordion component
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to handle accordion item clicks
  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="">
      {/* Mapping over data to create individual accordion items */}
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          categoryImage={item.categoryImage}
          title={item.title}
          exampleyes={item.exampleyes}
          exampleno={item.exampleno}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
