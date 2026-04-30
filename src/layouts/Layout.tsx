import { Outlet, Link, useLocation } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";
import "../styles/reset.css";
import "../styles/main.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="container">
      <header className="main-header">
        {location.pathname === "/" && (
          <>
            <link
              rel="preload"
              as="image"
              href={getAssetPath("andy-profile-scarf.webp")}
              imageSrcSet={`${getAssetPath(
                "andy-profile-scarf.webp"
              )} 800w, ${getAssetPath("andy-profile-scarf@2x.webp")} 1600w`}
              imageSizes="(max-width: 800px) 100vw, 800px"
              type="image/webp"
            />
            <meta name="priority-hints" content="highest" />
          </>
        )}
        <div className="header-left">
          <h1 className="site-title">
            <Link
              to="/"
              aria-label="Link to home"
              viewTransition
            >
              <svg className="logo">
                <use
                  xlinkHref={
                    getAssetPath("assets/svg-defs.svg") + "?v=2#svg-logo"
                  }
                />
              </svg>
            </Link>
          </h1>
          {location.pathname !== "/" && (
            <img
              src={getAssetPath("andy-profile-scarf.webp")}
              srcSet={`${getAssetPath(
                "andy-profile-scarf.webp"
              )} 800w, ${getAssetPath("andy-profile-scarf@2x.webp")} 1600w`}
              sizes="32px"
              alt="Andy Hoffman"
              width="32"
              height="32"
              className="header-avatar"
              style={{
                objectFit: "cover",
                borderRadius: "4px",
                width: "2rem",
                height: "2rem",
                display: "block",
              }}
            />
          )}
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link
                to="/"
                className={isActive("/") ? "active" : ""}
                viewTransition
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/work"
                className={isActive("/work") ? "active" : ""}
                viewTransition
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className={isActive("/skills") ? "active" : ""}
                viewTransition
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={isActive("/blog") ? "active" : ""}
                viewTransition
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive("/contact") ? "active" : ""}
                viewTransition
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
