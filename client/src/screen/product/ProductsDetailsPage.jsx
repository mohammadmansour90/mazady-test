import { Body, Caption, Container, Title } from "../../routes";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { commonClassNameOfInput } from "../../components/common/Design";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { productlists } from "../../utils/data";

export const ProductsDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const { id } = useParams();
  const product = productlists.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-8">Product not found</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section className="pt-24 px-8 mt-20">
        <Container>
          <div className="flex justify-between gap-8">
            {/* Left Side: Product Image */}
            <div className="w-1/2">
              <div className="h-[70vh]">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="w-1/2">
              <Title level={2} className="capitalize">
                {product?.title}
              </Title>
              <div className="flex gap-5">
                <div className="flex text-green">
                  <IoIosStar size={20} />
                  <IoIosStar size={20} />
                  <IoIosStar size={20} />
                  <IoIosStarHalf size={20} />
                  <IoIosStarOutline size={20} />
                </div>
                <Caption>(2 customer reviews)</Caption>
              </div>
              <br />
              <Body>{product.description}</Body>
              <br />
              <Caption>Item condition: New</Caption>
              <br />
              <Caption>Item Verified: Yes</Caption>
              <br />
              <Caption>Time left:</Caption>
              <br />

              {/* Countdown placeholders */}
              <div className="flex gap-8 text-center">
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>149</Title>
                  <Caption>Days</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>12</Title>
                  <Caption>Hours</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>36</Title>
                  <Caption>Minutes</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>51</Title>
                  <Caption>Seconds</Caption>
                </div>
              </div>
              <br />

              <Title level={5} className="flex items-center gap-2">
                Auction ends:
                <Caption>December 31, 2024 12:00 am</Caption>
              </Title>
              <Title level={5} className="flex items-center gap-2 my-5">
                Timezone: <Caption>UTC 0</Caption>
              </Title>

              {/* Dynamic Price & Current Bid */}
              <Title level={5} className="flex items-center gap-2 my-5">
                Price: <Caption>${product.price}</Caption>
              </Title>
              <Title level={5} className="flex items-center gap-2 mb-10">
                Current bid:
                <Caption className="text-3xl">${product.bprice}</Caption>
              </Title>

              {/* Bid Input */}
              <div className="p-5 px-10 shadow-s3 py-8">
                <form className="flex gap-3 justify-between">
                  <input
                    className={commonClassNameOfInput}
                    type="number"
                    name="price"
                  />
                  <button
                    type="button"
                    className="bg-gray-100 rounded-md px-5 py-3"
                  >
                    <AiOutlinePlus />
                  </button>
                  <button
                    type="submit"
                    className={`py-3 px-8 rounded-lg ${"bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="details mt-8">
            <div className="flex items-center gap-5">
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "description" ? "bg-green text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("description")}
              >
                Description
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "auctionHistory"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("auctionHistory")}
              >
                Auction History
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "reviews" ? "bg-green text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("reviews")}
              >
                Reviews(2)
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "moreProducts"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("moreProducts")}
              >
                More Products
              </button>
            </div>

            {/* Dynamic Tab Content */}
            <div className="tab-content mt-8">
              {activeTab === "description" && (
                <div className="description-tab shadow-s3 p-8 rounded-md">
                  <Title level={4}>Description</Title>
                  <br />
                  <Caption className="leading-7">{product.description}</Caption>
                </div>
              )}
              {activeTab === "auctionHistory" && <AuctionHistory />}
              {activeTab === "reviews" && (
                <div className="reviews-tab shadow-s3 p-8 rounded-md">
                  <Title level={5} className=" font-normal">
                    Reviews
                  </Title>
                  <hr className="my-5" />
                  <Title level={5} className=" font-normal text-red-500">
                    Coming Soon!
                  </Title>
                </div>
              )}
              {activeTab === "moreProducts" && (
                <div className="more-products-tab shadow-s3 p-8 rounded-md">
                  <h1>More Products</h1>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export const AuctionHistory = () => {
  return (
    <>
      <div className="shadow-s1 p-8 rounded-lg">
        <Title level={5} className=" font-normal">
          Auction History
        </Title>
        <hr className="my-5" />

        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Bid Amount(USD)
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Auto
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">December 31, 2024 12:00 am</td>
                <td className="px-6 py-4">$200</td>
                <td className="px-6 py-4">Sunil Pokhrel</td>
                <td className="px-6 py-4"> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
