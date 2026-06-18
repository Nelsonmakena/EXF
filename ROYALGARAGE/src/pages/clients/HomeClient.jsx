import ClientNav from "./ClientNav";

export default function HomeClient() {
  return (
    <>
      <section className=" mt-24 p-3.5 w-full  ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className=" bg-linear-to-br from-violet-500 to-purple-600  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/80 text-sm transition-colors duration-200">
                Upcoming appointments
              </p>
            </div>

            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              2025-06-05
            </p>
            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              2025-06-05
            </p>
          </div>
          <div className="bg-linear-to-br from-blue-400 to-blue-600  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/80 text-sm transition-colors duration-200">
                Recent Servivce
              </p>
            </div>
            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              oil change
            </p>
          </div>
          <div className="bg-linear-to-br from-orange-700 to-orange-500 rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/80 text-sm transition-colors duration-200">
                Total vehicles
              </p>
            </div>
            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              10
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
