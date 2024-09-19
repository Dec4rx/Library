
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="">
        <div className="container">
          <h1 className="display-4">Digital Library</h1>
        </div>
      </header>
      <main className="flex-grow-1">
        <div className="container my-5">
          <Outlet />
        </div>
      </main>
      <footer className="">
        <div className="container">
          <p className="mb-0">© 2024 Digital Library. All rights reserved. </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
