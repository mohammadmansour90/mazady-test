import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productService from "../services/productService";
import { toast } from "react-toastify";

const initialState = {
    products:[],
    userproducts:[],
    wonproducts:[],
    product:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
};



export const createProduct = createAsyncThunk("product/create", async (formData, thunkAPI) => {
  try {
   return await productService.createProduct(formData);
    
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const getAllProduct = createAsyncThunk("product/get-user-products", async ( thunkAPI) => {
  try {
   return await productService.getAllProductOfUser();
    
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const getAllProductOfUser = createAsyncThunk("product/get-user-products", async ( thunkAPI) => {
  try {
   return await productService.getAllProductOfUser();
    
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        //--------------create product ------------------------------------
                      .addCase(createProduct.pending, (state) => {
                        state.isLoading = true;
                      })
                      .addCase(createProduct.fulfilled, (state ,action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.isError = false;
                        state.products.push(action.payload);
                        toast.success("product has been created successfully");
                      })
                      .addCase(createProduct.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                        toast.error(action.payload);
                      })
                //-----------get all product of user ---------------------
                  .addCase(getAllProductOfUser.pending, (state) => {
                        state.isLoading = true;
                      })
                      .addCase(getAllProductOfUser.fulfilled, (state ,action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.isError = false;
  state.userproducts = action.payload.product; // 🔥 extract array directly
                      })
                      .addCase(getAllProductOfUser.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                      })
    }
});



export default productSlice.reducer;