import AdminNav from "./adminnav";
import { TotalService } from "./Datacharts/Totalservices";

export default function AdminHome() {
  return (
    <>
      <main className="  ">
        <div>
          <section className=" w-full  flex flex-col  section">
            <div className="grid grid-cols-1 card md:grid-cols-3 gap-6">
              <div
                data-aos="fadeup"
                className=" bg-linear-to-br from-violet-500 to-purple-600  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-white/80 text-sm transition-colors duration-200">
                    Services in progres
                  </p>
                </div>
                <p className="text-3xl font-bold mb-2 transition-colors duration-200">
                  15
                </p>
              </div>
              <div
                data-aos="fadeup"
                className="bg-linear-to-br from-green-400 to-green-700  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-white/80 text-sm transition-colors duration-200">
                    Revenue Today
                  </p>
                </div>
                <p className="text-3xl font-bold mb-2 transition-colors duration-200">
                  50,000/=
                </p>
              </div>
              <div
                data-aos="fadeup"
                className="bg-linear-to-br from-orange-700 to-orange-500 rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-white/80 text-sm transition-colors duration-200">
                    Workers
                  </p>
                </div>
                <p className="text-3xl font-bold mb-2 transition-colors duration-200">
                  10
                </p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="card-lg">
              <TotalService />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
