import { Outlet, useNavigate } from 'react-router-dom';

const MainComponent = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <div>
        <button onClick={() => handleClick('/listUsers')}>List Users</button>
        <button onClick={() => handleClick('/singleUser')}>Single User</button>
        <Outlet />
      </div>
    </>
  );
};

export default MainComponent;
