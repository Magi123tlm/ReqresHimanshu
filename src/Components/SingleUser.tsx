import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { fetchSingleUser } from '../slice';

const SingleUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, singleUser } = useSelector(
    (state: RootState) => state.user
  );

  const url: string = 'https://reqres.in/api/users/2';

  useEffect(() => {
    dispatch(fetchSingleUser(url));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading user data...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading user: {error}</div>;
  }

  return (
    <>
      {singleUser && (
        <div>
          <p>{singleUser.id}</p>
          <p>{singleUser.email}</p>
          <p>{singleUser.first_name}</p>
          <p>{singleUser.last_name}</p>
          <img key={singleUser.avatar} src={singleUser.avatar} />
        </div>
      )}
    </>
  );
};

export default SingleUser;
