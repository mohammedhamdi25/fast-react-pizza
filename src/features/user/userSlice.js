import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const initialState = {
  userName: "",
  statue: "idel",
  position: [],
  address: "",
  errors: "",
};

export const fetchAddres = createAsyncThunk(
  "user/fetchAddres",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
);

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUserName(state, actoin) {
      state.userName = actoin.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddres.pending, (state, actoin) => {
        state.statue = "loading";
      })
      // if the fetch is done
      .addCase(fetchAddres.fulfilled, (state, action) => {
        state.address = action.payload.address;
        state.position = action.payload.position;
        state.statue = "idel";
      })
      .addCase(fetchAddres.rejected, (state, action) => {
        state.statue = "error";
        state.errors = action.error.message;
      }),
});

export const { editUserName } = useSlice.actions;

export default useSlice.reducer;
