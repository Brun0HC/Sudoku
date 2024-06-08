import React from 'react';


const Cell = ({ value, onChange, disabled }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      onChange(newValue);
    }
  };

  return (
    <input
      disabled={disabled}
      type="text" 
      value={value !== 0 ? value : ''} 
      onChange={handleChange} 
      maxLength="1"
      className="cell" 
    />
  );
};

export default Cell;
