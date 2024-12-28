import { Outlet, useLocation } from "react-router-dom";
import "../styles/reset.css";
import "../styles/main.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="container">
      {isHomePage && (
        <header>
          <h1>no style, please!</h1>
          <p>A minimal React blog</p>
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
