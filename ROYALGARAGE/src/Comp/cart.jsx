import ClientNav from "../pages/clients/ClientNav";

export default function Cart() {
  return (
    <>
      <section>
        <div className=" w-full flex flex-col  md:mt-14 md:flex-row ">
          <div className="  flex flex-col gap-3.5 w-4xl justify-center items-center p-3.5">
            <div className=" flex  w-full h-64   rounded-2xl shadow-md md:w-3/4 ">
              <div className="   flex flex-col  items-center  w-1/3 ">
                <div className="p-3.5   h-1/2  flex items-center ">
                  <h1 className="font-medium  text-blue-400 ">service name </h1>
                </div>
                <div className="   p-3.5  h-1/2 text-shadow-xs ">
                  <h1>Wheel allignment </h1>
                </div>
              </div>
              <div className="   flex flex-col  items-center  w-1/3 ">
                <div className="p-3.5   h-1/2  flex items-center ">
                  <h1 className="font-medium  text-blue-400 ">Amount </h1>
                </div>
                <div className="   p-3.5  h-1/2 text-green-700 font-medium text-shadow-xs  ">
                  <h1> 10,000/= </h1>
                </div>
              </div>
              <div className="   flex flex-col  items-center  w-1/3 ">
                <div className="p-3.5   h-1/2  flex items-center ">
                  <h1 className="font-medium  text-blue-400 ">vehicle </h1>
                </div>
                <div className="   p-3.5  h-1/2  text-shadow-xs ">
                  <h1>KAY233Y</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full  rounded-2xl shadow-md  overflow-hidden  md:w-1/4 ">
            <div className=" text-green-700 font-medium w-full flex justify-center">
              <h1> Order Summary </h1>
            </div>
            <div className="flex flex-col p-3.5 mt-3.5">
              <p className="px-4  h-12">
                {" "}
                items <span className="font-medium"> 3</span>{" "}
              </p>
              <div className=" flex w-full justify-between px-4 h-12">
                <h1> Total billed </h1>
                <h1 className="text-green-700 font-medium text-shadow-md">
                  {" "}
                  300{" "}
                </h1>
              </div>
              <div className=" flex w-full justify-between px-4 h-12">
                <h1> VAT </h1>
                <h1 className="text-red-700 font-medium"> 16% </h1>
              </div>
              <div className=" flex w-full justify-between  h-px border-b-2 border-orange-700  mb-2.5 "></div>

              <div className=" flex w-full justify-between px-4 h-12">
                <h1> Total </h1>
                <h1 className="text-green-700 font-medium text-shadow-md">
                  {" "}
                  500{" "}
                </h1>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-8 w-1/2 h-11 rounded-md text-white bg-orange-700 hover:opacity-90 transition-opacity"
                >
                  checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
