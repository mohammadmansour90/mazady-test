import { Body, Caption, Container, PrimaryButton, ProfileCard, Title } from "../../routes/index";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePropertySafety } from "react-icons/ai";
import PropTypes from "prop-types";
import { CiCirclePlus } from "react-icons/ci";

export const User1 = "https://cdn-icons-png.flaticon.com/128/6997/6997662.png";
export const User2 = "https://cdn-icons-png.flaticon.com/128/236/236832.png";
export const User3 = "https://cdn-icons-png.flaticon.com/128/236/236831.png";
export const User4 = "https://cdn-icons-png.flaticon.com/128/1154/1154448.png";

export const Hero = () => {
  return (
    <>
      <section className="hero bg-primary py-8">
        <Container className="flex items-center justify-between md:flex-row flex-col">
          {/* Left Text Section */}
          <div className="w-full md:w-1/2 text-white pr-12 mb-40">
            <Title level={3} className="text-white mt-30 ">
              Buy, Sell & Share Student Essentials at Amman Arab University
            </Title>
            <Body className="leading-7 text-gray-200 my-8">
             Mazady AAU is your trusted campus marketplace made for Amman Arab University students. 
Easily buy and sell textbooks, electronics, dorm essentials, and student projects within 
a secure and transparent community. Save money, support your classmates, and discover 
exclusive deals—all inside AAU. Whether you're a buyer or a seller, this is your student hub.

            </Body>
            <SearchBox />
            <div className="flex items-center gap-8 my-8">
              <div>
                <Title level={4} className=" text-white">
                  300+
                </Title>
                <Body className="leading-7 text-gray-200">Total Product</Body>
              </div>
              <div>
                <Title level={4} className=" text-white">
                  3000
                </Title>
                <Body className="leading-7 text-gray-200">Total Auction</Body>
              </div>
              <div>
                <Title level={4} className=" text-white">
                  35+
                </Title>
                <Body className="leading-7 text-gray-200">Total Category</Body>
              </div>
            </div>
          </div>

         {/* Right Images + Floating Cards */}
<div className="my-16 relative py-16 flex justify-center">
  {/* Main Hero Image */}
  <img
    src="/images/common/1_0b10dc40.jpg"
    alt=""
    className="w-[500px] h-[420px] object-contain rounded-xl"
  />

  {/* Floating Box 1 */}
  <div className="horiz-move absolute top-5 left-5">
    <Box title="Proof of quality" desc="Every item checked" />
  </div>

  {/* Floating Box 2 */}
  <div className="horiz-move absolute bottom-10 right-5">
    <Box title="Safe and secure" desc="Your data protected" />
  </div>

  {/* Floating Happy Students Card */}
  <div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl 
                  absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[320px]">
    <div>
      <h3 className="text-lg font-semibold">3K Happy Students</h3>
    </div>
    <div className="flex items-center">
      <ProfileCard className="border-2 border-white">
        <img src={User1} alt="User1" className="w-full h-full object-cover" />
      </ProfileCard>
      <ProfileCard className="border-2 border-white -ml-4">
        <img src={User2} alt="User2" className="w-full h-full object-cover" />
      </ProfileCard>
      <ProfileCard className="border-2 border-white -ml-4">
        <img src={User3} alt="User3" className="w-full h-full object-cover" />
      </ProfileCard>
      <ProfileCard className="border-2 border-white -ml-4">
        <img src={User4} alt="User4" className="w-full h-full object-cover" />
      </ProfileCard>
      <ProfileCard className="border-2 border-white -ml-4">
        <CiCirclePlus size={27} />
      </ProfileCard>
    </div>
  </div>
</div>

        </Container>
      </section>

      {/* White Rounded Divider */}
      <div className="bg-white w-full py-16 -mt-10 rounded-t-[40px]"></div>
    </>
  );
};

/* Search Box Component */
const SearchBox = () => {
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-800 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
          <IoIosSearch color="black" size={25} />
        </div>
        <input
          type="search"
          id="default-search"
          className="block shadow-md w-full p-6 ps-16 text-sm text-gray-800 rounded-full bg-gray-50 outline-none"
          placeholder="Search product..."
        />
        <PrimaryButton className="absolute end-2.5 bottom-2">
          Search
        </PrimaryButton>
      </div>
    </form>
  );
};

/* Floating Box Component */
const Box = ({ title, desc }) => {
  return (
    <div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl w-auto">
      <div className="w-14 h-14 bg-green_100 flex items-center justify-center rounded-full">
        <AiOutlinePropertySafety size={27} className="text-primary" />
      </div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <Caption className="text-sm text-gray-600">{desc}</Caption>
      </div>
    </div>
  );
};

Box.propTypes = {
  title: PropTypes.any,
  desc: PropTypes.any,
};
