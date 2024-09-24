import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavBar from "./components/Layout";
import Home from "./components/Home";
import imagePath from "./assets/logo.jpg";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import NoPage from "./components/NoPage";

const App = () => {
    const items = [
        { name: "Home", path: "/home", icon: "fas fa-home" },
        { name: "Product", path: "/product", icon: "fas fa-box" },
        { name: "Service", path: "/service", icon: "fas fa-concierge-bell" },
    ];

    return (
        <Router>
              <NavBar brandName="Library" imageSrcPath={imagePath} navItems={items} />
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NoPage />} /> //TODO Implement
                </Route>
            </Routes>
        </Router>
    );
}

export default App;