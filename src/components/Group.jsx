
import React from 'react';
import TicketCard from './card';

function Group({ status, tickets }) {
  return (
    <div className='group'>
      <h3>{status}</h3>
      <div className="card-container">
        {tickets && tickets.map((ticket, index) => (
          <TicketCard key={index} {...ticket} />
        ))}
      </div>
    </div>
  );
}

export default Group;
