export interface LeaveRequest {
    id: number;
    employeeid: number;
    leaveType: 'Sick' | 'Vacation' | 'Other';
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }

  export interface LeaveApprove{
       id:number;
    startDate:Date;
    endDate:Date;
    employeeName:string;
    status:string;
    quantity:number;
  }