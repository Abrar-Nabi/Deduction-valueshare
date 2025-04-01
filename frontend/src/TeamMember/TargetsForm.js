import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTarget = ({ teamMemberId }) => {
  const [targets, setTargets] = useState([]);
  const [target, setTarget] = useState(0);
  const [targetAchieved, setTargetAchieved] = useState(0);
  const [quarter, setQuarter] = useState("Q1");

  useEffect(() => {
    // Fetch existing targets for the team member
    const fetchTargets = async () => {
      try {
        const response = await axios.get(`/api/targets/${teamMemberId}`);
        setTargets(response.data);
      } catch (error) {
        console.error("Error fetching targets:", error);
      }
    };

    fetchTargets();
  }, [teamMemberId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/targets/update-target", {
        teamMemberId,
        quarter,
        target,
        targetAchieved,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error updating target");
    }
  };
  

  return (
    <div>
      <h3>Update Target for {quarter}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Target:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div>
          <label>Target Achieved:</label>
          <input
            type="number"
            value={targetAchieved}
            onChange={(e) => setTargetAchieved(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>

      <div>
        <h4>Current Targets</h4>
        {targets.map((t) => (
          <div key={t.quarter}>
            <p>
              {t.quarter}: Target - {t.target}, Achieved - {t.targetAchieved}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateTarget;
