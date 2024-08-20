import React, { useState } from 'react';

import { AppDispatch, RootState } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { addStatus, fetchStatuses } from '../redux/statusSlice';

const AddStatus: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.statuses.statuses);

  const [name, setName] = useState<string>('');
  const [isInitial, setIsInitial] = useState<boolean>(false);

  const existingInitialStatus = statuses.find(status => status.isInitial);
  
  const handleAddStatus = async () => {
      if (!name.trim()) {
        alert('Status name is required.');
        return;
      }

    try {
      await dispatch(addStatus({ name, isInitial })).unwrap();
      setName('');
      setIsInitial(false);
      dispatch(fetchStatuses());
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h2>Add Status</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Status Name"
      />
      <label>
        <input
          type="checkbox"
          checked={isInitial}
          onChange={(e) => setIsInitial(e.target.checked)}
          disabled={!!existingInitialStatus}
        />
        Initial Status
      </label>
      <button onClick={handleAddStatus}>Add Status</button>
    </div>
  );
};

export default AddStatus;
