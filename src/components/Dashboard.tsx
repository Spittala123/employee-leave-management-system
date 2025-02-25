
import axios from "axios";
import React, { useEffect, useState } from 'react';
import './Dashboard.css'

interface LeaveData {
    leaveType: string;
    balance: number;
}

interface LeaveRequest {
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    status: string;
}
const ID = localStorage.getItem("employeeid");
const API = "http://localhost:5224/api/Auth/id?id=" + ID;
const APILeaveDetails = "http://localhost:5224/api/LeaveRequest/id?id=" + ID;
const Dashboard: React.FC = () => {
    const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [leaveDetail, setLeaveDetail]= useState<LeaveRequest[]>([]);
    const role = localStorage.getItem("Role")?.toLowerCase() ;
    useEffect(() => {
        fetchLeaveData();

        fetchLeaveRequests();
    }, []);

    const fetchLeaveData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(API,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
            const data: LeaveData[] = [
                { leaveType: 'Sick Leave', balance: response.data[0].pendingSickLeaves },
                { leaveType: 'Vacation Leave', balance: response.data[0].pendingVacationLeaves },
                { leaveType: 'Others', balance: response.data[0].pendingOtherLeaves },
            ];
            setLeaveData(data);
            console.log(data);
        } catch (error) {
            seterror('Error fetching Data');
        }
        finally {
            setLoading(false);
        }
// fetchLeaveData();

    }

    const fetchLeaveRequests = async () => {
    setLoading(true);
        try {
            const response = await axios.get(APILeaveDetails,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
            
         setLeaveDetail(response.data);

        } catch (error) {
            seterror('Error fetching Data');
        }
        finally {
            setLoading(false);
        }
        // fetchLeaveRequests();
    };

    return (
        <div className="user-dashboard">
            <h1>Welcome to Your Dashboard</h1>

            <div className="leave-balance">
                <h2>Your Leave Balances</h2>
                <ul>

                    {leaveData.map((leave) => (
                        <li key={leave.leaveType}>
                            <strong>{leave.leaveType}:</strong> {leave.balance} days
                        </li>
                    ))}
                </ul>
            </div>

            <div className="dashboard">
                <h2>Leave Requests</h2>
                
         {role=='admin' ? (
            <div>
        <a href="/requestleave">Request Leave</a> &nbsp;&nbsp;&nbsp;

         <a href="/approveleave">Approve Leaves</a>
        </div>
      ) : (
        <a href="/requestleave">Request Leave</a>
      )}

                <table>
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            {leaveDetail.map((request) => (
              <tr key={request.id}>
                <td>{request.type}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody> 
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
function seterror(arg: string) {
    throw new Error("Function not implemented.");
}