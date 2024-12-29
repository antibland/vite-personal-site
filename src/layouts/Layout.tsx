import { Outlet, Link, useLocation } from "react-router-dom";
import "../styles/reset.css";
import "../styles/main.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="site-title">
          <Link to="/">
            <svg className="logo">
              <use xlinkHref="/assets/svg-defs.svg?v=2#svg-logo" />
            </svg>
          </Link>
        </h1>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/" className={isActive("/") ? "active" : ""}>
                About
              </Link>
            </li>
            <li>
              <Link to="/work" className={isActive("/work") ? "active" : ""}>
                Work
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className={isActive("/skills") ? "active" : ""}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link to="/blog" className={isActive("/blog") ? "active" : ""}>
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive("/contact") ? "active" : ""}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Andy Hoffman. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
