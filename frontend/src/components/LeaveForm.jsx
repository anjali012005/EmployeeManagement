import { useState } from "react";
import API from "../services/api";
import './LeaveForm.css';

function LeaveForm() {
  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/leaves", form);
    alert("Leave Applied");
  };

return (
  <div className="leave-form-wrapper">
    <form className="leave-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Apply Leave</h3>

      <div className="form-group">
        <label>Leave Type</label>
        <select
          value={form.leaveType}
          onChange={(e) =>
            setForm({ ...form, leaveType: e.target.value })
          }
        >
          <option>Casual</option>
          <option>Sick</option>
          <option>Paid</option>
        </select>
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />
      </div>

      <button type="submit" className="submit-btn">
        Apply Leave
      </button>
    </form>
  </div>
);
}

export default LeaveForm;