import { useRef, useState } from "react";
import PropTypes from "prop-types";
import data from "./AccordionData";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Accordion.css";

//  accordionitem component
const AccordionItem = ({ categoryImage, title, exampleyes, exampleno, isOpen, onClick }) => {
  const contentHeight = useRef();
  return (
    <>
      <div className="wrapper">
        <button
          className={`information-container ${isOpen ? "active" : ""}`}
          onClick={onClick}>
          <div className="title-container">
            <img
              className="category-image"
              src={categoryImage}
              alt={categoryImage}
            />
            <p className={`${isOpen ? "active-title" : ""}`}>{title}</p>
          </div>
          <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
        </button>

        <div
          ref={contentHeight}
          className="examples-container"
          style={isOpen ? { height: contentHeight.current.scrollHeight } : { height: "0px" }}>
          <p className="darkgreen">You can place items such as:</p>
          <p className="examples-content-yes">{exampleyes}</p>
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

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="">
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
