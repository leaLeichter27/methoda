import React, { useState } from 'react';

import { AppDispatch } from '../redux';
import { useDispatch } from 'react-redux';
import { addStatus } from '../redux/statusSlice';

const AddStatus: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isInitial, setIsInitial] = useState<boolean>(false);
  
  const dispatch: AppDispatch = useDispatch();

  const handleAddStatus = async () => {
    dispatch(addStatus({ id: '', name, isInitial }));
    setName('');
    setIsInitial(false);
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
        />
        Initial Status
      </label>
      <button onClick={handleAddStatus}>Add Status</button>
    </div>
  );
};

export default AddStatus;
