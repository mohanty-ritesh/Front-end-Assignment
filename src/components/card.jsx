import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

function TicketCard({ id, title, tag }) {
  const tagValue = tag[0];
  return (
    <div className="card">
      <div className="card-body">
        <p>{id} <FaRegUserCircle size={20} /></p>
        <h2>{title}</h2>
        <p>{tagValue}</p>
      </div>
    </div>
  );
}

export default TicketCard;
