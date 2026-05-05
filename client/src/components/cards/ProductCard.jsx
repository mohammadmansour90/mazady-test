import PropTypes from "prop-types";
import { RiAuctionFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineFavorite } from "react-icons/md";
import { Caption, PrimaryButton, ProfileCard, Title } from "../common/Design";
import { NavLink } from "react-router-dom";

export const ProductCard = ({ item }) => {
  return (
   <div className="bg-white shadow-s1 rounded-xl p-4 flex flex-col">
  {/* Image */}
  <div className="h-56 relative overflow-hidden rounded-xl">
<NavLink to={`/details/${item.id}`}>
      <img
        src={item?.image}
        alt={item?.title}
        className="w-full h-full object-cover hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out"
      />
    </NavLink>
    <ProfileCard className="shadow-s1 absolute right-3 bottom-3">
      <RiAuctionFill size={22} className="text-green" />
    </ProfileCard>

    {/* Status */}
    <div className="absolute top-0 left-0 p-2 w-full flex justify-between">
      <Caption className={`${item?.isSoldout ? "text-red-500 bg-white" : "text-green bg-green_100"} px-3 py-1 text-xs rounded-full`}>
        {item?.isSoldout ? "Sold Out" : "On Stock"}
      </Caption>
      <Caption className="text-green bg-green_100 px-3 py-1 text-xs rounded-full">
        {item?.totalBids || 0} Bids
      </Caption>
    </div>
  </div>

  {/* Details */}
  <div className="flex flex-col flex-1 mt-4 space-y-3">
    {/* Title */}
   <Title 
  level={6} 
  className="uppercase text-sm md:text-base font-semibold text-gray-800 line-clamp-2"
>
  {item?.title}
</Title>

    {/* Prices */}
   <div className="flex justify-between items-center">
  {/* Current Bid */}
  <div className="flex items-center gap-2">
    <RiAuctionFill size={20} className="text-green" />
    <div>
      <Caption className="text-xs text-gray-500">Current Bid</Caption>
      <Title level={6} className="text-base font-bold text-gray-900">
        ${(item?.biddingPrice || 0).toFixed(2)}
      </Title>
    </div>
  </div>

       <div className="flex items-center gap-2">
    <GiTakeMyMoney size={20} className="text-red-500" />
    <div>
      <Caption className="text-xs text-red-500">Buy Now</Caption>
      <Title level={6} className="text-base font-bold text-red-600">
        ${(item?.price || 0).toFixed(2)}
      </Title>
    </div>
  </div>
</div>
    {/* Buttons */}
    <div className="flex items-center justify-between pt-2">
      <PrimaryButton className="rounded-lg px-6 py-2 ml-13 text-sm">Place Bid</PrimaryButton>
     
    </div>
  </div>
</div>

  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    biddingPrice: PropTypes.number,
    price: PropTypes.number,
    isSoldout: PropTypes.bool,
    totalBids: PropTypes.number,
  }),
};
