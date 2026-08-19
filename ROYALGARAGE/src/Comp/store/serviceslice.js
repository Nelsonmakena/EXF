import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  ongoingServices: [],
  recentServices: [],
  availableServiceList: [],
  availableProductList: [],
  cart: [],
};

//adding a product

export const newProduct = createAsyncThunk("/new-product", async (data) => {
  const response = axios.put(
    "http://localhost:3000/api/products/addproduct",
    data,
    { withCredentials: true },
  );
  return response.data;
});

///deleting a product

export const removeProduct = createAsyncThunk("/remove", async () => {
  const response = axios.delete();
  return response.data;
});

//fetching product list

export const getProducts = createAsyncThunk("/products", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/products/all-products",
  );
  return response.data;
});

//updating product info

export const updateProducts = createAsyncThunk(
  "/update-product",
  async (data) => {
    const response = await axios.put(
      `http://localhost:3000/api/products/update/${data.productid}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);

//adding a new service
export const newService = createAsyncThunk("/new-service", async (data) => {
  const response = await axios.put(
    "http://localhost:3000/api/services/addservice",
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
});
//fetching serviceList
export const getServices = createAsyncThunk("/services", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/services/allservices",
  );
  return response.data;
});

//updating a service info

export const updateServices = createAsyncThunk(
  "/update-Services",
  async (data) => {
    const response = await axios.put(
      `http://localhost:3000/api/services/updateservice/${data.service_id}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);

//getting a new job

export const newJob = createAsyncThunk("/new-job", async (data) => {
  const response = await axios.put(
    "http://localhost:3000/api/client/new-job",
    data,
    { withCredentials: true },
  );
  return response.data;
});

//fetching ongoing jobs list

export const getServiceList = createAsyncThunk("/serviceList", async () => {
  const response = await axios.get("http://localhost:3000/api/client/jobs", {
    withCredentials: true,
  });
  return response.data;
});

export const ServiceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {
    addCart: (state, action) => {
      let quantity;
      const checkCart = state.cart.find(
        (cart) => cart.product_id === action.payload.product_id,
      );

      if (checkCart) {
        checkCart.quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceList.fulfilled, (state, action) => {
        state.ongoingServices = action.payload.data;
      })
      .addCase(getServices.rejected, (state) => {
        state.availableServiceList = [];
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.availableServiceList = action.payload.data;
        state.loading = false;
      })
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.availableServiceList = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.availableProductList = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.availableProductList = [];
      })
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        state.availableProductList = [];
      });
  },
});

export default ServiceSlice.reducer;
export const { addCart } = ServiceSlice.actions;
