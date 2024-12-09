import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div>
      {/* NavBar will appear on all pages */}
      <NavBar />

      {/* This renders the child routes */}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
