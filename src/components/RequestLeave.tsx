
// https://notepad.pw/share/koLNw0hVdTBZe6YeQSvg 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { number } from 'yup';
import './styles.css' 
const LeaveRequestForm: React.FC = () => {
    const [employeeid, setEmployeeid] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [quanity, setQuantity] = useState<number>(0);
    const [status, setStatus] = useState<string>('Pending');
 const [reason,setreason] =useState<string>("");
  const [leavetypeid,setLeaveType] = useState<number>(0)
    useEffect(() => {
        const empid = Number(localStorage.getItem('employeeid'));
               if (empid) {
            setEmployeeid(empid);
        }
    }, []);

    const calculateQuantity = (start: string, end: string): number => {
        const startDt = new Date(start);
        const endDt = new Date(end);
        const diffTime = Math.abs(endDt.getTime() - startDt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const leaveRequest = {
            employeeid,
            startDate,
            endDate,
            quanity,
            status,
            reason,
            leavetypeid
        };
    
            try {
                const response = await fetch('http://localhost:5224/api/LeaveRequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer '+localStorage.getItem("token")
                    },
                    body: JSON.stringify(leaveRequest)
                });
    
                const result = await response.json();
                alert("Leaved applied Successfully");
                console.log(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };
//  console.log(JSON.stringify(leaveRequest));
//         try {
//             await axios.post('http://localhost:5224/api/LeaveRequest',
//                 {Headers:{
//                     'Authorization':'Bearer '+localStorage.getItem("token")
//              }, body: JSON.stringify(leaveRequest)});
//             alert('Leave request submitted successfully');
//         } catch (error) {
//             console.error('There was an error submitting the leave request!', error);
//         }
  //   };
   // Handle the change event
   const handleChange = (event: { target: { value: any; }; }) => {
    setLeaveType(event.target.value);
   }
   const handleChangeReson = (event: { target: { value: any; }; }) => {
    setreason(event.target.value);
   }
    useEffect(() => {
        if (startDate && endDate) {
            setQuantity(calculateQuantity(startDate, endDate));
        }
    }, [startDate, endDate]);

    return (
        <div className="leave-form-container">
      <h2>Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
            {/* <div>
                <label>Employee Name: </label>
                <input type="text" value={employeeid} readOnly />
            </div> */}
            <div className="form-group">
                <label>Leave Type</label>
                <select id="levaetype" name="Leave Type" value={leavetypeid} onChange={handleChange}>
            <option value="1">Sick</option>
            <option value="2">Vaction</option>
            <option value="3">Other</option>
            </select>
            </div>
            <div className="form-group">
                <label>Start Date: </label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>End Date: </label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Quantity: </label>
                <input type="number" value={quanity} readOnly />
            </div>
            <div className="form-group">
                <label>Status: </label>
                <input type="text" value={status} readOnly />
            </div>
            <div className="form-group">
                <label>Reson : </label>
                <input type="text" value={reason} id="reson"  onChange={handleChangeReson}/>
            </div>
            <button className="submit-btn" type="submit">Submit</button>
        </form>
        </div>
    );
};

export default LeaveRequestForm;
