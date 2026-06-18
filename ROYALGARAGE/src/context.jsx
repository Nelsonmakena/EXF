import { createContext, useState } from "react";

export const Globalcontext = createContext(null);
function Globalstate({ children }) {
  const [Isloggedin, SetIsloggedin] = useState(false);
  const [Role, SetRole] = useState(null);
  return (
    <Globalcontext.Provider
      value={{ Isloggedin, SetIsloggedin, Role, SetRole }}
    >
      {children}
    </Globalcontext.Provider>
  );
}
export default Globalstate;
