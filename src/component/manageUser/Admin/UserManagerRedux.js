import React,{useState,useEffect, Fragment}  from 'react'
import './UserManagerRedux.css'
import { useFetch ,handleLoginAPI,deleteUser,editUser} from '../../CustomHooks/useFetch'
import AdminHeader from '../Header/AdminHeader';
import DoctorHeader from '../Header/DoctorHeader';
import { useSelector,useDispatch } from 'react-redux';
import allAction from '../../../redux/actions/allAction';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import TableManagerUser from './TableManagerUser';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalUser from './modalUser';

import {CRUD_ACTION, USER_ROLE } from '../../../redux/constant'

import LoadingPage from '../../CustomHooks/LoadingPage/LoadingPage';


const UserManagerRedux = () => {

    var url_Gender='http://localhost:8080/api/allcode/gender';
    var url_Position= 'http://localhost:8080/api/allcode/position';
    var url_Roles= 'http://localhost:8080/api/allcode/role';
    var url_Users="http://localhost:8080/api/users";
    var url_OutStandingDoctor = "http://localhost:8080/api/users/0/6";
    var url_doctor = 'http://localhost:8080/api/users/doctors'; 
    var url_Price = "http://localhost:8080/api/allcode/PRICE";
    var url_Payment = "http://localhost:8080/api/allcode/PAYMENT";
    var url_Province = "http://localhost:8080/api/allcode/PROVINCE";

    //fetch data 
    const { data:gender } = useFetch(url_Gender);
    const {data:position} = useFetch(url_Position);
    const {data:role} = useFetch(url_Roles);
    const {data:userList} = useFetch(url_Users);
    const {data:outstandingDoctor} = useFetch(url_OutStandingDoctor);
    const { data:doctors } = useFetch(url_doctor);
    const { data:prices } = useFetch(url_Price);
    const {data:payments} =  useFetch(url_Payment);
    const {data:provinces} =  useFetch(url_Province);

    //truyen data len redux
    const dispatch = useDispatch();
    //object de luu vao redux
    const allCode ={
        gender:[],
        position:[],
        role:[],
        price:[],
        payment:[],
        province:[]
       
    }
    const user={
        username:'',
        email:'',
        password:'',
        phonenumber:'',
        gender:'M',
        position:'P0',
        image:'',
        role:'R1',
        address:'',
        action:''
       
    }
   
   //delete user
   const removeUser = async (user) =>{
    
    try {
        let response = await deleteUser(url_Users,user.username)
        console.log(response)
        // refresh(); //reload lai trang
    } catch (error) {
        console.log(error)
    } 
}


    //lay ra data from redux
    const redux_AllCode = useSelector(state => state.allCode);

    const redux_user_Admin=useSelector(state=>state.admin);
 
    const redux_user_loginedUser=useSelector(state=>state.loginedUser);

   

     const [previewImgURL, setpreviewImgURL] = useState('');
     const [isOpen, setisOpen] = useState(false);
     const [avatarIn, setavatarIn] = useState('');
     const [isOpenModal, setIsOpenModal] = useState(false);
     const [userEditData, setuserEditData] = useState('');
     const [loading, setloading] = useState(false);


    const [state, setstate] = useState({
        email:'',
        username:'',
        password:'',
        phonenumber:'',
        gender:'M',
        position:'P0',
        image:'',
        role:'R1',
        address:'',
        action:CRUD_ACTION.CREATE

    });
  
    //loop to push data into redux of allcode
        useEffect(() => {
            allCode.gender=gender;
            allCode.role=role;
            allCode.position=position;
            allCode.price = prices;
            allCode.payment = payments;
            allCode.province =provinces;
            
            dispatch(allAction.allCodeAction.addAllCode(allCode));
            // dispatch(allAction.adminAction.addUserByAdmin(userList));
        }, [gender,role,position,prices,payments,provinces]);
// console.log("data thu duoc la ",redux_AllCode );

        useEffect(() => {
            if (userList && doctors && outstandingDoctor) {
                dispatch(allAction.adminAction.addUserByAdmin(userList));
                
                dispatch(allAction.addAllDoctor.addAllDoctor(doctors));
                dispatch(allAction.addOutStandingDoctors.addOutStandingDoctors(outstandingDoctor));

                setloading(true);
            }

        }, [userList,doctors,outstandingDoctor]);
      
        //onchange input
    const onChangeInput = (event,id) =>{

        let copyState={...state};
        copyState[id] = event.target.value;
        setstate({...copyState});
    }
    //check validate
    const checkValidnput = () =>{
      let isValid = true;
        let arrCheck = ['username','email','password','phonenumber','gender','position','role','address'];
        for (let index = 0; index < arrCheck.length; index++) {
            const element = arrCheck[index];
             if (!state[element]) {
                alert("Không được bỏ trống ô : "+element +" !")
                // toast.error("Dữ liệu không được bỏ trống !")
                isValid = false;
                break;
            }
         }
        return isValid;
    }
  
      //create new user
      const createNewUser =async (data) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        try {
            let response = await handleLoginAPI(url_Users,data);
             console.log("response" , response)
            
        } catch (error) {
            // alert("username bạn vừa nhập đã có trong danh sách. Bạn vui lòng thực hiện lại !")
            console.log(error)
        }
    }
    //function update user
    const updateUser = (data) =>{    
         handleAddUser();
        var index = userList.indexOf(data);
        // console.log("index la " ,index)
        setuserEditData(data);
        if (index > -1) {
            
            redux_user_Admin.listUsers && redux_user_Admin.listUsers.length >0
            &&redux_user_Admin.listUsers.map( (item) =>{
                
              if (item.username === data.username) {
                
               setstate({
               email:item.email,
               username:item.username,
               password:item.password,
               phonenumber:item.phonenumber,
               gender:item.gender,
               position:item.position,
               image:item.image,
               role:item.role,
               address:item.address,
               action:CRUD_ACTION.EDIT
           });
        
          dispatch(allAction.adminAction.addUserFromTable(state));

               }
           })
        }
}

    //handle onchange
    const handleOnchangeImage =(event) =>{
        let file = event.target.files[0];
       if (file) {
        let objectUrl = URL .createObjectURL(file);
        setpreviewImgURL(objectUrl);
        setavatarIn(file);
       }
    }

    //handle open zoom image
    const openPreviewImg =() =>{
        if (!previewImgURL ) {
            return;
        }
        setisOpen(true);
    }
    //close zoom anh
    const closePrviewImg =() =>{
        setisOpen(false);
    }
    //open modal
    const handleAddUser = () =>{
       
        setIsOpenModal(!isOpenModal);
       
     }

    //close modal
     const toggleUserModal = () =>{
        setIsOpenModal(!isOpenModal);
    }  


    const [baseImage, setBaseImage] = useState("");
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const checkUserRole = () =>{
          if (redux_user_loginedUser && redux_user_loginedUser.user&&redux_user_loginedUser.user.role) {
                let role = redux_user_loginedUser.user.role;
                if (role === USER_ROLE.ADMIN) {
                    // console.log("admin")
                    return <AdminHeader/>
                }else if(role === USER_ROLE.DOCTOR){
                    // console.log("doctor");
                    return <DoctorHeader/>
                }else{
                    // console.log("patient")
                    return <AdminHeader/>
                }
          }
      }
      
    return (
   
        <div className='user-redux-container'>    
        {
            // loading?

            <React.Fragment>
            <ModalUser
             isOpen = {isOpenModal}
             toggleCloseModel = {toggleUserModal}
            //  createNewUser ={handleSave}
             userList ={userList}
             doctors={doctors}
             redux_AllCode = {redux_AllCode}
             />
            {
            checkUserRole()
            }
           
            <div className='user-manager-redux-title'>
            
                Quản lý người dùng 
            </div>
            <div className='user-manager-redux-body'>
         
            <div className='container'>

                 <div className='mx-1'>
                        <button 
                        className='btn btn-primary px-3' 
                        onClick={() => handleAddUser()}
                        >
                        <i className="fas fa-plus"></i>Thêm người dùng</button>
                </div>

                    <div className='row'>

                    <div className='col-12'>
                  
                      { 
                      loading?
                       <TableManagerUser 
                          removeUser = {removeUser} 
                          userList = {userList}  
                          editOneUser = {updateUser}
                          action={state.action}
                         
                          />   :<span style={{display:'flex',justifyContent:'center'}}>Đang tải dữ liệu bảng ...</span> }
                      
                     </div>
                
             
              </div>
            </div>
            

            </div>
          {/* {
              isOpen===true &&
              <Lightbox
              mainSrc={previewImgURL}
              onCloseRequest={() => closePrviewImg()}
            />
          } */}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
            </React.Fragment>
            // :<LoadingPage/>
        }
        </div>

    )
}

export default UserManagerRedux;
