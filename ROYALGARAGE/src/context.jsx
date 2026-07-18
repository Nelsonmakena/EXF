import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const Globalcontext = createContext(null);
function Globalstate({ children }) {
  const [Isloggedin, SetIsloggedin] = useState(null);
  const [Role, SetRole] = useState(null);
  const [authLoading, SetAuthLoading] = useState(true);
  const [clientinfo, Setclientinfo] = useState([]);

  const [cart, Setcart] = useState([]);

  //fecthing client info
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    let decoded;

    const time = Math.floor(Date.now() / 1000);

    if (token) {
      decoded = jwtDecode(token);
      SetIsloggedin(true);
      SetRole(decoded.role);
      if (time > decoded.exp) {
        SetIsloggedin(false);
        localStorage.removeItem("token");
      }
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
        clientinfo,
        Setclientinfo,

        cart,
        Setcart,
      }}
    >
      {children}
    </Globalcontext.Provider>
  );
}
export default Globalstate;
