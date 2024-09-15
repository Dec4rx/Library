
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark text-white p-3">
        <div className="container">
          <h1 className="display-4">Biblioteca Digital</h1>
        </div>
      </header>
      <main className="flex-grow-1">
        <div className="container my-5">
          <Outlet />
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0">© 2024 Digital Library. All rights reserved. </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
