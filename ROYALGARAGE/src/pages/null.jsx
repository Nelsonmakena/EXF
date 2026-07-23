const response = await axios.post(...);
if (response.data.success) {
  setShowMessage(true);
setTimeout(() => {
    setShowMessage(false);
    navigate("/client/dashboard");
  }, 2000);
}
const [showPopup, setShowPopup] = useState(false);


const openPopup = () => {
  setShowPopup(true);
setTimeout(() => {
    setShowPopup(false);
  }, 3000); // 3000ms = 3 seconds
};
Then:

<button onClick={openPopup}>Open Popup</button>
{showPopup && (
  <div className="popup">
    Product added successfully!
  </div>
)}
<div className="flex w-full max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>



 const getUserInfo = async () => {
    try {
      //user info
      const response = await axios.get(
        "http://localhost:3000/api/client/profileinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Setclientinfo(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


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



{UserAccountSmallMenu && (
        <div className="bg-card   shadow-md absolute rounded-xl  w-3xs  bottom-5 left-52 z-999  ">
          <div className="  flex  justify-between shadow-md card ">
            <div
              className="px-3.5"
              onClick={() => {
                setTheme("dark");
              }}
            >
              <Moon
                className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
              />
            </div>
            <div
              className="px-3.5"
              onClick={() => {
                setTheme("light");
              }}
            >
              <Sun
                className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
              />
            </div>
          </div>
          <div className=" flex justify-center shadow-md card text-header ">
            Account settings
          </div>
          <div
            onClick={() => {
              handleLogout();

              !UserAccountSmallMenu;
            }}
            className="  flex justify-center hadow-md card text-header"
          >
            Logout
          </div>
        </div>
      )}



<div className="  h-24  bg-card rounded-xs ">
        <div
          className=" card "
          onClick={() => SetUserAccountSmallMenu(!UserAccountSmallMenu)}
        >
          <img src="" alt="userimage" className="rounded-full w-14 h-14  " />
        </div>
      </div>