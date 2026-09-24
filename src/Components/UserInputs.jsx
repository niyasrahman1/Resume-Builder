import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  TextField  from '@mui/material/TextField';
import jobRole from '../assets/jobRole.json'
import jobSkills from '../assets/jobSkills.json'
import summaries from '../assets/summaries.json'
import { saveResumeApi } from '../services/allAPI';
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';


const steps = ['Basic Information ', 'Contact Details', 'Educational Details', 'Review & Submit'];


function UserInputs({ resumeData, setResumeData }) {
  console.log(resumeData);

  const [activeStep, setActiveStep] = React.useState(0);

  // useNavigate hook to route pages

  const navigate = useNavigate()


  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderFormContent = (stepCount) => {
    switch (stepCount) {
      case 0: return (
        <div>
          <h3>Personal Details</h3>
          <div className="row p-3">
            <TextField value={resumeData.fullName} onChange={e => setResumeData({ ...resumeData, fullName: e.target.value })} id="standard-basic-name" label="FullName" variant="standard" />
            <TextField value={resumeData.location} onChange={e => setResumeData({ ...resumeData, location: e.target.value })} id="standard-basic-location" label="location" variant="standard" />
            <FormControl variant="standard" >
              <InputLabel id="demo-simple-select-standard-label">Choose Job Title</InputLabel>
              <Select value={resumeData.job} onChange={e => setResumeData({ ...resumeData, job: e.target.value })}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard" label="Job"

              >

                {jobRole.jobRoles.map(job => (<MenuItem key={job} value={job} >{job}</MenuItem>))}

              </Select>
            </FormControl>

          </div>
        </div>
      )
        break;

      case 1: return (
        <div>
          <h3>Contact Details</h3>
          <div className="p-3 row">
            <TextField value={resumeData.email} onChange={e => setResumeData({ ...resumeData, email: e.target.value })} id="standard-basic-email" label="Email" variant="standard" />
            <TextField value={resumeData.phone} onChange={e => setResumeData({ ...resumeData, phone: e.target.value })} id="standard-basic-num" label="Contact Number" variant="standard" />
            <TextField value={resumeData.linkedin} onChange={e => setResumeData({ ...resumeData, linkedin: e.target.value })} id="standard-basic-linkedin" label="Linkedin Link" variant="standard" />
            <TextField value={resumeData.github} onChange={e => setResumeData({ ...resumeData, github: e.target.value })} id="standard-basic-github" label="Github Link" variant="standard" />

          </div>
        </div>
      )
        break;

      case 2: return (
        <div>
          <h3>Educational Details</h3>
          <div className="p-3 row">
            <TextField value={resumeData.digree} onChange={e => setResumeData({ ...resumeData, digree: e.target.value })} id="standard-basic-digree" label="Bacherlor's Degree" variant="standard" />
            <TextField value={resumeData.collage} onChange={e => setResumeData({ ...resumeData, collage: e.target.value })} id="standard-basic-collage" label="Collage / University Name" variant="standard" />
            <TextField value={resumeData.year} onChange={e => setResumeData({ ...resumeData, year: e.target.value })} id="standard-basic-year" label="Year of Graduation" variant="standard" />

          </div>
        </div>
      )
        break;

      case 3: return (
        <div>
          <p>
            Our AI will generate Skills & Summary according to your job role.Once the form get submitted, user won't get the chance to update the resume details. If you want ot proceed please click the <b>Generate AI Skill & Summary</b> button to submit.
          </p>
        </div>
      )

        break;
      default: return null
        break;
    }

  }

  // generate skills and summery

  const generateSkills = () => {
    setResumeData({ ...resumeData, skills: jobSkills[resumeData.job], summary: summaries[resumeData.job] })
    handleNext()

  }

  // save resume 

  const handleAddResume =async () => {

    const { fullName, location, job, email, phone, github, linkedin, digree, collage, year, skills, summary } = resumeData

    if (fullName && location && job && email && phone && github && linkedin && digree && collage && year && skills && summary) {

      const response = await saveResumeApi(resumeData);

      // console.log(response);

      if(response.status == 200){
        toast.success("Resume added succesfully");

        const resumeId = response.data.id 
        setTimeout(()=>{
          navigate(`/resume/${resumeId}/view`)
        },2000)

      }

    } else {
      toast.info("please fill the missing fields")
    }


  }

  return (


    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleAddResume} >
                Finish

              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box>
              {/* render content */}
              {renderFormContent(activeStep)}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />


              {activeStep === steps.length - 1 ? <Button onClick={generateSkills}>Genearte AI Skills and Summery</Button> : <Button onClick={handleNext} >Next</Button>}

            </Box>
          </React.Fragment>
        )}
      </Box>

    </div>
  )
}

export default UserInputs
