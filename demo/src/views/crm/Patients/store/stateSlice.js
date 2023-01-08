import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmPatients/state',
    initialState: {
        drawerOpen: false,
        selectedPatient: {},
        sortedColumn: () => {},
    },
    reducers: {
        setSelectedPatient: (state, action) => {
            state.selectedPatient = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
})

export const { 
    setSelectedPatient, 
    setDrawerOpen, 
    setDrawerClose,
    setSortedColumn
} = stateSlice.actions

export default stateSlice.reducer
