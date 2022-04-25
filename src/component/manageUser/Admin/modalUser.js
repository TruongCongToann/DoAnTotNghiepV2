import React ,{useState,useEffect} from 'react'
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import './modalUser.css';
import { toast,ToastContainer } from 'react-toastify';
import {CRUD_ACTION } from '../../../redux/constant'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { useFetch ,handleLoginAPI,deleteUser,editUser} from '../../CustomHooks/useFetch'
import { useSelector,useDispatch } from 'react-redux';
import allAction from '../../../redux/actions/allAction';
// const sharp = require('sharp');

const ModalUser = (props) => {
    const toggle =() =>{
         resetState();
         props.toggleCloseModel();

    }
    const dispatch = useDispatch();

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
        action:"CREATE",
        hovaten:''

    });
    
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
        action:CRUD_ACTION.CREATE,
        hovaten:''
       
    }

    const [previewImgURL, setpreviewImgURL] = useState('');
    const [avatarIn, setavatarIn] = useState('');
    const [isOpen, setisOpen] = useState(false);
    const [userEditData, setuserEditData] = useState('');

    var url = "https://api-truongcongtoan.herokuapp.com/api/users";

    const redux_user_Admin=useSelector(state=>state.admin);
    // console.log("du lieu lay duoc tu redux la ",redux_user_Admin.listUsers)
    //fuction lay du lieu input
        // console.log("api data thu duioc la :" ,redux_user_Admin) 


    const onChangeInput = (event,id) =>{

        let copyState={...state};
        copyState[id] = event.target.value;
        setstate({...copyState});
    }
     //function update user
   
    useEffect(() => {
        if (props.userList != null) {
            if (redux_user_Admin.user.action === "CREATE") {
            }
            else{
                // console.log("du lieu thu duoc tu api ",redux_user_Admin.user)
                setpreviewImgURL(redux_user_Admin.user.image)
                   setstate({
                    email:redux_user_Admin.user.email,
                    username:redux_user_Admin.user.username,
                    password:redux_user_Admin.user.password,
                    phonenumber:redux_user_Admin.user.phonenumber,
                    gender:redux_user_Admin.user.gender,
                    position:redux_user_Admin.user.position,

                    image:redux_user_Admin.user.image,

                    role:redux_user_Admin.user.role,
                    address:redux_user_Admin.user.address,
                    action:CRUD_ACTION.EDIT,
                    hovaten:redux_user_Admin.user.hovaten
                 });

            }
      
        }   
    }, [redux_user_Admin.user])

    //function add new user
    const handleSave  =() =>{
        
        let action = state.action;
        // console.log("gia tri cua image path la",previewImgURL)
        //   console.log("gia tri cua action la ",action)
        try {
         
          if (checkValidnput() ===true) {
           if(action === CRUD_ACTION.CREATE){
              if(checkDump()===true )
                   { user.username= state.username;
                    user.email=state.email;
                    user.password=state.password;
                    user.phonenumber=state.phonenumber;
                    user.gender=state.gender;
                    user.position=state.position;
                    user.role=state.role;
                    user.address=state.address;
                    user.image= previewImgURL;
                    // user.action = CRUD_ACTION.CREATE;
                    user.hovaten = state.hovaten;
    
                   props.userList.push(user);
                  
                   console.log("user is ",user)

                    dispatch(allAction.adminAction.addUserByAdmin( props.userList));
                    createNewUser(user);
                   

                    setstate({
                        email:'',
                        username:'',
                        password:'',
                        phonenumber:'',
                        gender:props.redux_AllCode.genders &&props.redux_AllCode.genders.length>0?props.redux_AllCode.genders[0].key:'',
                        position:props.redux_AllCode.position &&props.redux_AllCode.position.length>0?props.redux_AllCode.position[0].key:'',
                         image:'',
                         role:props.redux_AllCode.roles &&props.redux_AllCode.roles.length>0?props.redux_AllCode.roles[0].key:'',
                        address:'',
                        action:CRUD_ACTION.CREATE,
                        hovaten:''
                    });
                    
                    setpreviewImgURL('')
                    toast.success("Thêm người dùng thành công !");
                    toggle();
                    // window.location.reload(); 
                    setTimeout(() => window.location.reload(), 2000); 
                }
            }
            if (action === CRUD_ACTION.EDIT) {

             let userNameArr = [];
            props.userList.map(item =>{
                userNameArr.push(item.username);
            })

            //  console.log("list userr la ",props.userList)
                var index = userNameArr.indexOf(redux_user_Admin.user.username);
                if (index > -1) {

                    redux_user_Admin.listUsers && redux_user_Admin.listUsers.length >0
                        &&redux_user_Admin.listUsers.map( (item) =>{
                            if (item.username === redux_user_Admin.user.username) {
                            
                        redux_user_Admin.listUsers[index].username =   redux_user_Admin.listUsers[index].username;
                        redux_user_Admin.listUsers[index].email=state.email;
                        redux_user_Admin.listUsers[index].password=state.password;
                        redux_user_Admin.listUsers[index].phonenumber=state.phonenumber;
                        redux_user_Admin.listUsers[index].gender=state.gender;
                        redux_user_Admin.listUsers[index].position=state.position;
                        redux_user_Admin.listUsers[index].role=state.role;
                        redux_user_Admin.listUsers[index].address=state.address;
                        redux_user_Admin.listUsers[index].image= previewImgURL;
                        redux_user_Admin.listUsers[index].action = CRUD_ACTION.CREATE;
                        redux_user_Admin.listUsers[index].hovaten = state.hovaten;
                            }
                        })
                         console.log("nguoi duoc update la ",redux_user_Admin.listUsers[index]);
                       editUser(url,redux_user_Admin.listUsers[index]);

                    }

                    resetState();
        
                    setpreviewImgURL('')
                    toast.success("Cập nhật người dùng thành công !");
                    
                    toggle();
                    // window.location.reload(); 
                    setTimeout(() => window.location.reload(), 2000);


                }
            }
        } catch (error) {
            // toast.error("Username này đã tồn tại!");
            console.log(error)
        }

    }
    const resetState = () =>{
        setstate({
            email:'',
            username:'',
            password:'',
            phonenumber:'',
            gender:props.redux_AllCode.genders &&props.redux_AllCode.genders.length>0?props.redux_AllCode.genders[0].key:'',
            position:props.redux_AllCode.position &&props.redux_AllCode.position.length>0?props.redux_AllCode.position[0].key:'',
             image:'',
             role:props.redux_AllCode.roles &&props.redux_AllCode.roles.length>0?props.redux_AllCode.roles[0].key:'',
            address:'',
            action:CRUD_ACTION.CREATE,
            hovaten:''
        });
    }
    //create new user
    const createNewUser =async (data) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        try {
          await handleLoginAPI(url,data);
           
        } catch (error) {
            // alert("username bạn vừa nhập đã có trong danh sách. Bạn vui lòng thực hiện lại !")
            console.log(error)
        }
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

       //chekc dmplicate
    const checkDump =() =>{
        let isDump = true;
        props.userList.map((item) =>{
            if (item.username === state.username) {
                isDump = false;
                toast.error("Username này đã tồn tại!")
            }else{
                console.log("khong trung nhau")
            }
        });
        // console.log("gia tri cua dump",isDump)
        return isDump;
    }
    const [baseImage, setBaseImage] = useState("");
    // const [resizebase64,setResizeBase64] = useState("");
    //handle onchange
    const handleOnchangeImage =async (event) =>{
        let file = event.target.files[0];
       if (file) {
        let objectUrl = URL .createObjectURL(file);
        setavatarIn(file);
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        // setpreviewImgURL(base64);

    console.log("anh truoc khi resize la ",base64);
    const resized = await reduce_image_file_size(base64);
     setpreviewImgURL(resized)
    
      
       }
    }
    // console.log("URL sau khi resize la ",previewImgURL);
    //convert base 64
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

      async function reduce_image_file_size(base64Str, MAX_WIDTH = 200, MAX_HEIGHT = 200) {
        let resized_base64 = await new Promise((resolve) => {
            let img = new Image()
            img.src = base64Str
            img.onload = () => {
                let canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width
                        width = MAX_WIDTH
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height
                        height = MAX_HEIGHT
                    }
                }
                canvas.width = width
                canvas.height = height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL()) // this will return base64 image results after resize
            }
        });
        return resized_base64;
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
    return (
        <div>
                
                    <Modal 
                    isOpen={props.isOpen}
                    toggle={() => {toggle()}} 
                    className={'modal-user-container'} 
                    size='lg'
                    >

                    <ModalHeader toggle={()=>{toggle()}}>
                    Thêm mới người dùng 
                    </ModalHeader>
                    
                    <ModalBody>
                 
                    <div className='modal-user-body '>
                  
                 
                    <div className='col-3'>
                        <label>Tên đăng nhập</label>
                        <input className='form-control'type="text"
                        value = {state.username}
                        onChange = {(event)=>{onChangeInput(event,'username')}}
                        disabled={state.action===CRUD_ACTION.EDIT?true:false}

                        />
                    </div>
                   
                    <div className='col-3'>
                        <label>Email</label>
                        <input className='form-control' type="text"
                          value = {state.email}
                          onChange = {(event)=>{onChangeInput(event,'email')}}
                        />
                    </div>
                    <div className='col-3'>
                        <label>Mật khẩu</label>
                        <input  className='form-control'type="password"
                          value = {state.password}
                          onChange = {(event)=>{onChangeInput(event,'password')}}
                          disabled={state.action===CRUD_ACTION.EDIT?true:false}
                          />
                    </div>
                    <div className='col-3'>
                        <label>Số điện thoại</label>
                        <input  className='form-control'type="text"
                          value = {state.phonenumber}
                          
                          onChange = {(event)=>{onChangeInput(event,'phonenumber')}}
                        />
                    </div>
                    <div className='col-3'>
                        <label>Họ và tên</label>
                        <input className='form-control' type="text"
                          value = {state.hovaten}
                          onChange = {(event)=>{onChangeInput(event,'hovaten')}}
                        />
                    </div>
                    <div className='col-3'>
                        <label>Giới tính</label>
                        <select className='form-select' 
                        onChange={(event) =>{onChangeInput(event,'gender')}}
                        value={state.gender}
                        >    
                            {props.redux_AllCode.genders&& props.redux_AllCode.genders.length >0 ? props.redux_AllCode.genders.map((item,index) =>{
                                return(
                                    <option key={index} value={item.key}>{item.valuevi}</option>
                                );
                                }) :''
                            }
                            
                        </select>
                    </div>   
                    <div className='col-3'>
                        <label>Vị trí</label>
                        <select className='form-select'
                        onChange={(event) =>{onChangeInput(event,'position')}}
                            value={state.position}
                        >
                          
                        {props.redux_AllCode.position&& props.redux_AllCode.position.length >0 && 
                            props.redux_AllCode.position.map((item,index) =>{
                                return(
                                    <option  key={index} value={item.key}>{item.valuevi}</option>
                                );
                            })
                         }
                        </select>
                    </div>
                    <div className='col-3'>
                        <label>RoleID</label>
                        <select className='form-select'
                         onChange={(event) =>{onChangeInput(event,'role')}}
                         value={state.role}
                        >
                        {props.redux_AllCode.roles&& props.redux_AllCode.roles.length >0 && 
                            props.redux_AllCode.roles.map((item,index) =>{
                                return(
                                    <option  key={index} value={item.key}>{item.valuevi}</option>
                              );
                            })
                        } 
                        </select>
                        </div>

                        <div className='col-12'>
                                <label>Địa chỉ</label>
                                <input  className='form-control'type="text"
                                  value = {state.address}
                                  onChange = {(event)=>{onChangeInput(event,'address')}}
                                />
                        </div>

                        <div className='preview-img-container'>
                            <input id='preview-img' 
                            type="file" 
                            accept=".jpg, .png, .jpeg, .svg" 
                            hidden
                             onChange={(event) =>{handleOnchangeImage(event)}}
                            />
                            <label className='label-upload' htmlFor='preview-img'>Tải ảnh 
                                  <i className="fas fa-upload"></i>
                            </label>
                            <div className='preview-image' 
                            style={{backgroundImage:`url(${previewImgURL})`}}
                            onClick={() => openPreviewImg()}
                            >     
                            </div>
                        </div>
                          {/* {
                        isOpen===true &&
                        <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => closePrviewImg()}
                        />
                        } */}
                        
                     </div>      
                    
                   
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        
                        onClick={()=>{handleSave()}}
                    >
                        Lưu
                    </Button>
                   
                    <Button onClick={()=>{toggle()}}>
                        Hủy
                    </Button>
                    </ModalFooter>
                </Modal>     
        </div>
        
    );
}

export default ModalUser
