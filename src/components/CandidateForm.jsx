import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, MenuItem, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import "../styles/CandidateForm.css";


const CandidateForm = ({data, handleChange, handleFileChange, canSaveForm, onSubmit}) => {


  const Genders = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'others',
      label: 'Others'
    }
  ]

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  return (
    <div className="main_container">
      <div className="form-container">
        {/* 1st Part: */}
        <div className="form-heading">
          <div id="heading">
            <h2>Enter your candidature</h2>
          </div>
        </div>

        {/* 2nd Part: */}
        <div className="form_info_container">
          <form>
            <div className="split-container">
              <TextField
                label="First name"
                variant="filled"
                required
                fullWidth
                type="text"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
              />
              <TextField
                label="Last name"
                variant="filled"
                required
                fullWidth
                style={{ marginLeft: "10px" }}
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="Email"
                variant="filled"
                required
                fullWidth
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="College/University"
                variant="filled"
                required
                fullWidth
                type="text"
                name="college"
                value={data.college}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="Degree"
                variant="filled"
                required
                fullWidth
                type="text"
                name="degree"
                value={data.degree}
                onChange={handleChange}
              />
              <TextField
                label="Area of study/Stream"
                variant="filled"
                required
                fullWidth
                style={{ marginLeft: "10px" }}
                type="text"
                name="stream"
                value={data.stream}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="From(Year)"
                variant="filled"
                required
                fullWidth
                inputProps={{
                  maxLength: 4,
                }}
                type="text"
                name="starting_year"
                value={data.starting_year}
                onChange={handleChange}
              />
              <TextField
                label="To(Year)"
                variant="filled"
                required
                fullWidth
                style={{ marginLeft: "10px" }}
                inputProps={{
                  maxLength: 4,
                }}
                type="text"
                name="ending_year"
                value={data.ending_year}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Date of birth"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                fullWidth
                style={{ marginLeft: "10px" }}
                type="date"
                name="dob"
                value={data.bod}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="Gender"
                variant="filled"
                select
                required
                fullWidth
                type="text"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              >
                {Genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Phone no."
                variant="filled"
                required
                fullWidth
                style={{ marginLeft: "10px" }}
                type="number"
                name="phone"
                value={data.phone}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="Permanent Address"
                variant="filled"
                multiline
                fullWidth
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="Technical Skills"
                variant="filled"
                multiline
                fullWidth
                type="text"
                name="skills"
                value={data.skills}
                onChange={handleChange}
              />
            </div>

            <div id="input_container">
              <TextField
                label="Something you want to tell us!"
                variant="filled"
                multiline
                fullWidth
              />
            </div>

            {/* file input start */}
            <div className="file_upload_container">
              <div id="file_input_btn" style={{marginRight: "5px"}}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  UPLOAD RESUME
                  <VisuallyHiddenInput 
                    type="file"
                    accept="application/pdf"
                    name="resume"
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography variant="caption" display="block">
                  {data.resume.name
                    ? `${data.resume.name}`
                    : "*Select your resume"}
                </Typography>
              </div>

              <div id="file_input_btn" style={{marginLeft: "5px"}}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  UPLOAD PHOTO
                  <VisuallyHiddenInput
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography variant="caption" display="block">
                {data.image.name
                    ? `${data.image.name}`
                    : "*Select your resume"}
                </Typography>
              </div>
            </div>
            {/* file input end */}
          </form>
        </div>

        {/* PART : 3 */}
        <div className="declaration_container">
          <input 
            id="check_box"
            type="checkbox"
            name="checkbox"
            onChange={handleChange}
          />
          <Typography variant="caption" display="block">
            I hereby declare that the information given above and in the
            enclosed documents is true to the best of my knowledge and belief
            and nothing has been concealed therein. I understand that if the
            information given by me is proved false/not true, I will have to
            face the punishment as per the law.
          </Typography>
        </div>

        <div id="submit_btn">
          <Button 
            variant="contained" 
            color="success" 
            fullWidth
            onClick={onSubmit}
            disabled={!canSaveForm}
          >
            Save Details
          </Button>
        </div>

      </div>
    </div>
  );
};


export default CandidateForm;