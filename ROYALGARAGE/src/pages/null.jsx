{
  smallmenu == true ? (
    <div className="w-full h-screen  fixed top-0  bg-black/50 backdrop-blur-2xl z-50 navbartext ">
      <div className="  flex  flex-col  w-[50%] h-screen fixed right-0 z-10   gap-14 p-3.5   top-0">
        <div className="flex justify-end  h-16">
          <button onClick={() => Setsmallmenu(false)} className="flex ">
            <Menu className="h-14 w-10 text-shadow-2xs" />
          </button>
        </div>

        <div className=" w-full  h-full ">
          <ul
            onClick={() => Setsmallmenu(false)}
            className="flex flex-col  h-3/4 items-center     "
          >
            {commonnavlinks.map((single) => {
              return (
                <li className=" text-2xl card-lg    ">
                  <Link to={single.Path}> {single.name} </Link>
                </li>
              );
            })}
            <li className=" cursor-pointer text-2xl card-lg  ">
              <Link to="/login"> </Link> login{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : null;
}
