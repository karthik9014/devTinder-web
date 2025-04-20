import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFeed: (state, action) => state?.filter((user) => user?._id !== action?.payload),
    },
});

export const { addFeed, removeUserFeed } = userSlice.actions;
export default userSlice.reducer;
