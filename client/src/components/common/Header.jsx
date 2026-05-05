/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// design
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from "./Design";
import { menulists } from "../../utils/data";
import { ShowOnLogin, ShowOnLogout } from "../../utils/HiddenLink";
import { useDispatch, useSelector } from "react-redux";
import { UseUserProfile } from "../../hooks/useUserProfile";
import { getUserProfile, selectIsLoggedIn } from "../../redux/features/authSlice";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const menuRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const {user} = useSelector((state) => state.auth);

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      // scrolling down
      setShowHeader(false);
    } else {
      // scrolling up
      setShowHeader(true);
    }
    setLastScrollY(window.scrollY);
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutside);
    window.addEventListener("scroll", controlHeader);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  const isHomePage = location.pathname === "/";
  
   const {role} = UseUserProfile();
   const dispatch = useDispatch();


  useEffect(() => {
  if (isLoggedIn && !user) {   // ✅ only fetch if logged in & no user loaded
    dispatch(getUserProfile());
  }
}, [dispatch, isLoggedIn, user]);



  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 
        ${showHeader ? "translate-y-0" : "-translate-y-full"} 
        ${isHomePage ? `header py-1 bg-primary ${isScrolled ? "scrolled" : ""}` : `header bg-white shadow-s1 ${isScrolled ? "scrolled" : ""}`}
        `}
      >
        <Container>
          <nav className="p-4 flex justify-between items-center relative">
            <div className="flex items-center gap-14">
              {/* Logo */}
              <div>
                <img src="/images/common/newLogo.jpg" alt="LogoImg" className="h-25 w-40 rounded-2xl" />
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center justify-between gap-8">
                {menulists.map((list) => (
                  <li key={list.id} className="capitalize list-none">
                    <CustomNavLinkList
                      href={list.path}
                      isActive={location.pathname === list.path}
                      className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`}
                    >
                      {list.link}
                    </CustomNavLinkList>
                  </li>
                ))}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-8 icons">
              <div className="hidden lg:flex lg:items-center lg:gap-8">
                <IoSearchOutline size={23} className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`} />
                {isLoggedIn && role === "buyer" && (

                  <ShowOnLogin>
                  <CustomNavLink href="/seller/login" className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>
                    Become a Seller
                  </CustomNavLink>
                  </ShowOnLogin>
                )}

                <ShowOnLogout>
                <CustomNavLink href="/login" className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>
                  Sign in
                </CustomNavLink>
                <CustomNavLink
                  href="/register"
                  className={`${!isHomePage || isScrolled ? "bg-green" : "bg-white"} px-8 py-2 rounded-full text-primary shadow-md`}
                >
                  Join
                </CustomNavLink>
                </ShowOnLogout>
                <ShowOnLogin>
                <CustomNavLink href="/dashboard">
                  <ProfileCard>
                    <img src={user?.photo} alt="" className="w-full h-full object-cover" />
                  </ProfileCard>
                </CustomNavLink>
                </ShowOnLogin>
              </div>

              {/* Mobile Menu Icon */}
              <div
                className={`icon flex items-center justify-center gap-6 ${
                  isScrolled || !isHomePage ? "text-primary" : "text-white"
                }`}
              >
                <button
                  onClick={toggleMenu}
                  className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none"
                >
                  {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
              </div>
            </div>

            {/* Responsive Menu */}
            <div
              ref={menuRef}
              className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${
                isOpen ? "open" : "closed"
              }`}
            >
              {menulists.map((list) => (
                <li key={list.id} className="uppercase list-none">
                  <CustomNavLink className="text-white">{list.link}</CustomNavLink>
                </li>
              ))}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
