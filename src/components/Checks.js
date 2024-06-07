import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchChecks } from "../services/api";

const Checks = () => {
  const [checks, setChecks] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!authToken) return;
    if (!refresh) return;
    const loadChecks = async () => {
      const checks = await fetchChecks(authToken);
      setChecks(checks);
      setRefresh(false);
    };
    loadChecks();
  }, [authToken, refresh]);
  return (
    <div>
      <ul>
        {checks.map((check) => (
          <li key={check.pk}>{check.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Checks;
