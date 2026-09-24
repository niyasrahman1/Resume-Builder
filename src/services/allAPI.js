import apiServices from '../api/apiService';

// saveResumeApi : add resume details to JSON server

export const saveResumeApi = async (resumeDetails) => {

    return await apiServices('POST','/resumes',resumeDetails);
    

}

//  viewResumesAPI : called by view resumes componet when resume is added


export const viewResumesAPI = async (resumeId) => {

    return await apiServices('GET',`/resumes/${resumeId}`,{});
    

}
//  allResumesAPI : called by all resumes componet when resume is added


export const allResumesAPI = async () => {

    return await apiServices('GET',`/resumes`,{});
    

}


// downloadResumesAPI : called by viewResumes component when resume gets displayed

export const downloadResumesAPI = async(resumeDetails) => {

    return await apiServices('POST',`/downloads`,resumeDetails)
}

// getAllDownloadsResumeAPI : called by the downloads componet when the resume is downloaded

export const getAllDownloadsResumeAPI = async() => {

    return await apiServices('GET','./downloads',{})
}

// updateResumeAPI : called by edit component when resume got changes

export const updateResumeAPI = async(resumeId,resumeDetails)=> {
    
    return await apiServices('PUT',`/resumes/${resumeId}`,resumeDetails)
    
}

// deleteResumeAPI : Called  by the all resume component when  the delete  button is clicked

export const deleteResumeAPI = async(resumeId) => {

    return await apiServices('DELETE',`/resumes/${resumeId}`,{})
}