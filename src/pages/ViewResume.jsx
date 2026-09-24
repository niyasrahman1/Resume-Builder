import React, { useEffect, useRef, useState } from 'react'
import Preview from '../Components/Preview'
import { FaFileDownload } from 'react-icons/fa'
import { AiFillBackward } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Edit from '../Components/Edit'
import { downloadResumesAPI, viewResumesAPI } from '../services/allAPI'
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";




function ViewResume() {

  const  {id} = useParams()
  
  const [resume,setResume] = useState({})

  // console.log(resume);

  const previewRef = useRef()
  

  // calling the api

  useEffect(() => {

    getResumeDetails()

  },[])

  const getResumeDetails = async () => {
    const response = await viewResumesAPI(id)
    // console.log(response);

    if(response.status == "200"){
      setResume(response.data)
    }

    


    
  }

  const downloadCV = async() => {
    
    const previewTag = previewRef.current
    // console.log(previewTag);
    const canvas = await html2canvas(previewTag);
  
    // convert to shortURL

    canvas.toBlob(async(imgFile)=> {


      //  create formdata to upload file via api

      const formData =new FormData()
      formData.append('file',imgFile);
      formData.append("upload_preset","resumes")

      // generate resumeIMG by calling cludinary api

      const result = await fetch('https://api.cloudinary.com/v1_1/tgpnkpwe/image/upload',{
        method:'POST',
        body:formData
      }) 

      const serverData = await result.json()
      // console.log(serverData);

      const url = serverData.secure_url

      console.log(url);
      

    // generate pdf
     generatePDF(url)
      
     })

    
    
    
  }

  const generatePDF =  async (resumeIMG) => {

    let today = new Date()

    let timeStamp =`${today.toLocaleDateString()}, ${today.toLocaleTimeString()}`;


    // console.log(timeStamp);

    const pdf = new jsPDF();
    
    const imageWidth = pdf.internal.pageSize.getWidth();
    const imageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(resumeIMG,"PNG",0,0,imageWidth,imageHeight)


    const downloadDetails = {
      timeStamp,resumeId:id , resumeIMG,jobRole:resume.job
      
      


    }
    
    

    const result = await downloadResumesAPI(downloadDetails);
    console.log(result);

    if(result.status == '201'){
      pdf.save(`${resume.fullName}-CV.pdf`)
    }
    


    
    

  }


  return (
    <>
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          {/* navigation icons */}
          <div className="d-flex justify-content-center align-items-center">
            {/* download */}
            <button onClick={downloadCV} style={{color:'#714a27'}} className='btn me-2' ><FaFileDownload className="fs-5"/>Download CV</button>
            {/* edit */}
            <Edit resumeData={resume} setResumeData={setResume} />

            {/* back */}
            <Link to={'/form'} style={{color:'#714a27'}} className="btn" ><AiFillBackward className='fs-3'/>Home</Link>


          </div>
        </div>

        {/* preview components */}

        <div ref={previewRef} className="p-5">
          <Preview resumeData={resume}/>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>

      
    </>
  )
}

export default ViewResume
