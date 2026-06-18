export default function About() {
  return (
    <>
      <title> About</title>
      <section className="  mt-24 w-full h-screen p-3.5 ">
        <div className="flex min-h-3/4 ">
          <div className="flex flex-col flex-1">
            <h1 className="font-bold "> started back in the 90s </h1>
            <div className="bg-amber-700 h-1/2 "></div>
          </div>

          <div className="flex-1">
            <p>
              <span className="text-3xl">o</span> ur company started as a sall
              seller of car parts in the 90s with our director mr kimani at the
              time the shop had only one mechnaic who used to do mere car fixes.{" "}
              <br />
              later in the 2000s mr kimani and some four other coluges came
              about and now build the royal autogarage shop which was able to do
              services to about 10 vehicles a week and the progresss contuied
              until now where our garage proces over 100 vehicles in a week
            </p>
          </div>
        </div>
        <h1 className="flex justify-center w-full">
          At royal auto garage client satisfaction is of the top priority{" "}
        </h1>
      </section>
      <section className="h-screen p-3.5">
        <h1>
          {" "}
          <span className="text-3xl">o</span>ur Mission
        </h1>
        <p>
          To empower auto service businesses with smart technology that improves
          productivity, organization, and customer satisfaction.
        </p>
      </section>
      <section>
        <h1> our team </h1>
      </section>
      <section>
        <h1> Our clients talk about us </h1>
      </section>
    </>
  );
}
