import { getDoc, doc } from 'firebase/firestore';

import { db } from '../../firbase.config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetDataById = (collectionName, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = [];
        data.push({ id: docSnap.id, ...docSnap.data() });
        setData(data);
        setLoading(false);
      } else {
        setLoading(false);
        navigate('/404');
        return null;
      }
    };

    getData();
    setLoading(false);
  }, [collectionName, id]);

  return { data, loading };
};

export default useGetDataById;
