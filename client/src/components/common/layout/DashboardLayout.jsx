import { useEffect } from "react";
import { UseUserProfile } from "../../../hooks/useUserProfile";
import { Sidebar } from "../../admin/Sidebar";
import { Container } from "../Design";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../../../redux/features/authSlice";

export const DashboardLayout = ({ children }) => {
  
  const {role , isLoggedIn} = UseUserProfile();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() =>{
    if(isLoggedIn){
      dispatch(getUserProfile());
    }

  } , [location , dispatch , isLoggedIn]);

  return (
    <div className="mt-32">
      <Container className="flex items-start">
        
        {/* Sidebar wrapper */}
        <div className="w-[25%] h-[calc(100vh-8rem)] bg-white shadow-s1 rounded-lg overflow-y-auto sticky top-32">
          <Sidebar role={role} />
        </div>

        {/* Main content */}
        <div className="w-[75%] px-5 ml-10 rounded-lg">
          {children}
        </div>
      </Container>
    </div>
  );
};
