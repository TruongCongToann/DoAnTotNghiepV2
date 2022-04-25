import React from 'react'
import './Header.css'
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,
    NavLink,UncontrolledDropdown,NavItem,DropdownToggle,DropdownMenu,DropdownItem,Navigator
} from 'reactstrap';
import { useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import allAction from '../../../redux/actions/allAction';
import { useFetch ,editUser} from '../../CustomHooks/useFetch';

const DoctorHeader = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.loginedUser);

    // console.log("user lay tu redux la ",currentUser)

    //goi api lay data 
    var url_Users="https://api-truongcongtoan.herokuapp.com/api/users";

    const redirectHome =() =>{

        history.push("/")
    }

    //function logout
    const handleLogOut = () =>{
    
        // checkLogOut(user);

        dispatch(allAction.loginUser.logOut());
        history.push('/login')
    }
  

    const handleManageSchedule = () =>{
        history.push('/manage-schedule')

    }

    return (
        <div className='header-container'>
            <div className='header-title'>
            <Navbar
                    color="light"
                    expand="md"
                    light
                >
                    <NavbarBrand className='nav-home' onClick={() => redirectHome()}>
                    Home
                    </NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck(){}} />
                    <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                  
                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle
                            caret
                            nav
                        >
                            Người dùng
                        </DropdownToggle>
                        <DropdownMenu >
                        {/* <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý người dùng
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageDoctor()}}>
                            Quản lý thông tin bác sỹ
                            </DropdownItem> */}
                          
                            <DropdownItem onClick={() =>{handleManageSchedule()}}>
                            Quản lý kế hoạch khám bệnh
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
{/* 
                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Phòng khám
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý phòng khám
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý bác sỹ
                            </DropdownItem>
                         
                        </DropdownMenu>
                        </UncontrolledDropdown> */}

                        {/* <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Chuyên khoa
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý chuyên khoa
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý bác sỹ
                            </DropdownItem>
                           
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Cẩm nang
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem onClick={() =>{handlerManagerUser()}} >
                            Quản lý cẩm nang
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý bác sỹ
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                   
                    </Collapse>
             </Navbar>
        </div>
  
            <div className='header-logout'>
            <span className='welcome'>Xin chào : {currentUser&& currentUser.user.hovaten ?currentUser.user.hovaten:''}</span>
                <button className='btn-logout'onClick={() =>handleLogOut()}  title='Đăng xuất'>
                <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default DoctorHeader
