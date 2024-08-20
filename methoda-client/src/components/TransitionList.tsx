import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../redux';
import { deleteTransition, fetchTransitions } from '../redux/transitionSlice';
import { fetchStatuses } from '../redux/statusSlice';
import { Transition, Status } from '../types';

interface TransitionListProps {
  transitions: Transition[];
}

const TransitionList: React.FC<TransitionListProps> = ({ transitions }) => {
   const dispatch: AppDispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.statuses.statuses);

  const handleDelete = async (id: string) => {
    await dispatch(deleteTransition(id));
    dispatch(fetchStatuses());
  };

  return (
    <div>
      <h2>transitions</h2>
    <ul>
      {transitions.map(transition => {
        const fromStatus = transition.fromStatus as Status;
        const toStatus = transition.toStatus as Status;

        const fromStatusName = typeof fromStatus === 'string' ? 
          statuses.find(status => status.id === transition.fromStatus)?.name : fromStatus?.name;
        const toStatusName = typeof toStatus === 'string' ? 
        statuses.find(status => status.id === transition.toStatus)?.name : toStatus.name;

        return (
          <li key={transition._id}>
            {`${transition.name}: ${fromStatusName} -> ${toStatusName}`}
            <button onClick={() => transition._id && handleDelete(transition._id)}>Delete</button>
          </li>
        );
      })}
    </ul>
    </div>
  );
};

export default TransitionList;


