import { useEffect, useState } from "react";
import API from "../services/api";
import "./LeaveTable.css";

function LeaveTable({ admin }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const endpoint = admin ? "/leaves/all" : "/leaves/my";
      const { data } = await API.get(endpoint);
      console.log(data.data);
      setLeaves(data.data);
    };
    fetchLeaves();
  }, [admin]);

  const updateStatus = async (id, status) => {
    await API.patch(`/leaves/${id}/status`, { status });

    // Update UI without reload (Professional way)
    setLeaves((prev) =>
      prev.map((leave) =>
        leave._id === id ? { ...leave, status } : leave
      )
    );
  };

  return (
    <div className="leave-table">
      <div className="leave-header">
        <div>Employee</div>
        <div>Type</div>
        <div>From</div>
        <div>To</div>
        <div>Reason</div>
        <div>Status</div>
        {admin && <div>Actions</div>}
      </div>

      {leaves.map((leave) => (
        <div key={leave._id} className="leave-row">
          <div>{leave.userId || "You"}</div>
          <div>{leave.leaveType}</div>
          <div>{new Date(leave.startDate).toLocaleDateString()}</div>
          <div>{new Date(leave.endDate).toLocaleDateString()}</div>
          <div className="reason">{leave.leaveType}</div>

          <div>
            <span className={`status ${leave.status.toLowerCase()}`}>
              {leave.status}
            </span>
          </div>

          {admin && (
            <div className="actions">
              {leave.status === "Pending" && (
                <>
                  <button
                    className="approve"
                    onClick={() => updateStatus(leave._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => updateStatus(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LeaveTable;
