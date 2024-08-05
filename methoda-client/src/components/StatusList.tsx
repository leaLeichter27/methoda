import React from 'react';

import { Status } from '../types';

interface StatusListProps {
  statuses: Status[];
}

const StatusList: React.FC<StatusListProps> = ({ statuses }) => {
  return (
    <div>
      <h2>Statuses</h2>
      <ul>
        {statuses.map(status => (
          <li key={status.id}>
            {status.name} {status.isInitial && '(Initial)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusList;
