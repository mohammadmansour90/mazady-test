import { Container, PrimaryButton, ProfileCard, Title } from "./Design";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      <footer className=" relative bg-primary py-16 mt-16">
        {isHomePage && <div className="bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0"></div>}

        <Container className={`${isHomePage ? "mt-45" : "mt-0"} flex flex-col md:flex-row justify-between gap-12 `}>
          <div className="w-full md:w-1/3 ">
            <img src="/images/common/newLogo.jpg" alt="" className="h-40 w-80 rounded-2xl"/>
            <br />
         
            <div className="bg-gray-300 h-[1px] my-8"></div>
            <Title level={5} className=" font-normal text-blue-50">Get The Latest Mazady Updates</Title>
            <div className="flex items-center justify-between mt-5">
              <input type="text" placeholder="Enter your email" className="w-full h-full p-3.5 py-[15px] text-sm border-none outline-none rounded-l-md text-blue-50" />
              <PrimaryButton className="rounded-none py-3.5 px-8 text-sm hover:bg-indigo-800 rounded-r-md">Submit</PrimaryButton>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-2/3">
            <div>
              <Title level={5} className="text-white font-normal">
                Auction Categories
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <p>Watches</p>
                <p>Electronics</p>
                <p>Study Materials</p>
                <p>Furniture</p>
                <p>Teaching Tools</p>
                <p>Science Equipment</p>
              </ul>
            </div>
            <div>
              <Title level={5} className="text-white font-normal">
                About Us
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <p>About Mazady</p>
                <p>Affiliates</p>
                <p>Our Mission</p>
                <p>Our Vision</p>

              </ul>
            </div>
            <div>
              <Title level={5} className="text-white font-normal">
                We are Here to Help
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <p>Your Account</p>
                <p>Contact Us</p>
                <p>Help & FAQ</p>
              </ul>
            </div>
            <div>
              <Title level={5} className="text-white font-normal">
                Follow Us
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <div className="flex items-center gap-2">
                  <FiPhoneOutgoing size={19} />
                  <span>(962) 798-526423</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineAttachEmail size={22} />
                  <span>help@mazady.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoLocationOutline size={22} />
                  <span>Amman, Jordan</span>
                </div>
              </ul>
        <div className="flex items-center mt-5 gap-4">
  <div className="bg-white w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <AiOutlineYoutube size={22} />
  </div>
  <div className="bg-white w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <FaInstagram size={22} />
  </div>
  <div className="bg-white w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <CiTwitter size={22} />
  </div>
  <div className="bg-white w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <CiLinkedin size={22} />
  </div>
</div>




            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};