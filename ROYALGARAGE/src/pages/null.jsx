<Link to="profile"> </Link>;
<div className="flex items-center  w-25  ">
  {" "}
  <LogOut
    className="text-blue-400"
    onClick={() => {
      navigate("/");
      SetIsloggedin(false);
      SetRole(null);
    }}
  />
</div>;

<div className="flex">
  <ModeToggle />
</div>;
