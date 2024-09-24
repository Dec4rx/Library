// App.tsx
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import imagePath from "./assets/logo.jpg";
import Home from "./components/Home";
import Layout from "./components/Layout";

function App() {
    const items = [
      { name: "Home", path: "/", icon: "fas fa-home" },
    ];
  
    return (
      <Router>
        <NavBar brandName="Library" imageSrcPath={imagePath} navItems={items} />
        <Routes>
            <Route path="/" element={<Layout/> }>
                <Route index element={<Home />} />
            </Route>
        </Routes>
      </Router>
    );
  }

export default App;