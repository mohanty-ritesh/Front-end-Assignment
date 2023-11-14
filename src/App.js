import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Group from './components/Group';
import SortingOptions from './components/SortingOptions';
import './App.css';

function getPriorityLabel(priority) {
  switch (priority) {
    case 0:
      return "No Priority";
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Urgent";
    default:
      return "Unknown Priority";
  }
}

function App() {
  const [selectedSubmenuOption, setSelectedSubmenuOption] = useState(null);
  const [ticketsData, setTicketsData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTicketsData(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleOptionChange = (category, option) => {
    setSelectedSubmenuOption({ category, option });
  };

  // Organize tickets by status
  const ticketsByStatus = ticketsData.reduce((acc, ticket) => {
    acc[ticket.status] = acc[ticket.status] || [];
    acc[ticket.status].push(ticket);
    return acc;
  }, {});

  // Organize tickets by priority
  const ticketsByPriority = ticketsData.reduce((acc, ticket) => {
    const priorityLabel = getPriorityLabel(ticket.priority);
    acc[priorityLabel] = acc[priorityLabel] || [];
    acc[priorityLabel].push(ticket);
    return acc;
  }, {});

  // Organize tickets by user name
  const ticketsByName = ticketsData.reduce((acc, ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const userName = user ? user.name : "Unknown User";
    acc[userName] = acc[userName] || [];
    acc[userName].push(ticket);
    return acc;
  }, {});

  let renderedGroups;

  switch (selectedSubmenuOption?.option) {
    case "status":
      renderedGroups = Object.entries(ticketsByStatus).map(([status, tickets]) => (
        <Group key={status} status={status} tickets={tickets} />
      ));
      break;
    case "priority":
      renderedGroups = Object.entries(ticketsByPriority).map(([status, tickets]) => (
        <Group key={status} status={status} tickets={tickets} />
      ));
      break;
    case "user":
      renderedGroups = Object.entries(ticketsByName).map(([status, tickets]) => (
        <Group key={status} status={status} tickets={tickets} />
      ));
      break;
    default:
      renderedGroups = Object.entries(ticketsByStatus).map(([status, tickets]) => (
        <Group key={status} status={status} tickets={tickets} />
      ));
  }
 return (
    <div>
      <div className='option'>
        <SortingOptions onOptionChange={handleOptionChange} />
      </div>
      <div className="container">
        {renderedGroups}
      </div>
    </div>
  );
}

export default App;