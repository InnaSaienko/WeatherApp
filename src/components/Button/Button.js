import React from "react";

const Button = ({ onClick, isEnabled }) => {
  const addClassNameBtn = !isEnabled ? "btn-round" : "btn-round active";
  
  return (
    <button className={addClassNameBtn} onClick={onClick}>
    </button>
  );
};

export default Button;
