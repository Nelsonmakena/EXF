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
  const response = await axios.put("/api/products/add-product", data, {
    withCredentials: true,
  });
  return response.data;
});

///deleting a product

export const removeProduct = createAsyncThunk("/remove", async (product_id) => {
  const response = await axios.delete(`/api/products/delete/${product_id}`);
  return response.data;
});

//fetching product list

export const getProducts = createAsyncThunk("/products", async (product_id) => {
  const response = await axios.get("/api/products/all-products");
  return response.data;
});

//updating product info

export const updateProducts = createAsyncThunk(
  "/update-product",
  async (data) => {
    console.log(data);

    const response = await axios.patch(
      `/api/products/update/${data.productId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);

//adding a new service
export const newService = createAsyncThunk("/new-service", async (data) => {
  const response = await axios.put("/api/services/add-service", data, {
    withCredentials: true,
  });
  return response.data;
});

//fetching serviceList
export const getServices = createAsyncThunk("/services", async () => {
  const response = await axios.get("/api/services/all-services");

  return response.data;
});

//updating a service info

export const updateServices = createAsyncThunk(
  "/update-Services",
  async (data) => {
    const response = await axios.put(
      `/api/services/update-service/${data.service_id}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);
export const deletService = createAsyncThunk(
  "/delete-Service",
  async (service_id) => {
    const response = await axios.delete(`/api/services/delete/${service_id}`, {
      withCredentials: true,
    });
    return response.data;
  },
);

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
    reduceQuantity: (state, action) => {
      const item = state.cart.find(
        (cart) => cart.product_id === action.payload.product_id,
      );
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.fulfilled, (state, action) => {
        state.availableServiceList = action.payload.data;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.availableProductList = action.payload.data;
      });
  },
});

export default ServiceSlice.reducer;
export const { addCart } = ServiceSlice.actions;
