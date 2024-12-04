import React, { useEffect, useState } from 'react';
import { fetchTickets } from './utils/api';
import Header from './components/Header';
import KanbanColumn from './components/KanbanColumn';
import './styles/app.css';

const STATUS_COLUMNS = ['Done', 'Backlog', 'Todo', 'In progress', 'Canceled'];

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem('grouping') || 'status';
  });
  const [sorting, setSorting] = useState(() => {
    return localStorage.getItem('sorting') || 'priority';
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTickets();
      setTickets(
        data.tickets.map((ticket) => ({
          ...ticket,
          status: ticket.status || 'Todo', // Default to 'Todo' if status is missing
        }))
      );
      setUsers(data.users);
    };
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('sorting', sorting);
  }, [sorting]);

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
      default:
        return 'No priority';
    }
  };

  const groupTickets = () => {
    const grouped = {};
    if (grouping === 'status') {
      STATUS_COLUMNS.forEach((status) => (grouped[status] = []));
    } else if (grouping === 'priority') {
      ['No priority', 'Low', 'Medium', 'High', 'Urgent'].forEach(
        (priority) => (grouped[priority] = [])
      );
    }

    tickets.forEach((ticket) => {
      let key = '';
      switch (grouping) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          const user = users.find((u) => u.id === ticket.userId);
          key = user?.name || 'Unassigned';
          break;
        case 'priority':
          key = getPriorityLabel(ticket.priority);
          break;
        default:
          key = 'Uncategorized';
      }
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    // Sort tickets within each group
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) =>
        sorting === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)
      );
    });

    // If grouping by users, sort by user names
    if (grouping === 'user') {
      const sorted = {};
      Object.keys(grouped)
        .sort((a, b) => a.localeCompare(b))
        .forEach((key) => (sorted[key] = grouped[key]));
      return sorted;
    }

    return grouped;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="app">
      <Header
        grouping={grouping}
        sorting={sorting}
        onGroupingChange={setGrouping}
        onSortingChange={setSorting}
      />
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <KanbanColumn
            key={key}
            title={`${key}`}
            tickets={tickets}
            users={users}
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
