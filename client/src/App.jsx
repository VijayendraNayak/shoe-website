import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Privateroute from "./components/Privateroute";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<Privateroute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/createlisting' element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
