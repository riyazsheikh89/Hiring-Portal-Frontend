import { useNavigate } from "react-router-dom";
import "../styles/ProfileCard.css";

const ProfileCard = ({ candidate }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/candidate/${candidate._id}`, {state: {candidate}});
  }

  return (
    <div className="card-container">
      <div className="profile-image">
        <img
          src={candidate.image}
          alt="profile-photo"
          className="profile-img"
        />
      </div>

      <div className="text-data">
        <span className="name">
          {candidate.first_name} {candidate.last_name}
        </span>
        <span className="major">{candidate.stream}</span>
        <span className="major">{candidate.degree}</span>
      </div>

      <div className="buttons">
        <button className="button">
          <a href={`mailto:${candidate.email}`}>Send Email</a>
        </button>
        <button
          className="button"
          onClick={handleViewProfile}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
