import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCrmPatients, apPutCrmPatient, apiGetCrmPatientsStatistic } from 'services/CrmService'

export const getPatientStatistic = createAsyncThunk('crmPatients/data/getPatientStatistic',async () => {
    const response = await apiGetCrmPatientsStatistic()
    return response.data
})

export const getPatients = createAsyncThunk('crmPatients/data/getPatients',async (params) => {
    const response = await apiGetCrmPatients(params)
    return response.data
})

export const putPatient = createAsyncThunk('crmPatients/data/putPatient',async (data) => {
    const response = await apPutCrmPatient(data)
    return response.data
})

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: ''
    }
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmPatients/data',
    initialState: {
        loading: false,
        patientList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setPatientList: (state, action) => {
            state.patientList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getPatients.fulfilled]: (state, action) => {
            state.patientList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getPatients.pending]: (state) => {
            state.loading = true
        },
        [getPatientStatistic.pending]: (state) => {
            state.statisticLoading = true
        },
        [getPatientStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },
    }
})

export const { 
    setTableData,
    setPatientList,
    setFilterData
} = dataSlice.actions

export default dataSlice.reducer
