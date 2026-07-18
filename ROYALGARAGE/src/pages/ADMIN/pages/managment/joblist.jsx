import axios from "axios";
import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, Setjobs] = useState([]);
  const token = localStorage.getItem("token");
  //fething job list
  const getJobsLists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/jobslist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Setjobs(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getJobsLists();
  }, []);
  console.log(jobs);

  return (
    <section className="conatiner-main">
      <div className="section flex flex-col gap-normal">
        {/**job card  */}
        {jobs.map((item) => {
          return (
            <div className="bg-secondary font-bold flex justify-between card rounded-2xl shadow-xs cursor-pointer">
              {" "}
              <div className=" card  text-card">
                <h1>{item.first_name + item.last_name}</h1>
                <h1>{item.phonenumber}</h1>
                <h1>{item.email}</h1>
              </div>
              <div className="card text-card">
                <h1 className=" font-medium">{item.liscence_plate}</h1>
                <h1>{item.vehicle_brand}</h1>
              </div>
              <div className="card text-header font-bold">
                <h1 className="">{item.service_name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
