import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminNav({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);

  // Contains both the parent button and its submenu
  const navRef = useRef(null);

  const path = location.pathname;

  /*
   * Close the menu when the user clicks outside
   * the entire navigation area.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Close menu when user presses Escape.
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleMenuClick = (item) => {
    // No submenu → navigate immediately
    if (!item.subMenu?.length) {
      navigate(item.path);
      return;
    }

    // Has submenu → toggle it
    setOpenMenu((current) => (current === item.name ? null : item.name));
  };

  const handleSubMenuClick = (subItem) => {
    setOpenMenu(null);
    navigate(subItem.path);
  };

  return (
    <nav
      ref={navRef}
      className="flex flex-col h-screen justify-between cursor-pointer bg-secondary"
    >
      <div className="h-3/4 section flex flex-col gap-normal">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const hasSubMenu = item.subMenu?.length > 0;

          const isOpen = openMenu === item.name;

          /*
           * Determine whether one of the children
           * belongs to the current route.
           */
          const isChildActive = item.subMenu?.some(
            (subItem) => path === subItem.path,
          );

          const isActive = path === item.path || isChildActive;

          return (
            <div key={item.name} className="relative">
              {/* Main menu button */}
              <button
                type="button"
                onClick={() => handleMenuClick(item)}
                className={`
                  w-full h-15
                  flex items-center gap-7
                  px-4
                  transition-colors
                  ${
                    isActive
                      ? "bg-card rounded-l-2xl tracking-widest"
                      : "font-bold bg-none text-header"
                  }
                `}
              >
                <Icon />

                <span>{item.name}</span>
              </button>

              {/* Custom submenu */}
              {hasSubMenu && isOpen && (
                <div
                  className="
                    absolute
                    left-full
                    top-0
                    ml-2
                    w-56
                    p-2
                    rounded-xl
                    bg-card
                    shadow-lg
                    border
                    z-50
                  "
                >
                  {item.subMenu.map((subItem) => {
                    const SubIcon = subItem.icon;

                    const subActive = path === subItem.path;

                    return (
                      <button
                        type="button"
                        key={subItem.path}
                        onClick={() => handleSubMenuClick(subItem)}
                        className={`
                          w-full
                          h-12
                          flex
                          items-center
                          gap-4
                          px-4
                          rounded-lg
                          transition-colors
                          ${
                            subActive
                              ? "bg-secondary tracking-wider"
                              : "hover:bg-secondary"
                          }
                        `}
                      >
                        <SubIcon />

                        <span>{subItem.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
