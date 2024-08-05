import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from './redux';
import { fetchStatuses } from './redux/statusSlice';
import { fetchTransitions } from './redux/transitionSlice';

import StatusList from './components/StatusList';
import TransitionList from './components/TransitionList';
import AddStatus from './components/AddStatus';
//import AddTransition from './components/AddTransition';
// import ResetButton from './components/ResetButton';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.statuses.statuses);
  const transitions = useSelector((state: RootState) => state.transitions.transitions);
  console.log(transitions);
  console.log(statuses);  

  useEffect(() => {
    dispatch(fetchStatuses());
    dispatch(fetchTransitions());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Status Manager</h1>
      <StatusList statuses={statuses} />
      <AddStatus />
      <TransitionList transitions={transitions} />
      {/* <AddTransition /> */}
      {/* <ResetButton />  */}
    </div>
  );
};

export default App;

