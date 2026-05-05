import { Caption, CustomNavLink, Title } from "../common/Design";
import { CiGrid41 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { CgProductHunt } from "react-icons/cg";
import { TbCurrencyDollar } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logout, RESET } from "../../redux/features/authSlice";
import { UseUserProfile } from "../../hooks/useUserProfile";
import { useEffect } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkClass =
    "flex items-center gap-3 py-3 px-3 rounded-md hover:bg-gray-100 transition text-sm md:text-base";

  
  const {user} = useSelector((state) => state.auth);

const {role , isLoggedIn} = UseUserProfile();

useEffect(() =>{
  if(isLoggedIn){
    dispatch(getUserProfile());
  }
} , [dispatch , isLoggedIn]);

if(!isLoggedIn) return <p>You need to login to access this page </p>


    const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="flex flex-col justify-between h-full">
      {/* Content scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.photo}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <Title level={5} className="text-md font-semibold text-center">{user.name}</Title>
          <Caption className="text-gray-500 text-sm text-center break-words">
           {user.email}
          </Caption>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <CustomNavLink
            href="/dashboard"
            isActive={location.pathname === "/dashboard"}
            className={linkClass}
          >
            <CiGrid41 size={20} />
            <span>Dashboard</span>
          </CustomNavLink>

          {(role === "seller" || role === "admin") && (
            <>
              <CustomNavLink
                href="/product"
                isActive={location.pathname === "/product"}
                className={linkClass}
              >
                <MdOutlineCategory size={20} />
                <span>My Products</span>
              </CustomNavLink>
              <CustomNavLink
                href="/add"
                isActive={location.pathname === "/add"}
                className={linkClass}
              >
                <FaPlusCircle size={20} />
                <span>Create Product</span>
              </CustomNavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <CustomNavLink
                href="/userlist"
                isActive={location.pathname === "/userlist"}
                className={linkClass}
              >
                <FiUser size={20} />
                <span>All Users</span>
              </CustomNavLink>
              <CustomNavLink
                href="/product/admin"
                isActive={location.pathname === "/product/admin"}
                className={linkClass}
              >
                <CgProductHunt size={20} />
                <span>All Product List</span>
              </CustomNavLink>
              <CustomNavLink
                href="/category"
                isActive={location.pathname === "/category"}
                className={linkClass}
              >
                <MdOutlineCategory size={20} />
                <span>Categories</span>
              </CustomNavLink>
              <CustomNavLink
                href="/admin/income"
                isActive={location.pathname === "/admin/income"}
                className={linkClass}
              >
                <TbCurrencyDollar size={20} />
                <span>Income</span>
              </CustomNavLink>
            </>
          )}

          <CustomNavLink
            href="/winning-products"
            isActive={location.pathname === "/winning-products"}
            className={linkClass}
          >
            <RiAuctionLine size={20} />
            <span>Winning Bids</span>
          </CustomNavLink>
         
          <CustomNavLink
            href="/profile"
            isActive={location.pathname === "/profile"}
            className={linkClass}
          >
            <IoSettingsOutline size={20} />
            <span>Personal Profile</span>
          </CustomNavLink>
        </nav>
      </div>

      {/* Logout always fixed at bottom */}
      <div className="mt-4">
        <button
          onClick={logoutUser}
          className="flex items-center gap-3 bg-red-500 hover:bg-red-600 py-2 px-3 rounded-md text-white w-full"
        >
          <IoIosLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};


