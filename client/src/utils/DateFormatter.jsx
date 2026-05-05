import React from "react";
import dayjs from "dayjs";

export const DateFormatter = ({ date }) => {
 
  const formattedDate = dayjs(date).format("D MMM YYYY"); 

  return <span title={dayjs(date).toString()}>{formattedDate}</span>;
};


/* import React from "react";

export const DateFormatter = ({ date }) => {
  const apiDateString = date;
  const dateObject = new Date(apiDateString);
  const readableDate = dateObject.toLocaleString();

  return <>{readableDate}</>;
};
 */