import LeaveTable from "../components/LeaveTable";
import AttendanceTable from "../components/AttendanceTable";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Navbar />

      <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard</h2>

        <div className="admin-section">
          <h3>All Leave Requests</h3>
          <LeaveTable admin />
        </div>

        <div className="admin-section">
          <h3>Attendance Records</h3>
          <AttendanceTable />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;