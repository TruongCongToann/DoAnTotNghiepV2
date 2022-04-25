import React ,{useState} from 'react'
import './TableManagerUser.css'
import { useSelector,useDispatch } from 'react-redux';
import allAction from '../../../redux/actions/allAction';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../../Pagination/Pagination';
import {CRUD_ACTION } from '../../../redux/constant'

const TableManagerUser = (props) => {
    const dispatch = useDispatch();

    const [currentPage, setcurrentPage] = useState(1);
    const [userPerPage, setuserPerPage] = useState(4);

    //get index of last user
    const indexOfLastUser = currentPage*userPerPage;
    const indexOfFirstUser = indexOfLastUser-userPerPage;

    const redux_user_load_Admin =useSelector(state=>state.admin);
    //   console.log("user admin la ",redux_user_load_Admin.listUsers)
            let currentUser = [];
            let totalUsers = 0;
            if (redux_user_load_Admin.listUsers&&redux_user_load_Admin.listUsers.length>0) {
                currentUser =   redux_user_load_Admin.listUsers.slice(indexOfFirstUser,indexOfLastUser);
                totalUsers = redux_user_load_Admin.listUsers.length;
            }
            // console.log("danh sach cac current user ",currentUser)

    var count = 1;
     //delete user
   const handleDelete =  (input) =>{
   // props.removeUser(item);
          var index = props.userList.indexOf(input);
          if (index > -1) {
            props.userList.splice(index, 1);
            toast.success("Đã xóa người dùng !");
            dispatch(allAction.adminAction.addUserByAdmin(props.userList));
            props.removeUser(input);
            window.location.reload(); 

          }
    }

        //edit user 
        const HandleEdit = (input) =>{
     
         props.editOneUser(input);

         console.log("input la ",input)

        dispatch(allAction.adminAction.addUserFromTable({
   
                    username:input.username,
                    email:input.email,
                    password:input.password,
                    phonenumber:input.phonenumber,
                    gender:input.gender,
                    position:input.position,
                    image:input.image,
                    role:input.role,
                    address:input.address,
                    action:CRUD_ACTION.EDIT,
                    hovaten:input.hovaten,
                    active:input.active ,
                    createat: input.createat,
                    updateat: input.updateat
                  
        }));
        // console.log("input la ",input)
        }
  // Change page
  const paginate = pageNumber => setcurrentPage(pageNumber);
       
  //format gender 
  const formatGender = (genderKey) =>{
      if(!genderKey) {return}else{
          if (genderKey === "M") {
              return 'Nam';
          }else if(genderKey === "F"){
            return 'Nữ';
          }else{
              return 'Khác';
          }
      }
  }
    return (
        <div className='admin-redux-container'>
            
                <table id = "TableManagerUser">
                    <thead>
                    <tr>
                        <th >Số thứ tự</th>
                        <th>Tên đăng nhập</th>
                        <th>email</th>
                        <th>Mật khẩu</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                  

            currentUser &&
            currentUser.length >0 &&
                currentUser.map((item,index) =>{
                         
                        return(
                            
                            <tr key={index}>
                                <td >{count++}</td>
                                <td >{item.username}</td>
                                <td >{item.email}</td>
                                <td >{item.password}</td>
                                <td >{item.address}</td>
                                <td >{item.phonenumber}</td>
                                <td >{formatGender(item.gender)}</td>
                                
                                <td>
                                <button className='btn-edit'>
                                    <i className="fas fa-pencil-alt"
                                    onClick = {() =>HandleEdit(item)}
                                    ></i>
                                </button>
                                    <button className='btn-delete'>
                                    <i className="fas fa-trash-alt" onClick={() => handleDelete(item)}></i>
                                 
                                </button>  
                               </td>
                            </tr>
                        );
                      
                    })
                }
                </tbody>
            </table>
            <Pagination userPerPage={userPerPage} 
            totalUsers={totalUsers}
            paginate={paginate}
            />

        </div>
    )
}

export default TableManagerUser
