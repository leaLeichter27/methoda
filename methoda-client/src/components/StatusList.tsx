import React from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../redux';
import { deleteStatus } from '../redux/statusSlice';
import { Status } from '../types';
import { fetchTransitions } from '../redux/transitionSlice';

interface StatusListProps {
  statuses: Status[];
}

const StatusList: React.FC<StatusListProps> = ({ statuses }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async (id: string) => {
    await dispatch(deleteStatus(id));
    dispatch(fetchTransitions());
  };

  return (
    <div>
      <h2>Statuses</h2>
      <ul>
        {statuses.map(status => (
          <li key={status._id}>
            {status.name} 
            {status.isInitial && ' (Initial)'}
            {status.isOrphan && ' (Orphan)'}
            {status.isFinal && ' (Final)'}
            <button onClick={() => status._id && handleDelete(status._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusList;
