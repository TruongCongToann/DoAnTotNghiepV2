import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (URL = "", params = {}) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const [shouldRefetch, refetch] = useState({}); 
  const refresh = () => refetch({});

  useEffect(() => {
    let isSubscribe = true;
    (async function fetchData() {
      try {
        const response = await axios.get(URL,params);
        if (isSubscribe && response.status === 200) {
          setData(response.data || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        isSubscribe && setIsLoading(false);
      }
    })();
    return () => (isSubscribe = false);
  }, [shouldRefetch]);
  return { isLoading, data,refresh };
}
//https://api-truongcongtoan.herokuapp.com/api/users

//add new user 
const handleLoginAPI = (URL = "", data = {}) => {

  // console.log("du lieu nhanh duoc la ",data)
  axios.post(URL, data)
  .then(response =>
    console.log(response)
    );
};
// const addSchedule =()
//delete user
const deleteUser = (URL = "",username) =>{
  console.log("url la ",URL);
  return axios.delete(URL+'/'+username);
}
//sua user
const editUser = (URL = "",params = {}) =>{
  return axios.put(URL+"/"+params.username,params);
 
}
//sua markdown
const editMarkdown = (URL = "",params = {}) =>{
  return axios.put(URL+"/"+params.markdown_id,params);
}
//get markdown thong qua markdown_id
const getDetailInforDoctor = async (inputId) =>{
  let url = `https://api-truongcongtoan.herokuapp.com/api/markdowns/${inputId}`;
  return  axios.get(url);  
}
//get schedule by doctorid
const getScheduleByDoctorid = async (inputId) =>{
  let url = `https://api-truongcongtoan.herokuapp.com/api/schedules/${inputId}`;
  // console.log(url)
  return  axios.get(url);  
}

//delete time schedule 
const deleteSchedule = (doctorid,date,timetype) =>{
  let url = `https://api-truongcongtoan.herokuapp.com/api/schedules/${doctorid}/${date}/${timetype}`;
  console.log("url la ",url)
  return axios.delete(url);
}
//get schedule by doctorid and date
const getSchedulebyDate = async (doctorid,date) =>{
  let url = `https://api-truongcongtoan.herokuapp.com/api/schedules/${doctorid}/${date}`;
  return axios.get(url);
}

export  {useFetch,handleLoginAPI,deleteUser,editUser
  ,editMarkdown,getDetailInforDoctor,getScheduleByDoctorid
  ,deleteSchedule,getSchedulebyDate};