import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Globalcontext = createContext(null);
function Globalstate({ children }) {
  const [Isloggedin, SetIsloggedin] = useState(null);
  const [Role, SetRole] = useState(null);
  const [authLoading, SetAuthLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      SetIsloggedin(true);
      SetRole(decoded.role);
    }

    SetAuthLoading(false);
  }, []);

  return (
    <Globalcontext.Provider
      value={{
        Isloggedin,
        SetIsloggedin,
        Role,
        SetRole,
        authLoading,
        SetAuthLoading,
      }}
    >
      {children}
    </Globalcontext.Provider>
  );
}
export default Globalstate;
