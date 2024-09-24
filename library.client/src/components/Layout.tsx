
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <main className="container my-5">

      <Outlet />

    </main>
  );
};

export default Layout;
