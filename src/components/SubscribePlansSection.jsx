import { useEffect, useState } from 'react';
import Button from './Button';
import Row from './Row';
import { db } from '../../firbase.config';
import { collection, collectionGroup, deleteDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUserID, selectEmail } from '../slices/authSlice';
import { doc, getDoc, addDoc } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { REACT_STRIPE_PUBLISHABLE_KEY } from '../../config';
import { useNavigate } from 'react-router-dom';

const SubscribePlansSection = () => {
  const [products, setProducts] = useState([]);
  const userID = useSelector(selectUserID);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const products = {};

      const query = collection(db, 'products');
      const querySnapshot = await getDocs(query);

      querySnapshot.forEach(async (doc) => {
        products[doc.id] = doc.data();
        const query = collectionGroup(db, 'prices');
        const priceSnap = await getDocs(query);

        priceSnap.forEach((price) => {
          if (price.data().product === doc.id) {
            products[doc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          }
        });

        const array = Object.entries(products);
        setProducts(array);
      });
    };

    getData();
  }, []);

  const subscribeHandler = async (priceId) => {
    if (!userID) {
      toast.error('Please login to subscribe');
      return navigate('/sign-in');
    }

    const docRef = doc(db, 'customers', userID);
    const colRef = collection(docRef, 'checkout_sessions');
    addDoc(colRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    const ref = collection(db, `customers/${userID}/checkout_sessions`);
    const snapshot = await getDocs(ref);

    snapshot.forEach(async (doc) => {
      const { sessionId } = doc.data();

      const stripe = await loadStripe(REACT_STRIPE_PUBLISHABLE_KEY);
      stripe.redirectToCheckout({ sessionId });
    });
  };
  return (
    <Row
      grid3
      className="mt-[100px] mb-[100px]  w-3/4 items-center place-items-center mx-auto gap-10"
    >
      {products?.map(([productId, productData], i) => (
        <div key={productId}>
          <div
            className={
              i === 1
                ? 'max-w-sm bg-slate-400 border border-gray-200 rounded-lg shadow-lg transform scale-[1.1] z-10'
                : 'max-w-sm bg-slate-200 border border-gray-200 rounded-lg shadow-lg'
            }
          >
            <div className="p-5">
              <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
                {productData?.name}
              </h5>
              <p className="mb-3 font-normal text-gray-900">
                {productData?.description}
              </p>
              <p className="pb-3">
               
              </p>
              <Button
                primary
                className="border-none"
                onClick={() => subscribeHandler(productData?.prices?.priceId)}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Row>
  );
};

export default SubscribePlansSection;
