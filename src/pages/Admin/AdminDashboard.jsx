import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/adminpanel/registrations/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Admin API Error:", data);

        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/admin/login");
        }

        return;
      }

      /*
        Backend response:

        [
          {
            verification: {...},
            registration: {...}
          }
        ]
      */

      const formattedData = data.map((item) => ({
        ...item.registration,
        verification: item.verification,
        verification_status: item.verification?.status,
      }));

      setRegistrations(formattedData);
    } catch (error) {
      console.error("Connection Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(
    (registration) => registration.status === filter
  );

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Registration Checking Panel</p>
        </div>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </header>

      {/* Statistics */}
      <div className="admin-stats">

        <div className="stat-card">
          <h3>Total</h3>
          <strong>{registrations.length}</strong>
        </div>

        <div className="stat-card pending">
          <h3>Pending</h3>
          <strong>
            {
              registrations.filter(
                (item) => item.status === "PENDING"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card review">
          <h3>Under Review</h3>
          <strong>
            {
              registrations.filter(
                (item) => item.status === "UNDER_REVIEW"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card approved">
          <h3>Approved</h3>
          <strong>
            {
              registrations.filter(
                (item) => item.status === "APPROVED"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <strong>
            {
              registrations.filter(
                (item) => item.status === "REJECTED"
              ).length
            }
          </strong>
        </div>

      </div>

      {/* Filters */}
      <div className="admin-content">

        <div className="filter-buttons">

          <button
            className={filter === "PENDING" ? "active" : ""}
            onClick={() => setFilter("PENDING")}
          >
            Pending
          </button>

          <button
            className={filter === "UNDER_REVIEW" ? "active" : ""}
            onClick={() => setFilter("UNDER_REVIEW")}
          >
            Under Review
          </button>

          <button
            className={filter === "APPROVED" ? "active" : ""}
            onClick={() => setFilter("APPROVED")}
          >
            Approved
          </button>

          <button
            className={filter === "REJECTED" ? "active" : ""}
            onClick={() => setFilter("REJECTED")}
          >
            Rejected
          </button>

        </div>

        {/* Registration Table */}
        <div className="registration-table-wrapper">

          {loading ? (
            <p className="loading-text">
              Loading registrations...
            </p>
          ) : filteredRegistrations.length === 0 ? (
            <div className="empty-state">
              <h3>No registrations found</h3>
              <p>
                There are no {filter.toLowerCase()} registrations.
              </p>
            </div>
          ) : (
            <table className="registration-table">

              <thead>
                <tr>
                  <th>Matrimony ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Caste</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredRegistrations.map((registration) => (

                  <tr key={registration.id}>

                    <td>
                      {registration.matrimony_id || "Not Generated"}
                    </td>

                    <td>
                      {registration.full_name || "-"}
                    </td>

                    <td>
                      {registration.gender || "-"}
                    </td>

                    <td>
                      {registration.date_of_birth || "-"}
                    </td>

                    <td>
                      {registration.caste || "-"}
                    </td>

                    <td>
                      <span
                        className={`status ${registration.status
                          ?.toLowerCase()
                          .replace("_", "-")}`}
                      >
                        {registration.status}
                      </span>
                    </td>

                    <td>
                    <button
                        className="view-btn"
                        onClick={() =>
                          navigate(
                            `/admin/view/${registration.id}`
                          )
                        }
                      >
                        View
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </div>
  );
}