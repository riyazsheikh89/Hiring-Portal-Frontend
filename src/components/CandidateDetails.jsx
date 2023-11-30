import { useLocation } from 'react-router-dom';

import Download_Icon from "../assets/download-icon.svg";
import Email_Icon from '../assets/email.svg';
import Phone_Icon from '../assets/phone.svg';
import "../styles/CandidateDetails.css";

const CandidateDetails = () => {
  const location = useLocation(); // to get the current location object
  const { state } = location; // Access the state object from the location
  const candidate = state ? state.candidate : null;

  return (
    <div className="candidate-details-container">
      <div className="left-container">
        <img
          src={candidate.image}
          alt="profile"
          style={{
            width: "150px",
            height: "160px",
            margin: "15px 0 15px 0",
            border: "3px solid black",
            padding: "2px",
            background: "white"
          }}
        />
        <button className="download-btn"
        onClick={() => window.open(`${candidate.resume}`, '_blank')}
        >
          <img
            style={{ paddingRight: "5px" }}
            src={Download_Icon}
            alt="-icon"
          />
          Resume
        </button>
        <div className="email">
          <img src={Email_Icon} className="email-img" alt="" />
          {candidate.email}
        </div>
        <div className="phone">
          <img src={Phone_Icon} className="phone-img" alt="" />
          {candidate.phone}
        </div>
      </div>

      <div className="right-container">
        <div id="row-box">
          <div id="box1">Name : </div>
          <div id="box2">{candidate.first_name} {candidate.last_name}</div>
        </div>

        <div id="row-box">
          <div id="box1">College :</div>
          <div id="box2">{candidate.college}</div>
        </div>

        <div id="row-box">
          <div id="box1">Stream :</div>
          <div id="box2">{candidate.stream}</div>
        </div>

        <div id="row-box">
          <div id="box1">Degree :</div>
          <div id="box2">{candidate.degree}</div>
        </div>

        <div id="row-box">
          <div id="box1">Batch :</div>
          <div id="box2">{candidate.starting_year} - {candidate.ending_year}</div>
        </div>

        <div id="row-box">
          <div id="box1">Gender :</div>
          <div id="box2">{candidate.gender}</div>
        </div>

        <div id="row-box">
          <div id="box1">D.O.B :</div>
          <div id="box2">{candidate.dob}</div>
        </div>

        <div id="row-box">
          <div id="box1">Skills :</div>
          <div id="box2">{candidate.skills}</div>
        </div>

        <div id="row-box">
          <div id="box1">Address :</div>
          <div id="box2">{candidate.address}</div>
        </div>
        
      </div>
    </div>
  );
};

export default CandidateDetails;
