import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmPatientDetails/state',
    initialState: {
        deletePaymentMethodDialog: false,
        editPaymentMethodDialog: false,
        editPatientDetailDialog: false,
        selectedCard: {}
    },
    reducers: {
        openDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = true
        },
        closeDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = false
        },
        openEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = true
        },
        closeEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = false
        },
        openEditPatientDetailDialog: (state) => {
            state.editPatientDetailDialog = true
        },
        closeEditPatientDetailDialog: (state) => {
            state.editPatientDetailDialog = false
        },
        updateSelectedCard: (state,action) => {
            state.selectedCard = action.payload
        },
    },
})

export const { 
    openDeletePaymentMethodDialog,
    closeDeletePaymentMethodDialog,
    openEditPaymentMethodDialog,
    closeEditPaymentMethodDialog,
    openEditPatientDetailDialog,
    closeEditPatientDetailDialog,
    updateSelectedCard
} = stateSlice.actions

export default stateSlice.reducer
