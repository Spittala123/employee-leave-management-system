import { useEffect, useState } from "react";
import {LeaveApprove} from "../types/LeaveRequest"
import { date } from "yup";
import axios from "axios";
// import {style} from "../components/styles.css"
const ApproveLeave =() =>
{
    const [LeaveApprove, setLeaveApprove]= useState<LeaveApprove[]>([]);
    const API ="http://localhost:5224/api/LeaveApproval"
    
    const [loading, setLoading] = useState<boolean>(true);
    const [form, setForm] = useState<LeaveApprove>({
        id: 0,
        employeeName: "",
        status: "",
        startDate: new Date(),
        endDate: new Date(),
        quantity:0
    });
  useEffect(()=>
{
    const fetchData = async () =>
    {
        try{
            const response = await axios.get(API,
             {   headers:{
                    'Authorization':'Bearer '+localStorage.getItem("token")
             }
                });
                setLeaveApprove(response.data);
                console.log(response.data);
        } catch(error)
        {
            seterror('Error fetching Data');
        }
        finally{
            setLoading(false);
        }
    }
    fetchData();
})
const updateEmployee = (id: number, approveStatus: string) => {
    const updatedForm = { ...form, status:approveStatus ,id:id };
    console.log(updatedForm);
    fetch(`${"http://localhost:5224/api/LeaveApproval"}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(updatedForm)
    })
        .then(() => {
            setLeaveApprove(LeaveApprove.map((emp) => (emp.id === id ? { ...updatedForm, id } : emp)));
            setForm({ id: 0, employeeName: "", status: "", startDate: new Date(), endDate: new Date(),quantity:0 });
        })
        .catch((error) => console.error(error));
};
    return <>
      
    <h2>Leave Approve Page</h2>
    <table>
    <thead>
        <tr>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>No Of Leaves</th>
            <th>Approve/Reject</th>
        </tr>
    </thead>
    <tbody>
      
        {LeaveApprove.map(leave=>(
            <tr key={leave.id}>
                {/* <td>{leave.id}</td> */}
                <td>{leave.employeeName}</td>
               <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td> 
                               <td>{leave.status}</td>
                               <td>{leave.quantity}</td>
                <td> <button className="btn btn-sm" onClick={()=>updateEmployee(leave.id,"approved")}>Approve</button> 
                <button className="btn btn-denger" onClick={()=>updateEmployee(leave.id,"Rejected")}>Reject</button></td>
        
</tr>
        )
        )}
      
 </tbody>
</table>
</>
}

export default ApproveLeave;

function seterror(arg0: string) {
    throw new Error("Function not implemented.");
}
