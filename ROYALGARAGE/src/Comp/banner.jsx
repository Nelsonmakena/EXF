export default function Banner() {
  return (
    <div className="w-full bg-green-700 h-20 flex justify-center  items-center gap-12 text-white p-3.5  lg:justify-between  ">
      <h1 data-aos="fade-right"> Get a 30% discount on car diansotics </h1>
      <button
        data-aos="fade-left"
        className="bg-white text-black h-10 w-25  shadow-md"
      >
        {" "}
        Get a qoute{" "}
      </button>
    </div>
  );
}
