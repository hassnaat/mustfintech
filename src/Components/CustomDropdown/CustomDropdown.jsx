import React, { useEffect, useState } from "react";
import "./CustomDropdown.css";
import DropIcon from "../../assets/icons/drop-icon.svg";

const CustomDropdown = ({
  options,
  selectedOption,
  setSelectedOption,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    if (typeof setSelectedOption === "function") {
      setSelectedOption(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="custom__dropdown" style={{ width: width ?? "150px" }}>
      <div className="dropdown__header" onClick={toggleDropdown}>
        <span>{selectedOption ? selectedOption.label : "Select"}</span>
        <div>
          <img
            src={DropIcon}
            alt=""
            className={`dropdown__icon ${!isOpen ? "open" : ""}`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="dropdown__options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown__option ${
                option.disabled ? "dropdown__option_disabled" : ""
              } ${
                selectedOption.value === option.value
                  ? "dropdown__option_active"
                  : ""
              }`}
              style={{ color: option.color }}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
