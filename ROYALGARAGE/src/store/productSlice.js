import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsCatalogue: [],
  productList: [],
};

//fetching product list
export const getProducts = createAsyncThunk("/products", async () => {
  const response = await axios.get("/api/products/all-products");

  return response.data;
});

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
//catalogue
//list of inventory
export const getCatalogue = createAsyncThunk("/catalogue", async () => {
  const response = await axios.get("/api/products/inventory", {
    withCredentials: true,
  });
  return response.data;
});

export const newInventoryItem = createAsyncThunk(
  "/new-inventory",
  async (data) => {
    const response = await axios.put("/api/products/inventory", data, {
      withCredentials: true,
    });
    return response.data;
  },
);

export const addStock = createAsyncThunk("/add-stock", async (data) => {
  const response = await axios.put("/api/products/stock", data, {
    withCredentials: true,
  });
  return response.data;
});

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productList = action.payload.data;
      })
      .addCase(getCatalogue.fulfilled, (state, action) => {
        state.productsCatalogue = action.payload.data;
      });
  },
});
export default ProductSlice.reducer;
