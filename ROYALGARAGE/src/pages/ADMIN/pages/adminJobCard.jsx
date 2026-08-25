import { useParams } from "react-router";

export default function AdminJobCard() {
  const { job_services_id } = useParams();
  console.log(job_services_id);

  return (
    <section className="section ">
      <div></div>
      <div></div>
    </section>
  );
}
