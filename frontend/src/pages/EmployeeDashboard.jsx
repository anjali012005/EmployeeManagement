import LeaveForm from "../components/LeaveForm";
import AttendanceForm from "../components/AttendanceForm";
import LeaveTable from "../components/LeaveTable";
import Navbar from "../components/Navbar";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <h2 className="dashboard-title">Employee Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <LeaveForm />
        </div>

        <div className="dashboard-card">
          <AttendanceForm />
        </div>

        <div className="dashboard-card leave-table-card">
          <LeaveTable />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;