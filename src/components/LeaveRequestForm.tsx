import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LeaveRequestForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const initialValues = {
    employeeName: '',
    leaveType: 'Sick',
    startDate: '',
    endDate: ''
  };

  const validationSchema = Yup.object({
    employeeName: Yup.string().required('Employee name is required'),
    leaveType: Yup.string().required('Leave type is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required').min(Yup.ref('startDate'), 'End date can\'t be before start date')
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post('/api/leave-requests', values);
      setMessage('Leave request submitted successfully!');
    } catch (error) {
      setMessage('There was an error submitting the leave request.');
    }
  };

  function GetNumberofLeaves(): React.ReactNode {
   
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <h2>Leave Request Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            Employee Name &nbsp;<input name="employeeName" type="text" placeholder="Employee Name" />
            <ErrorMessage name="employeeName" component="div" />
          </div>
          <div>Leave Type
           &nbsp; <Field as="select" name="leaveType">
              <option value="Sick">Sick</option>
              <option value="Vacation">Vacation</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="leaveType" component="div" />
          </div>
          <div>
          Start Date &nbsp; <Field name="startDate" type="date" />
            <ErrorMessage name="startDate" component="div" />
          </div>
          <div>
           End Date &nbsp; <Field name="endDate" type="date" />
            <ErrorMessage name="endDate" component="div" />
          </div>
          <button type="submit">Submit</button>
          <div>
            <label >Quantity {GetNumberofLeaves()}</label> 
          </div>
        </Form>
      </Formik>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LeaveRequestForm;