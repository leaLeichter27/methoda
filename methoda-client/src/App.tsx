import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from './redux';
import { fetchStatuses } from './redux/statusSlice';
import { fetchTransitions } from './redux/transitionSlice';

import StatusList from './components/StatusList';
import TransitionList from './components/TransitionList';
import AddStatus from './components/AddStatus';
import AddTransition from './components/AddTransition';
import ResetButton from './components/ResetButton';

import './App.css';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.statuses.statuses);
  const transitions = useSelector((state: RootState) => state.transitions.transitions);
 
  useEffect(() => {
    dispatch(fetchStatuses());
    dispatch(fetchTransitions());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Status Manager</h1>
      <div className="App-content">
        <div className="App-statuses">
          <StatusList statuses={statuses} />
          <AddStatus />
        </div>
        <div className="App-transitions">
          <TransitionList transitions={transitions} />
          <AddTransition />
        </div>
      </div>
      <ResetButton /> 
    </div>
  );
};

export default App;

