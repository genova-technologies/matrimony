import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Registration.css";

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();

  const prefill = location.state || {};

  const [formData, setFormData] = useState({
    name: prefill.name || "",
    gender: prefill.gender || "",
    day: "",
    month: "",
    year: "",
    maritalStatus: "",
    caste: "",
    email: "",
    password: "",
    source: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Step 1 submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    // Validate Date of Birth
    if (!formData.day || !formData.month || !formData.year) {
      alert("Please select your complete date of birth.");
      return;
    }

    // Create YYYY-MM-DD format
    const dateOfBirth = `${formData.year}-${
      monthMap[formData.month]
    }-${String(formData.day).padStart(2, "0")}`;

    // Prepare Step 1 data
    const registrationData = {
      full_name: formData.name.trim(),
      gender: formData.gender,
      date_of_birth: dateOfBirth,
      marital_status: formData.maritalStatus,
      caste: formData.caste,
      source: formData.source,
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    console.log("Step 1 Data:", registrationData);

    // Move to Step 2
    navigate("/registration-details", {
      state: {
        registration: registrationData,
      },
    });
  };

  // Days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Months
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Years
  const years = [];

  for (let i = 1980; i <= 2010; i++) {
    years.push(i);
  }

  return (
    <>
      {/* =========================
          REGISTRATION BANNER
      ========================= */}
      <section className="registration-banner">
        <div className="banner-overlay">
          <h1>Find Your Perfect Match</h1>

          <p>
            Join thousands of happy couples who found their life
            partner through Matrimony.
          </p>
        </div>
      </section>

      {/* =========================
          STEP PROGRESS
      ========================= */}
      <div className="reg-step-bar">
        {/* Step 1 */}
        <div className="reg-step-item">
          <div className="reg-step-circle active">1</div>

          <span className="reg-step-label">
            Basic Info
          </span>
        </div>

        <div className="reg-step-line"></div>

        {/* Step 2 */}
        <div className="reg-step-item">
          <div className="reg-step-circle">2</div>

          <span className="reg-step-label">
            Education
          </span>
        </div>

        <div className="reg-step-line"></div>

        {/* Step 3 */}
        <div className="reg-step-item">
          <div className="reg-step-circle">3</div>

          <span className="reg-step-label">
            Family
          </span>
        </div>
      </div>

      {/* =========================
          REGISTRATION FORM
      ========================= */}
      <div className="registration-page">
        <div className="registration-container">
          <form onSubmit={handleSubmit}>

            {/* =========================
                NAME
            ========================= */}
            <div className="form-group">
              <label>Name of Bride/Groom *</label>

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* =========================
                GENDER
            ========================= */}
            <div className="form-group">
              <label>Gender *</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            {/* =========================
                DATE OF BIRTH
            ========================= */}
            <div className="form-group">
              <label>Date of Birth *</label>

              <div className="dob">

                {/* Day */}
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Day
                  </option>

                  {days.map((day) => (
                    <option
                      key={day}
                      value={day}
                    >
                      {day}
                    </option>
                  ))}
                </select>

                {/* Month */}
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Month
                  </option>

                  {months.map((month) => (
                    <option
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                {/* Year */}
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Year
                  </option>

                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </select>

              </div>
            </div>

            {/* =========================
                MARITAL STATUS
            ========================= */}
            <div className="form-group">
              <label>
                Marital Status *
              </label>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select
                </option>

                <option value="Unmarried">
                  Unmarried
                </option>

                <option value="Divorced">
                  Divorced
                </option>

                <option value="Widowed">
                  Widowed
                </option>
              </select>
            </div>

            {/* =========================
                CASTE
            ========================= */}
            <div className="form-group">
              <label>
                Caste *
              </label>

              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Caste
                </option>

                <option value="Thiyya">
                  Thiyya
                </option>

                <option value="Nair">
                  Nair
                </option>

                <option value="Ezhava">
                  Ezhava
                </option>

                <option value="Brahmin">
                  Brahmin
                </option>

                <option value="Muslim">
                  Muslim
                </option>

                <option value="Christian">
                  Christian
                </option>
              </select>
            </div>

            {/* =========================
                LOGIN DETAILS
            ========================= */}
            <h2>
              For Matrimony Login
            </h2>

            {/* Email */}
            <div className="form-group">
              <label>
                User Email *
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>
                Password *
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* =========================
                SOURCE
            ========================= */}
            <h2>
              How did you know about Keralakaramatrimony?
            </h2>

            <div className="form-group">
              <label>
                Source *
              </label>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select
                </option>

                <option value="Google Search">
                  Google Search
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Instagram">
                  Instagram
                </option>

                <option value="Friend">
                  Friend
                </option>

                <option value="Advertisement">
                  Advertisement
                </option>
              </select>
            </div>

            {/* =========================
                NEXT BUTTON
            ========================= */}
            <button
              type="submit"
              className="submit-btn"
            >
              ENTER
            </button>

          </form>
        </div>
      </div>
    </>
  );
}