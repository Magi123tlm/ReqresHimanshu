import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainComponent from './Components/MainComponent';
import ListUsers from './Components/ListUsers';
import SingleUser from './Components/SingleUser';
import CreateUser from './Components/CreateUser';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainComponent />,
      children: [
        {
          path: '/listUsers',
          element: <ListUsers />,
        },
        {
          path: '/singleUser',
          element: <SingleUser />,
        },
        {
          path: '/createUser',
          element: <CreateUser />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
