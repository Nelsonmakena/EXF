import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  ongoingServices: [],
  recentServices: [],
  availableServiceList: [],
  availableProductList: [],
  cart: [],

  serviceCategories: [],
};

//client

//fetching serviceList
export const getServices = createAsyncThunk("/services", async () => {
  const response = await axios.get("/api/services/all-services");

  return response.data;
});

///admin

//adding a new service
export const newService = createAsyncThunk("/new-service", async (data) => {
  const response = await axios.put("/api/services/add-service", data, {
    withCredentials: true,
  });
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
// list of service categories
export const getServiceCategories = createAsyncThunk(
  "service-categories",
  async () => {
    const response = await axios.get("/api/services/service-category", {
      withCredentials: true,
    });
    return response.data;
  },
);
//adding a new service category

export const newServiceCategory = createAsyncThunk(
  "new-category",
  async (data) => {
    const response = await axios.put("/api/services/service-category", data, {
      withCredentials: true,
    });
    return response.data;
  },
);
//adding a role to service category

export const newServiceRoleCategory = createAsyncThunk(
  "new-role-service-category",
  async (data) => {
    const response = await axios.post("/api/services/service-category", data, {
      withCredentials: true,
    });
    return response.data;
  },
);
//deleting a service
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

      .addCase(getServiceCategories.fulfilled, (state, action) => {
        state.serviceCategories = action.payload.data;
      });
  },
});

export default ServiceSlice.reducer;
export const { addCart } = ServiceSlice.actions;
