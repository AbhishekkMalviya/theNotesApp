import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
};

const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste created successfully.",{
                position:'top-right'
            });
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex(item => item._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste updated successfully.",{
                    position:'top-right'
                });
            }
        },
        resetAllPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("All pastes cleared.");
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex(item => item._id === pasteId);
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste deleted successfully.",{
                    position:'top-right'
                });
            }
        },
    },
});

export const {
    addToPastes,
    updateToPastes,
    resetAllPastes,
    removeFromPastes
} = pasteSlice.actions;

export default pasteSlice.reducer;

