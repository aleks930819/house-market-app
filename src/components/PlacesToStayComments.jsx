import { useEffect, useState } from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import { selectDisplayName } from '../slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firbase.config';

const PlacesToStayComments = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const userName = useSelector(selectDisplayName);
  const { id } = useParams();

  useEffect(() => {
    const getCommentsData = async () => {
      try {
        const listingRef = doc(db, 'listings', id);
        const listingDoc = await getDoc(listingRef);

        if (listingDoc.exists()) {
          setComments(listingDoc.data().comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      getCommentsData();
    };
  }, [id]);


  

  const addCommentHandler = async (e) => {
    e.preventDefault();

    if (!userName) {
      toast.error('Please sign in to comment');
      return;
    }

    try {
      const listingRef = doc(db, 'listings', id);

      await updateDoc(listingRef, {
        comments: [
          ...comments,
          {
            comment,
            userName,
            createdAt: new Date().toISOString().slice(0, 10),
          },
        ],
      });

      toast.success('Comment added');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    setComment('');
  };

  return (
    <div className="flex justify-center items-center mb-10 ">
      <>
        <section className="bg-slate-300 py-8 lg:py-16 w-3/4 rounded-sm ">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold  text-natural-600">
                {/* Discussion ({data?.length}) */}
              </h2>
            </div>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-slate-400 rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows={6}
                  className="w-full bg-slate-400 text-gray-900 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button primary roundedSmall={true} onClick={addCommentHandler}>
                Post comment
              </Button>
            </form>
            {comments?.map((item) => (
              <article
                className="p-6 mb-6 text-base  bg-slate-400 text-black rounded-md"
                key={item?.id}
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-black  ">
                      {item?.userName}
                    </p>
                    <p className="text-sm text-black ">
                      <p>{item?.createdAt}</p>
                    </p>
                  </div>
                </footer>
                <p className="text-black ">{item?.comment}</p>
              </article>
            ))}
          </div>
        </section>
      </>
    </div>
  );
};

export default PlacesToStayComments;
