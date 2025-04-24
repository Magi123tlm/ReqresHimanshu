import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchListUser } from '../slice';
import { useEffect } from 'react';

const ListUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entireData, status, error } = useSelector(
    (state: RootState) => state.user
  );

  const url: string = 'https://reqres.in/api/users?delay=2&page=2';

  useEffect(() => {
    dispatch(fetchListUser(url));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading all Data...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading Data: {error}</div>;
  }
  //   console.log(entireData);

  return (
    <>
      {entireData && (
        <div>
          <p>Page: {entireData.page}</p>
          <p>per_Page: {entireData.per_page}</p>
          <p>total: {entireData.total}</p>
          <p>total_pages: {entireData.total_pages}</p>
          {entireData.data.map((user) => (
            <div key={user.id}>
              <p>
                <strong>{user.first_name}</strong>
              </p>
              <p>{user.email}</p>
              <img key={user.avatar} src={user.avatar} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListUsers;
