import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderServices from "../services/orders";

const initialState = {
  orders: [],
  order: {},
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
};

export const listOrders = createAsyncThunk(
  "orders/listOrders",
  async ({ limit, page, number, status }) => {
    const res = await OrderServices.list({ limit, page, status, number });
    return res.data;
  }
);
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await OrderServices.create(payload);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const removeOrder = createAsyncThunk(
  "orders/removeOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await OrderServices.removeOrder(id);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const getOrderByNum = createAsyncThunk(
  "orders/getOrderByNum",
  async (id, { rejectWithValue }) => {
    try {
      const res = await OrderServices.getOrderByNum(id);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

const orderslice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.orders = action.payload.data.data;
      })
      .addCase(listOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
        state.total = 0;
        state.error = "";
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        const remaningorders = state.orders.filter(
          (order) => order?.number !== action.meta.arg
        );
        state.orders = remaningorders;
        state.total--;
      })
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(getOrderByNum.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export const { setCurrentPage, setLimit } = orderslice.actions;
export const orderReducer = orderslice.reducer;
