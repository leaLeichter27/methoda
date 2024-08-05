// import React, { useState } from 'react';

// import { AppDispatch } from '../redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux';
// import { addTransition } from '../redux/transitionSlice';

// import { Status } from '../types';

// const AddTransition: React.FC = () => {
//   const statuses = useSelector((state: RootState) => state.statuses.statuses);
//   const [name, setName] = useState('');
//  const [fromStatusId, setFromStatusId] = useState<string>('');
//   const [toStatusId, setToStatusId] = useState<string>('');

//   const dispatch: AppDispatch = useDispatch();
  

//   const handleAddTransition = async () => {
//     dispatch(addTransition({ name, fromStatus: fromStatusId, toStatus: toStatusId }));
//     setName('');
//     setFromStatusId('');
//     setToStatusId('');
//   };

//   return (
//     <div>
//       <h2>Add Transition</h2>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Transition Name"
//       />
//       <select value={fromStatusId} onChange={(e) => setFromStatusId(e.target.value)}>
//         <option value="">From Status</option>
//         {statuses.map(status => (
//           <option key={status.id} value={status.id}>{status.name}</option>
//         ))}
//       </select>
//       <select value={toStatusId} onChange={(e) => setToStatusId(e.target.value)}>
//         <option value="">To Status</option>
//         {statuses.map(status => (
//           <option key={status.id} value={status.id}>{status.name}</option>
//         ))}
//       </select>
//       <button onClick={handleAddTransition}>Add Transition</button>
//     </div>
//   );
// };

// export default AddTransition;
export {}