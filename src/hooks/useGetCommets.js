// import { doc, getDoc } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUserID } from '../slices/authSlice';
// import { db } from '../../firbase.config';

// const useGetComments = () => {
//   const [comments, setComments] = useState([]);

//   const getData = useCallback(async () => {
//     const collectionRef = collection(db, collectionName);
//     const q = query(collectionRef, orderBy, where, limit);

//     try {
//       setLoading(true);

//       await onSnapshot(q, (querySnapshot) => {
//         const data = [];

//         querySnapshot.forEach((doc) => {
//           data.push({ id: doc.id, ...doc.data() });
//         });


//         if (lastVisible !== lastVisibleDoc) {
//           setLastVisibleDoc(lastVisible);
//         } else {
//           setLastElement(true);
//           setLoading(false);
//           return;
//         }

//         setData(data);
//         setLoading(false);
//       });
//     } catch (err) {
//       setError(err);
//       setLoading(false);
//     }
//   }, [collectionName, orderBy, where, limit, lastVisibleDoc]);


// };

// export default useGetComments;
