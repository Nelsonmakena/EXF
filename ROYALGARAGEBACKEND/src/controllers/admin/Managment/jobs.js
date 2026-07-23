import { pool } from "../../../../Db.js";

//fetching list off all new jobs

export const allJobs = async (req, res) => {
  try {
    const listOfJobs = await pool.query("SELECT * FROM job");
    res.status(200).json({ success: true, data: listOfJobs.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//fetching unallocated jobs

export const unallocatedJobs = async (req, res) => {
  const job_allocation_status = false;
  try {
    const listOfUnaloccatedJobs = await pool.query(
      "SELECT * FROM jobsallocation WHERE job_allocation_status =$1",
      [job_allocation_status],
    );
    res.status(200).json({ success: true, data: listOfUnaloccatedJobs.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//job assigning to clients
export const  jobAssignment = async (req,res)=>{
   const {job_id}=req.body
   const{employee_id}=req.userinfo
   

}