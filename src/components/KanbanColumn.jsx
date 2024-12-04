import React from 'react';
import KanbanCard from './KanbanCard';
import '../styles/column.css';

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'todo':
      return <img src="./svgs/To-do.svg" alt="Todo" className="status-icon" />;
    case 'in progress':
      return <img src="./svgs/in-progress.svg" alt="In Progress" className="status-icon" />;
    case 'done':
      return <img src="./svgs/Done.svg" alt="Done" className="status-icon" />;
    case 'cancelled':
      return <img src="./svgs/Cancelled.svg" alt="Cancelled" className="status-icon" />;
    case 'backlog':
      return <img src="./svgs/Backlog.svg" alt="Backlog" className="status-icon" />;
    default:
      return null;
  }
};

const getPriorityIcon = (title) => {
  switch (title.toLowerCase()) {
    case 'no priority':
      return <img src="./svgs/No-priority.svg" alt="No Priority" className="priority-icon" />;
    case 'urgent':
      return <img src="./svgs/SVG - Urgent Priority colour.svg" alt="Urgent" className="priority-icon" />;
    case 'high':
      return <img src="./svgs/Img - High Priority.svg" alt="High" className="priority-icon" />;
    case 'medium':
      return <img src="./svgs/Img - Medium Priority.svg" alt="Medium" className="priority-icon" />;
    case 'low':
      return <img src="./svgs/Img - Low Priority.svg" alt="Low" className="priority-icon" />;
    default:
      return getStatusIcon(title);
  }
};

const getUserAvatar = (title, users, grouping) => {
  if (grouping === 'user') {
    const user = users.find((u) => u.name.toLowerCase() === title.toLowerCase());
    if (user) {
      return (
        <div className="user-initials">
          {user.name.charAt(0)}
        </div>
      );
    }
  }
  return null;
};

const KanbanColumn = ({ title, tickets, users, grouping }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="header-content">
          {grouping === 'user' ? getUserAvatar(title, users, grouping) : getPriorityIcon(title)}
          <h2>{title}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <button className="menu-button">
          <img src="./svgs/add.svg" alt="Add" className="menu-icon add-icon" />
          <img src="./svgs/3 dot menu.svg" alt="Menu" className="menu-icon three-dot-icon" />
        </button>
      </div>
      <div className="cards">
        {tickets.length === 0 ? (
          <p className="no-tickets">No tickets available</p>
        ) : (
          tickets.map((ticket) => (
            <KanbanCard
              key={ticket.id}
              ticket={ticket}
              user={users.find((u) => u.id === ticket.userId)}
              grouping={grouping}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
