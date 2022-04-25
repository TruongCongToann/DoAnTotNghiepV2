


import { BrowserRouter as Router, Route ,Redirect} from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from './component/Home/Home';
import Login from './component/Login/Login';
import {path} from './Route/Route'

import { Scrollbars } from 'react-custom-scrollbars';
import UserManagerRedux from "./component/manageUser/Admin/UserManagerRedux";
import DoctorManageRedux from "./component/manageUser/Admin/manageDoctor/DoctorManageRedux";
import LoadingPage from "./component/CustomHooks/LoadingPage/LoadingPage";
import LoginGoogle from "./component/LoginSNS/LoginGoogle/LoginGoogle";
import DetailDoctor from "./component/Home/Patient/Doctor/DetailDoctor/DetailDoctor";
import ManageSchedule from "./component/Home/Doctor/manageSchedule";

const App =() => {
   //connect voi redux , lay ra du lieu
   const currentUser = useSelector(state => state.loginedUser);
   const role = currentUser.role;
   const isLogin = currentUser.loggedIn;

  const linkToDirect = isLogin? role==="admin"?'/manager-users-redux':'/':'/login';

  

  return (
         // scrollbars dung de tao thanh cuon
            <Scrollbars style={{ width: "100%", height:"100vh" }}>

               <Router>
 
                   <Route path={path.LOGIN}  component={Login}/>
                  <Route path={path.HOME} exact component={Home}/>
                  <Route path={path.MANAGE_USER} component={UserManagerRedux}/>
                  <Route path={path.MANAGE_DOCTOR_REDUX} component={DoctorManageRedux}/>
                  <Route path={path.LOADING} component={LoadingPage}/>
                  <Route path={path.LOGIN_GOOGLE} component={LoginGoogle}/>
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/>
                  <Route path={path.MANAGE_SCHEDULE} component={ManageSchedule}/>
                 {/* <Redirect to = {linkToDirect}/>  */}
    
                </Router>
          
           </Scrollbars>
                       


  );
}

export default App;
