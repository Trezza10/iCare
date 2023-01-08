import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    apiGetCrmPatientDetails, 
    apiDeleteCrmPatient, 
    apPutCrmPatient 
} from 'services/CrmService'

export const getPatient = createAsyncThunk('crmPatientDetails/data/getPatient',async (data) => {
    const response = await apiGetCrmPatientDetails(data)
    return response.data
})

export const deletePatient = createAsyncThunk('crmPatientDetails/data/deletePatient',async (data) => {
    const response = await apiDeleteCrmPatient(data)
    return response.data
})

export const putPatient = createAsyncThunk('crmPatientDetails/data/putPatient',async (data) => {
    const response = await apPutCrmPatient(data)
    return response.data
})

const dataSlice = createSlice({
    name: 'crmPatientDetails/data',
    initialState: {
        loading: false,
        profileData: {},
        subscriptionData: [],
        paymentHistoryData: [],
        paymentMethodData: []
    },
    reducers: {
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
    },
    extraReducers: {
        [getPatient.fulfilled]: (state, action) => {
            state.loading = false
            state.profileData = action.payload
            state.subscriptionData = action.payload?.subscription || []
            state.paymentHistoryData = action.payload?.orderHistory || []
            state.paymentMethodData = action.payload?.paymentMethod || []
        },
        [deletePatient.fulfilled]: () => {},
        [putPatient.fulfilled]: () => {},
        [getPatient.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { updatePaymentMethodData, updateProfileData } = dataSlice.actions

export default dataSlice.reducer
