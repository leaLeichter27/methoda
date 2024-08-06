import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetConfiguration } from '../redux/transitionSlice';
import { RootState, AppDispatch } from '../redux'; 

const ResetButton: React.FC = () => {
  const dispatch : AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.transitions.loading || state.statuses.loading);
  const error = useSelector((state: RootState) => state.transitions.error || state.statuses.error);

  const handleReset = () => {
    dispatch(resetConfiguration());
  };

  return (
    <div style={{marginTop: '50px'}}>
      <button
        onClick={handleReset}
        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', fontSize: '16px', cursor: "pointer", borderRadius: "50px" }}
        disabled={loading}
      >
        Reset Configuration
      </button>
      {loading && <p>Resetting...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default ResetButton;