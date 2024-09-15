import {
    BrowserRouter as Router,
    Routes,
    Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/> }>
                    <Route index element={<Home />} />
                    {/*<Route path="*" element={<NoPage />} /> //TODO Implement */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;