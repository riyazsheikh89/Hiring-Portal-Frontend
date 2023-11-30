import { useState } from "react";
import CandidateForm from "./CandidateForm";
import axios from "axios";
import FormSuccess from "./FormSuccess";

const Candidate = () => {
    const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        college: "",
        degree: "",
        stream: "",
        starting_year: "",
        ending_year: "",
        dob: "",
        gender: "",
        phone: "",
        address: "",
        skills: "",
        resume: "",
        image: "",
        checkbox: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          for (const key in data) {
            formData.append(key, data[key]);
          }
          const config = {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
              // "Content-type": "application/json",
          };
          const response = await axios.post("/api/v1/submitbio", formData, config);
          console.log("biodata: ", response.data);
          setHasSubmittedForm(true);
        } catch (error) {
            const {response} = error;
            if (response.status == 400) {
                alert(response.data.err);
            }
            console.log(response);
        }
    }

    const handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;

        const value = type === "checkbox"
            ? e.target.checked
            : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        const name = e.target.name;
        const value = e.target.files[0];
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // TODO: change code for dob
    // address, skills : these are not mandatory fields
    const { address, skills, ...otherProps } = data;

    // check wheather every value is present or not
    const canSave = [...Object.values(otherProps)].every(Boolean);

    if (hasSubmittedForm) {
        return <FormSuccess />
    } else {
        return (
            <CandidateForm 
                handleFileChange={handleFileChange}
                handleChange={handleChange} 
                onSubmit={handleSubmit}
                canSaveForm={canSave}
                data={data}
            />
        );
    }
}
export default Candidate;