
import { Outlet } from 'react-router-dom';
import React from 'react';




const NavBar: React.FC= () => {

  return (
    <main className="container my-5">

      <Outlet />

    </main>
  );
};

export default NavBar;
