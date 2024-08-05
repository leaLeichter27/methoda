import React from 'react';

import { Transition } from '../types';

interface TransitionListProps {
  transitions: Transition[];
}

const TransitionList: React.FC<TransitionListProps> = ({ transitions }) => {
  return (
    <div>
      <h2>Transitions</h2>
      <ul>
        {transitions.map(transition => (
          <li key={transition.id}>
            {`${transition.name}: ${transition.fromStatus.name} -> ${transition.toStatus.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransitionList;
