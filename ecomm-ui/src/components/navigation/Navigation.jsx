import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about-us" Component={About} />
        <Route path="/*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return <Navigate to="/" />;
}

export default Navigation;
