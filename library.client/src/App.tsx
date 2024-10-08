
// App.tsx
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import imagePath from "./assets/logo.jpg";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import NoPage from "./components/NoPage";

function App() {
    const items = [
        { name: "Home", path: "/", icon: "fas fa-home" },
        { name: "Register", path: "/register", icon: "fas fa-user-plus" },
        { name: "Login", path: "/login", icon: "fas fa-sign-in-alt" },
    ];
  
    return (
      <Router>
        <NavBar brandName="Library" imageSrcPath={imagePath} navItems={items} />
        <Routes>
            <Route path="/" element={<Layout/> }>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoPage />} /> 
            </Route>
        </Routes>
      </Router>
    );
  }

export default App;