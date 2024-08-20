import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux';
import { addTransition } from '../redux/transitionSlice';

import { Status } from '../types';
import { fetchStatuses } from '../redux/statusSlice';

const AddTransition: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.statuses.statuses);
  const [name, setName] = useState('');
  const [fromStatusId, setFromStatusId] = useState<string>('');
  const [toStatusId, setToStatusId] = useState<string>('');

  
  const handleAddTransition = async () => {

    const fromStatus = statuses.find(status => status.name === fromStatusId);
    const toStatus = statuses.find(status => status.name === toStatusId);

    if (fromStatus && toStatus) {
      try {
      await dispatch(addTransition({ name, fromStatus: fromStatus._id || fromStatus.id, toStatus: toStatus._id || toStatus.id }));
      setName('');
      setFromStatusId('');
      setToStatusId('');
      dispatch(fetchStatuses());
    } catch (error) {
      console.error('Error adding transition:', error);
    }
    } else {
      console.error('Invalid status IDs');
    }
  };

  return (
    <div>
      <h2>Add Transition</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Transition Name"
      />
      <select value={fromStatusId} onChange={(e) => setFromStatusId(e.target.value)}>
        <option value="">From Status</option>
        {statuses.map(status => (
          <option key={status._id} value={status._id}>{status.name}</option>
        ))}
      </select>

      <select value={toStatusId} onChange={(e) => setToStatusId(e.target.value)}>
        <option value="">To Status</option>
        {statuses.map(status => (
          <option key={status._id} value={status._id}>{status.name}</option>
        ))}
      </select>
      <button onClick={handleAddTransition}>Add Transition</button>
    </div>
  );
};

export default AddTransition;