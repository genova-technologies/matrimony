import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientLayout from "../../components/ClientLayout";
import "./Interests.css";

const API_URL = "http://127.0.0.1:8000/api";

export default function Interests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("received"); // 'received' or 'sent'
  const [receivedInterests, setReceivedInterests] = useState([]);
  const [sentInterests, setSentInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  const fetchInterests = () => {
    setLoading(true);
    setError("");

    const receivedPromise = fetch(`${API_URL}/registrations/interests/received/`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : []));

    const sentPromise = fetch(`${API_URL}/registrations/interests/sent/`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : []));

    Promise.all([receivedPromise, sentPromise])
      .then(([receivedData, sentData]) => {
        setReceivedInterests(receivedData.results || receivedData || []);
        setSentInterests(sentData.results || sentData || []);
      })
      .catch((err) => {
        setError("Failed to load interests.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchInterests();
  }, [token, navigate]);

  const handleInterestUpdate = (interestId, action) => {
    fetch(`${API_URL}/registrations/interest/${interestId}/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || `Failed to ${action} interest.`);
        }
        fetchInterests();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const listToDisplay = activeTab === "received" ? receivedInterests : sentInterests;

  return (
    <ClientLayout>
      <div className="interests-container">
        <div className="interests-header">
          <h1>Interests</h1>
          <p>Manage interest requests received from and sent to other members.</p>
        </div>

        {/* TABS */}
        <div className="interests-tabs">
          <button
            className={`tab-button ${activeTab === "received" ? "active" : ""}`}
            onClick={() => setActiveTab("received")}
          >
            Interests Received ({receivedInterests.length})
          </button>
          <button
            className={`tab-button ${activeTab === "sent" ? "active" : ""}`}
            onClick={() => setActiveTab("sent")}
          >
            Interests Sent ({sentInterests.length})
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading interests...</p>
          </div>
        ) : error ? (
          <div className="dashboard-error">
            <div className="error-box">
              <p>{error}</p>
              <button onClick={fetchInterests}>Retry</button>
            </div>
          </div>
        ) : listToDisplay.length === 0 ? (
          <div className="empty-interests">
            <h3>No Interests {activeTab === "received" ? "Received Yet" : "Sent Yet"}</h3>
            <p>
              {activeTab === "received"
                ? "When other members send you an interest request, it will appear here."
                : "You have not sent interest requests to any members yet."}
            </p>
          </div>
        ) : (
          <div className="interest-list">
            {listToDisplay.map((item) => (
              <div key={item.id} className="interest-card">
                <div className="interest-card-left">
                  <div className="interest-avatar">
                    {item.profile_photo_url ? (
                      <img src={item.profile_photo_url} alt={item.profile_name} />
                    ) : (
                      item.profile_name?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>
                  <div className="interest-info">
                    <h3>{item.profile_name || "Member Profile"}</h3>
                    <div className="interest-meta">
                      <span>ID: <strong>{item.matrimony_id || "-"}</strong></span>
                      {item.age && <span>Age: {item.age} Yrs</span>}
                      {item.city && <span>Location: {item.city}</span>}
                      <span>Date: {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="interest-card-right">
                  {activeTab === "received" && item.status === "PENDING" ? (
                    <>
                      <button
                        className="btn-accept"
                        onClick={() => handleInterestUpdate(item.id, "accept")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-decline"
                        onClick={() => handleInterestUpdate(item.id, "decline")}
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <span className={`status-tag ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  )}
                  {item.profile_id && (
                    <button
                      className="btn-cancel"
                      onClick={() => navigate(`/search-matches/${item.profile_id}`)}
                    >
                      View Profile
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
