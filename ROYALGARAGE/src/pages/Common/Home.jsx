import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Glasses,
  ToolCase,
  BrushCleaning,
  Combine,
} from "lucide-react";

import "aos/dist/aos.css";

import GeneralAutoRepairs from "../../assets/GeneralAutoRepairs.jpg";
import car1 from "../../assets/car1.png";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import img3 from "../../assets/img3.jpg";
import bg from "../../assets/engine3.jpg";
import Nav from "../../Comp/Nav";
import Banner from "../../Comp/banner";
import img1 from "../../assets/img1.jpg";
function Home() {
  const slides = [
    {
      image: bg1,
      text: "At Royal Auto Garage, we provide expert vehicle repair,diagnostics, and maintenance services to keep your car safe, efficient, and road-ready at all times.",
    },
    {
      image: bg2,
      text: "Manage your clients efficiently",
    },
    {
      image: bg3,
      text: "Track revenue in real time",
    },
    {
      image: bg4,
      text: "Boost productivity with smart tools",
    },
  ];
  const [index, setIndex] = useState(0);
  const [CoreServices, SetCoreServices] = useState([
    {
      heading: "General Auto Repairs",
      paragraph:
        "We handle a wide range of mechanical issues including engine faults, transmission problems, and system failures. Our goal is to restore your vehicle’s performance efficiently.",
    },
    {
      heading: "Engine Diagnostics & Repair",
      paragraph:
        "Using advanced diagnostic tools, we accurately detect engine problems and fix them before they become costly repairs.",
    },
    {
      heading: "Routine Vehicle Servicing",
      paragraph:
        "Regular maintenance such as oil changes, filter replacements, and inspections to ensure your car remains in top condition.",
    },
    {
      heading: "Electrical & Battery Services",
      paragraph:
        "We diagnose and repair electrical issues including wiring faults, battery problems, and lighting systems.",
    },
  ]);
  const [Starts, SetStarts] = useState([
    {
      image: "/src/assets/logo.png",
      paragraph: "500+projects",
    },
    {
      image: "/src/assets/logo.png",
      paragraph: "500 projects",
    },
    {
      image: "/src/assets/logo.png",
      paragraph: "500 + projects",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 12000); //

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className=" flex flex-col ">
        {/*pg1 */}
        <section className="  w-full  h-screen    ">
          {/* img scroll */}
          <div className="flex  w-full z-10 h-screen transition-all duration-700">
            <img
              src={slides[index].image}
              className=" w-full  object-cover  transition-all duration-700"
            />{" "}
          </div>
          <div className="w-full h-full  bg-black/50 absolute z-20 top-0   ">
            {" "}
          </div>
          {/* pg1 */}
          <div className="absolute z-30 inset-0 w-full h-screen flex  flex-col items-center justify-center">
            <div data-aos="zoom-in" className="p-3.5">
              <h1 className="text-secondary font-[Outfit] font-bold md:text-7xl text-4xl">
                Royal <span className="text-header">Auto </span>
                <span className="text-header-foreground text-shadow-xs">
                  {" "}
                  Garage{" "}
                </span>{" "}
              </h1>
            </div>
            <div data-aos="fade-up" className=" w-full p-3.5 md:w-1/2">
              <h1 className="font-semibold  text-secondary  ">
                Reliable Auto Repair & Maintenance Services in Nairobi
              </h1>
              <p className="py-2.5 transition-all duration-700 text-white text-body">
                {slides[index].text}
              </p>
            </div>
            <div
              data-aos="fade-up"
              className="flex  flex-col  w-full items-center  md:w-1/2  md:flex-row gap-10   justify-center"
            >
              <button
                onClick={() => navigate("/royalgarage/services")}
                className=" w-44 mt-3.5 h-16  p-2.5 bg-accent  rounded-md active:scale-95 transition-all"
              >
                Book services
              </button>
              <button
                onClick={() => navigate("/login")}
                className="group mt-3.5 w-44 p-2.5 h-16 bg-primary rounded-lg   cursor-pointer active:scale-95 transition duration-300 "
              >
                login
              </button>
            </div>
          </div>
          <Banner />
        </section>

        {/* pg2 */}
        <section className="section">
          <div className="w-full  px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto ">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="space-y-6 sm:space-y-8">
                  <div className="gap-large">
                    <span data-aos="fadeup" className="heading-medium">
                      About Us
                    </span>
                    <h2
                      data-aos="fadeup"
                      className="heading-medium text-primary   "
                    >
                      Our journey of transformation
                    </h2>
                    <p
                      data-aos="faderight"
                      className="mt-6 text-base leading-relaxed"
                    >
                      Our story reflects a commitment to growth and excellence.
                      Through collaboration and dedication, we've built a legacy
                      of innovation that continues to evolve and inspire
                      meaningful change.
                    </p>
                  </div>

                  <div
                    data-aos="fadeup"
                    className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8 pt-4"
                  >
                    <div className="space-y-2">
                      <h3 className="text-blue-400 text-xl sm:text-2xl font-bold ">
                        10+ Years
                      </h3>
                      <p className="text-sm  leading-relaxed">
                        Shaping the future of digital innovation
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className=" text-secondary text-xl sm:text-2xl font-bold">
                        180k+ succesfully completed jobs
                      </h3>
                      <p className="text-sm leading-relaxed">
                        Delivering excellence across industries
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className=" text-accent text-xl sm:text-2xl font-bold ">
                        35+ Awards
                      </h3>
                      <p className="text-sm leading-relaxed">
                        Recognized for outstanding achievements
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className=" text-muted text-xl sm:text-2xl font-bold ">
                        98% client Satisfaction
                      </h3>
                      <p className="text-sm  leading-relaxed">
                        Client trust built on consistent results
                      </p>
                    </div>
                  </div>

                  <div data-aos="fadeup" className="pt-4">
                    <button
                      onClick={() => {
                        navigate("/royalgarage/about");
                      }}
                      className="inline-flex items-center gap-2 text-primary transition-colors group font-medium"
                    >
                      Read More
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div
                    data-aos="zoom-in"
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={img3}
                      alt="Team collaboration"
                      className="w-full h-[500px] sm:h-[600px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" section ">
          <div
            data-aos="fade-up"
            style={{ backgroundImage: `url(${bg1})` }}
            className=" bg-center bg-cover w-full h-32 ]"
          >
            <div className="  flex justify-center items-center relative w-full h-32  inset-0  bg-black/50">
              <h1 className="text-white font-bold">
                {" "}
                Trusted all over the country{" "}
              </h1>
            </div>
          </div>
          <div className=" z-10 relative bottom-5 w-full flex justify-center items-center gap-4">
            <div
              data-aos="fade-right"
              className="  w-44 h-44  flex flex-col rounded-md bg-amber-50"
            >
              <img src="" alt=" alt" />
              <h1> 500+ projects completed</h1>
            </div>
          </div>
          <div
            data-aos="zoom-in"
            className=" flex  flex-col justify-center items-center"
          >
            <h1> Call Now </h1>
            <ul>
              <li> Certified & experienced mechanics </li>
              <li> Fast turnaround time </li>
              <li> Affordable and transparent pricing </li>
              <li> Trusted by car owners across Nairobi </li>
            </ul>
          </div>
        </section>

        <section className=" section  flex flex-col  ">
          <div className=" container-main   flex justify-center items-center gap-normal section-sm   ">
            <h1 className="text-header heading-medium  ">
              Our Core Services Overview{" "}
            </h1>
            <ArrowRight className=" text-header  heading-bold  " />
          </div>

          <div className=" container-main grid grid-cols-2  md:grid-cols-4  gap-x-8 gap-y-3.5 p-2.5   ">
            {CoreServices.map((singleitem, key) => {
              return (
                <div
                  key={key}
                  data-aos="fade-up"
                  className=" bg-card   border-border flex flex-col  h-84 justify-center items-center  shadow-md  rounded-md p-3.5    "
                >
                  <h1 className="font-bold  card  text-secondary">
                    {" "}
                    {singleitem.heading}{" "}
                  </h1>
                  <p className=" card  text-xs md:text-sm">
                    {singleitem.paragraph}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/** pg 3 the process  */}

        <section class="section ">
          <div class=" container-main ">
            <div class="mx-auto max-w-2xl text-center mb-16 ">
              <h2 class=" text-header heading-medium ">
                Auto repair process in four basic steps
              </h2>
            </div>

            <div className="flex ">
              <div className="hidden md:flex md:flex-1  items-center">
                <img src={car1} alt="" className="h-fit " />
              </div>
              <div className="flex-1">
                <div class="rounded-xl  p-8 md:p-12">
                  <div class="max-w-3xl mx-auto">
                    <div class="relative">
                      <div class=" bg-secondary absolute left-5 top-2 bottom-2 w-0.5  "></div>

                      <div class="space-y-8">
                        <div class="relative pl-12 ">
                          <div class="absolute left-0 top-0  rounded-full  h-10 w-10 flex items-center justify-center bg-blue-400">
                            <Glasses />
                          </div>

                          <div class="bg-header rounded-lg p-5 transition-all hover:shadow-md">
                            <div class="flex items-start justify-between mb-2">
                              <h3 class="heading-normal fancy">
                                Assesment and estmates{" "}
                              </h3>
                            </div>
                            <p class="  text-sm">
                              Initial planning and team assembly. Define project
                              scope and objectives.
                            </p>
                          </div>
                        </div>

                        <div class="relative pl-12">
                          <div class="absolute left-0 top-0  rounded-full border  h-10 w-10 flex items-center justify-center bg-blue-400">
                            <ToolCase />
                          </div>
                          <div class="bg-header-foreground border  rounded-lg p-5 transition-all hover:shadow-md">
                            <div class="flex items-start justify-between mb-2">
                              <h3 class="heading-normal fancy">Repair work</h3>
                            </div>
                            <p class=" text-sm">
                              Create wireframes, mockups, and finalize design
                              system.
                            </p>
                          </div>
                        </div>

                        <div class="relative pl-12">
                          <div class="absolute left-0 top-0  rounded-full border border-blue-400 h-10 w-10 flex items-center justify-center bg-blue-400 ">
                            <BrushCleaning />
                          </div>
                          <div class="bg-header border  rounded-lg p-5 transition-all hover:shadow-md">
                            <div class="flex items-start justify-between mb-2">
                              <h3 class="heading-normal fancy">
                                Cleaning and detailing
                              </h3>
                            </div>
                            <p class=" text-sm">
                              Core functionality implementation and backend
                              architecture.
                            </p>
                          </div>
                        </div>

                        <div class="relative pl-12">
                          <div class="absolute left-0 top-0  rounded-full border border-blue-400 h-10 w-10 flex items-center justify-center bg-blue-400">
                            <Combine />
                          </div>
                          <div class=" bg-header-foreground border  rounded-lg p-5 transition-all hover:shadow-md">
                            <div class="flex items-start justify-between mb-2">
                              <h3 class="heading-normal fancy">pick up</h3>
                            </div>
                            <p class=" text-sm">
                              Comprehensive testing, bug fixes, and performance
                              optimization.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/** pg 4  img curosel */}
        <section className="contanier-main ">
          <div className="section">
            <div class="mx-auto max-w-2xl text-center mb-16 ">
              <h2 class=" text-header heading-medium ">
                Inside RoyalAutoGarage : Work In Progres
              </h2>
            </div>
            <div className="flex card border ">
              <div className="border ">
                <img src={img1} alt="img1" />
                <div className="flex">
                  <img src={img1} alt="img2" />
                  <img src={img1} alt="img3" />
                </div>
              </div>
              <div className="border ">
                <img src={img1} alt="img1" />
                <div className="flex">
                  <img src={img1} alt="img2" />
                  <img src={img1} alt="img3" />
                </div>
              </div>
              <div className="border ">
                <img src={img1} alt="img1" />
                <div className="flex">
                  <img src={img1} alt="img2" />
                  <img src={img1} alt="img3" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default Home;
