import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../redux';
import { deleteTransition, fetchTransitions } from '../redux/transitionSlice';
import { Transition, Status } from '../types';

interface TransitionListProps {
  transitions: Transition[];
}

const TransitionList: React.FC<TransitionListProps> = ({ transitions }) => {
   const dispatch: AppDispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.statuses.statuses);

  useEffect(() => {
    dispatch(fetchTransitions());
  }, [dispatch, statuses]);

  const handleDelete = (id: string) => {
    dispatch(deleteTransition(id)).then(() => {
      dispatch(fetchTransitions());
    });
  };

  return (
    <div>
      <h2>transitions</h2>
    <ul>
      {transitions.map(transition => {
        const fromStatus = transition.fromStatus as Status;
        const toStatus = transition.toStatus as Status;
        console.log(fromStatus, toStatus  );

        const fromStatusName = typeof fromStatus === 'string' ? fromStatus : fromStatus.name;
        const toStatusName = typeof toStatus === 'string' ? toStatus : toStatus.name;


        return (
          <li key={transition.id}>
            {`${transition.name}: ${fromStatusName} -> ${toStatusName}`}
            <button onClick={() => transition.id && handleDelete(transition.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
    </div>
  );
};

export default TransitionList;


