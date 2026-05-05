import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authFeature";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
  message: "",
  income:null,
};

// ================== Thunks ==================
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData);
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await authService.logout();
    localStorage.removeItem("user");
    return response;
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getLogInStatus = createAsyncThunk("auth/status", async (_, thunkAPI) => {
  try {
    return await authService.getLogInStatus();
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
  try {
    return await authService.getUserProfile();
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUserAsSeller = createAsyncThunk("auth/login-as-seller", async (userData, thunkAPI) => {
  try {
    const response = await authService.loginUserAsSeller(userData);
    localStorage.setItem("user", JSON.stringify(response));
    return response;   // ✅ FIXED
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserIncome = createAsyncThunk("auth/get-income", async (_, thunkAPI) => {
  try {
    return await authService.getUserIncome();
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getIncome = createAsyncThunk("auth/get-income-of-admin", async (_, thunkAPI) => {
  try {
    return await authService.getIncome();
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const getAllUser = createAsyncThunk("auth/getallusers", async (_, thunkAPI) => {
  try {
    return await authService.getAllUser();
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// ================== Slice ==================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------- REGISTER ----------
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // ---------- LOGIN ----------
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // ---------- LOGOUT ----------
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
      })

      // ---------- STATUS ----------
      .addCase(getLogInStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload === true || action.payload === "true";
      })

      // ---------- PROFILE ----------
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
     .addCase(getUserProfile.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  // don’t wipe user or spam toast here
  console.warn("Profile fetch failed:", action.payload);
})


      // ---------- LOGIN AS SELLER ----------
      .addCase(loginUserAsSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Changed role into Seller successfully");
      })


// ----------------------get user income-----------------

       .addCase(getUserIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.income = action.payload;
      })
     .addCase(getUserIncome.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
          state.isLoggedIn = true;

  state.message = action.payload;
  // don’t wipe user or spam toast here
})
 

//------------------get income of admin ------------------

   .addCase(getIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.income = action.payload;
      })
     .addCase(getIncome.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
          state.isLoggedIn = true;

  state.message = action.payload;
  // don’t wipe user or spam toast here
})
//-------------get all user -----------------------
 .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.users = action.payload;
        state.totalUsers = action.payload?.length;
      })
     .addCase(getAllUser.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
          state.isLoggedIn = true;

  state.message = action.payload;
  // don’t wipe user or spam toast here
});
 },
})

// ================== Exports ==================
export const { RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsSuccess = (state) => state.auth.isSuccess;

export default authSlice.reducer;
