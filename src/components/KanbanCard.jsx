import React from 'react';
import '../styles/card.css';

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return <img src="./svgs/SVG - Urgent Priority colour.svg" alt="Urgent" className="priority-icon" />;
    case 3:
      return <img src="./svgs/Img - High Priority.svg" alt="High" className="priority-icon" />;
    case 2:
      return <img src="./svgs/Img - Medium Priority.svg" alt="Medium" className="priority-icon" />;
    case 1:
      return <img src="./svgs/Img - Low Priority.svg" alt="Low" className="priority-icon" />;
    case 0:
    default:
      return <img src="./svgs/No-priority.svg" alt="No Priority" className="priority-icon" />;
  }
};

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

const KanbanCard = ({ ticket, user, grouping }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && grouping !== 'user' && (
          <div className="user-avatar">
            {user.name.charAt(0)}
            <span
              className={`status-dot ${user.available ? 'available' : ''}`}
            />
          </div>
        )}
      </div>
      <div className="card-title">
        {grouping !== 'status' && getStatusIcon(ticket.status)}
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-tags">
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            {grouping !== 'priority' && getPriorityIcon(ticket.priority)}
            <img src="./svgs/circle.svg" alt="Circle" className="circle-icon" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KanbanCard;
