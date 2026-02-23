import { useState } from "react";
import API from "../services/api";
import './AttendanceForm.css';

function AttendanceForm() {
  const [status, setStatus] = useState("Present");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/attendance", {
      date: new Date(),
      status,
    });
    alert("Attendance Marked");
  };

return (
  <div className="attendance-form-wrapper">
    <form className="attendance-form" onSubmit={handleSubmit}>
      <h3 className="attendance-title">Mark Attendance</h3>

      <div className="attendance-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
      </div>

      <button type="submit" className="attendance-btn">
        Submit
      </button>
    </form>
  </div>
);
}

export default AttendanceForm;