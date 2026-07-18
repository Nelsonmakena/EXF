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
