import React, { useState } from 'react';
import { FaAngleDown, FaListUl } from "react-icons/fa";
const SortingOptions = ({ onOptionChange }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  const handleGroupingChange = (value) => {
    setGrouping(value);
    onOptionChange('grouping', value);
  };

  const handleOrderingChange = (value) => {
    setOrdering(value);
    onOptionChange('ordering', value);
  };

  return (
    <div className="dropdown">
      <button>
        <div className="dropdown-btn" onClick={toggleMenu}>
        <FaListUl/>  Display <FaAngleDown/>
        </div>
      </button>
      <div className='menu'>
        {displayMenu && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              Grouping
              <select value={grouping} onChange={(e) => handleGroupingChange(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              Ordering
              <select value={ordering} onChange={(e) => handleOrderingChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingOptions;
