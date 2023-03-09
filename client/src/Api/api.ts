import axios from "axios";



export const pushStep = async(id:string,steps:string[],currentStep:string)=>{
	try{
		 await axios.post("http://localhost:5000/api/auth/pushstep",{
			id,steps,currentStep
		})
	
	} catch(e){
	  if (axios.isAxiosError(e))  {
		console.log(e.response?.data.message );
	  } 
	}
  }