import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";

const CandidateList = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const {data} = await axios.get("/api/v1/get-biodatas");
        setCandidates(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCandidates();
  }, []);

  if (loading) {
    return <p>loading...</p>
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>List of all candidates</h1>
      <div className="card" style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          height: "auto"
        }}
      >
        {candidates.map((candidate) => (
          <ProfileCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

export default CandidateList;