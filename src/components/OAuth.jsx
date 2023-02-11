import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firbase.config';

import Button from '../components/Button';

const OAuth = ({ btnName }) => {
  const navigate = useNavigate();
  const onGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          fullName: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex gap-1 mr-2">
      <Button onClick={() => onGoogleSignIn()} primary type="button">
        <FcGoogle className="text-base mr-2" /> {btnName}
      </Button>
    </div>
  );
};

export default OAuth;
