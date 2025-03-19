import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";
function App() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
    );
}

export default App;
