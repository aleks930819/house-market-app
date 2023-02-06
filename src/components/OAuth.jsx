import { FcGoogle } from 'react-icons/fc';
import { AiFillLinkedin } from 'react-icons/ai';
import { BsTwitter } from 'react-icons/bs';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firbase.config';

const OAuth = () => {
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
    <div className="flex gap-1">
      <FcGoogle
        className=" cursor-pointer text-base"
        onClick={() => onGoogleSignIn()}
      />
      <AiFillLinkedin className=" cursor-pointer text-base text-blue-600" />
      <BsTwitter className=" cursor-pointer text-base text-blue-700" />
    </div>
  );
};

export default OAuth;
