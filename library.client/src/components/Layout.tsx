
import { Link, Outlet } from 'react-router-dom';
import React, { useState } from 'react';

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: { name: string; path: string; icon: string }[]; // Actualiza el tipo
}


const NavBar: React.FC<NavBarProps> = ({ brandName, imageSrcPath, navItems }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <main className="container my-5">

      <Outlet />

    </main>
  );
};

export default NavBar;
