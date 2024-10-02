import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RoomServices from "../services/rooms";

const initialState = {
  rooms: [],
  room: {},
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
};

export const listRooms = createAsyncThunk(
  "rooms/listRooms",
  async ({ limit, page, name, status }) => {
    const res = await RoomServices.list({ limit, page, status, name });
    return res.data;
  }
);
export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await RoomServices.create(payload);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const getRoomById = createAsyncThunk(
  "rooms/getRoomById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await RoomServices.getRoomById(id);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await RoomServices.updateRoom(id, payload);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const updateRoomStatus = createAsyncThunk(
  "rooms/updateRoomStatus",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await RoomServices.updateRoomStatus(id, payload);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const removeRoom = createAsyncThunk(
  "rooms/removeRoom",
  async (id, { rejectWithValue }) => {
    try {
      const res = await RoomServices.removeRoom(id);
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
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
      .addCase(listRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.rooms = action.payload.data.data;
      })
      .addCase(listRooms.pending, (state) => {
        state.loading = true;
        state.rooms = [];
        state.total = 0;
        state.error = "";
      })
      .addCase(listRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeRoom.fulfilled, (state, action) => {
        state.loading = false;
        const remaningRooms = state.rooms.filter(
          (room) => room?.name !== action.meta.arg
        );
        state.rooms = remaningRooms;
        state.total--;
      })
      .addCase(removeRoom.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(removeRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload.data;
      })
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(getRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload.data;
      })
      .addCase(getRoomById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload.data;
      })
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(updateRoomStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload.data;
      })
      .addCase(updateRoomStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateRoomStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export const { setCurrentPage, setLimit } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
