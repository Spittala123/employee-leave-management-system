// import Employee from "./Employee";
// import LeaveRequestForm from "./LeaveRequestForm";

// const Dashboard = () => {
//     return <><h2 className='container mt-5'>Welcome to User Dashboard</h2>
//      {/* <LeaveRequestForm /> */}
//     </>
// }

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css' 

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

const Dashboard: React.FC = () => {
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    // Fetch leave balances (simulate API call)
    fetchLeaveData();

    // Fetch user's leave requests (simulate API call)
    fetchLeaveRequests();
  }, []);

  const fetchLeaveData = async () => {
    // Example leave balance data
    const data: LeaveData[] = [
      { leaveType: 'Sick Leave', balance: 10 },
      { leaveType: 'Casual Leave', balance: 5 },
      { leaveType: 'Annual Leave', balance: 12 },
    ];
    setLeaveData(data);
  };

  const fetchLeaveRequests = async () => {
    // Example leave request data
    const data: LeaveRequest[] = [
      { id: 1, type: 'Sick Leave', startDate: '2025-02-15', endDate: '2025-02-16', status: 'Approved' },
      { id: 2, type: 'Casual Leave', startDate: '2025-03-01', endDate: '2025-03-02', status: 'Pending' },
    ];
    setLeaveRequests(data);
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

      <div className="leave-request">
        <h2>Leave Requests</h2>
        <Link to="/request-leave">Request New Leave</Link>
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
            {leaveRequests.map((request) => (
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