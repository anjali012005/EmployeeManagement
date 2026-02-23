import { useEffect, useState } from "react";
import API from "../services/api";
import './AttendanceTable.css';

function AttendanceTable() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await API.get("/attendance/all");
        console.log(data);
        setAttendance(data.data);
      } catch (error) {
        console.error("Error fetching attendance", error);
      }
    };

    fetchAttendance();
  }, []);

return (
  <div className="attendance-wrapper">
    <table className="attendance-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Email</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((item) => (
          <tr key={item._id}>
            <td>{item.userId?.fullName}</td>
            <td>{item.userId?.email}</td>
            <td>{new Date(item.date).toLocaleDateString()}</td>
            <td>
              <span className={`status-badge ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default AttendanceTable;