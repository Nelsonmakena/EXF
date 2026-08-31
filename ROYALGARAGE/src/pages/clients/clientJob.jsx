import { useParams } from "react-router";

export default function ClientJob() {
  const { job_services_id } = useParams();
  console.log(job_services_id);

  return (
    <section className="flex ">
      <div className="bg-header w-full  "></div>
      <div className="w-full h-20  rounded-md  shadow-md  card bg-secondary/20">
        <div className="flex  justify-between  items-center ">
          <h1>logs</h1> <h1>logs</h1>
        </div>
      </div>
    </section>
  );
}
