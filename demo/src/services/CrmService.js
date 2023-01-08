import ApiService from "./ApiService"

export async function apiGetCrmDashboardData (data) {
    return ApiService.fetchData({
        url: '/crm/dashboard',
        method: 'get',
        data
    })
}

export async function apiGetCrmCalendar () {
    return ApiService.fetchData({
        url: '/crm/calendar',
        method: 'get'
    })
}

export async function apiGetCrmPatients (data) {
    return ApiService.fetchData({
        url: '/crm/patients',
        method: 'post',
        data
    })
}

export async function apiGetCrmPatientsStatistic (params) {
    return ApiService.fetchData({
        url: '/crm/patients-statistic',
        method: 'get',
        params
    })
}

export async function apPutCrmPatient (data) {
    return ApiService.fetchData({
        url: '/crm/patients',
        method: 'put',
        data
    })
}

export async function apiGetCrmPatientDetails (params) {
    return ApiService.fetchData({
        url: '/crm/patient-details',
        method: 'get',
        params
    })
}

export async function apiDeleteCrmPatient (data) {
    return ApiService.fetchData({
        url: '/crm/patient/delete',
        method: 'delete',
        data
    })
}

export async function apiGetCrmMails (params) {
    return ApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params
    })
}

export async function apiGetCrmMail (params) {
    return ApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params
    })
}