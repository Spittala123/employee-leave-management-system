
import React, { useState, useEffect } from 'react';
import './RequestLeave.css'

const LeaveRequestForm: React.FC = () => {
    const [employeeid, setEmployeeid] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [quanity, setQuantity] = useState<number>(0);
    const [status, setStatus] = useState<string>('Pending');
  const [reason,setLeaveType] = useState<string>('sick')
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
        const Id = Number(localStorage.getItem('employeeid'));

        event.preventDefault();
        const leaveRequest = {
            Id,
            startDate,
            endDate,
            quanity,
            status,
            reason,
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
                window.location.reload();
            } catch (error) {
                console.error('Error:', error);
                alert("Insufficient Leave Balance");

            }
        };

   const handleChange = (event: { target: { value: any; }; }) => {
    setLeaveType(event.target.value);
   }

    useEffect(() => {
        if (startDate && endDate) {
            setQuantity(calculateQuantity(startDate, endDate));
        }
    }, [startDate, endDate]);

    return (
        <div className="leave-form-container">
      <h2>Apply for Leave</h2>
      <div>
      <a href="/dashboard">Dashboard</a> &nbsp;&nbsp;&nbsp;

      </div>
        <form onSubmit={handleSubmit}>
           
            <div className="form-group">
                <label>Leave Type</label>
                <select id="reason" name="Leave Type" value={reason} onChange={handleChange}>
            <option value="Sick">Sick</option>
            <option value="Vacation">Vacation</option>
            <option value="Other">Other</option>
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
           
            <button className="submit-btn" type="submit">Submit</button>
        </form>
        </div>
    );
};

export default LeaveRequestForm;
