import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      //PENDING: add a check so that same title wala first create na ho
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste created Successfully.")
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      //THE BELOW MISTAKE TAKE MY 2 HOURS TO UNDERSTAND AND THE MISTAKE IS SO DUMB I JUST PUT THESE CURLY BRACKETS ( {} ) AND MY EDIT/ UPDATE FUNCTIONALITY IS NOT WORKING
      // REASON BEHIND THIS IS THE findIndex FUNCTION DOES NOT RETURN A VALUE EXPLICETLY WHEN I CREATE CURLY BRAKET THE VALUE IS NOT RETURNED ANOTHER OPTION TO RESOLVE THIS ISSUUE IS TO USE RETURN KEYWORD SO THAT IN BRACKETS THE VALUE IS RETURNED THROUGH findIndex FUNCTION.
      // const index = state.pastes.findIndex((item) => {
      //   item._id === paste._id;
      // })
const index= state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) =>
        item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions
export default pasteSlice.reducer