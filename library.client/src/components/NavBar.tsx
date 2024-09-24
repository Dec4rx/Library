import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: { name: string; path: string; icon: string }[]; // Actualiza el tipo
}

function NavBar({ brandName, imageSrcPath, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={imageSrcPath}
            width="60"
            height="60"
            className="d-inline-block align-center"
            alt=""
          />
          <span className="fw-bolder fs-4">{brandName}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((item, index) => (
              <li key={item.name} className="nav-item">
                <Link
                  className={
                    selectedIndex === index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  to={item.path}
                  onClick={() => setSelectedIndex(index)}
                >
                  <i className={item.icon}></i> {item.name}{" "}
                  {/* Agregar ícono */}
                </Link>
              </li>
            ))}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            UserName &nbsp;&nbsp;
            <img
              className="img-thumbnail rounded-circle"
              width={50}
              height={50}
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
