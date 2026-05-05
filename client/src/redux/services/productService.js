import axios from "axios";
import { BACKEND_URL } from "../../utils/url";
export const PRODUCT_URL = `${BACKEND_URL}/product`;

const createProduct  = async (formData) => {
  const response = await axios.post(PRODUCT_URL ,formData, {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const getAllProduct  = async () => {
  const response = await axios.get(`${PRODUCT_URL}` , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const getAllProductOfUser  = async () => {
  const response = await axios.get(`${PRODUCT_URL}/user` , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const getAllWonProductOfUser  = async () => {
  const response = await axios.get(`${PRODUCT_URL}/won-products` , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};
const deleteProduct  = async (id) => {
  const response = await axios.delete(`${PRODUCT_URL}/${id}` , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};
const getProduct  = async (id) => {
  const response = await axios.get(`${PRODUCT_URL}/${id}` , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const updateProduct  = async (id , formData) => {
  const response = await axios.put(`${PRODUCT_URL}/${id}` , formData , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const updateProductByAdmin  = async (id , formData) => {
  const response = await axios.patch(`${PRODUCT_URL}/admin/product-verified${id}` , formData , {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};
const productService = {
 createProduct,
 getAllProductOfUser,
 getAllProduct,
 getAllWonProductOfUser,
 deleteProduct,
 getProduct,
 updateProduct,
 updateProductByAdmin
 
};

export default productService;