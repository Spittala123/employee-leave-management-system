import React from "react";

interface Leave {
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
}

interface LeaveListProps {
  leaves: Leave[];
}

const LeaveList: React.FC<LeaveListProps> = ({ leaves }) => {
  return (
    <div>
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{leave.employeeId}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;