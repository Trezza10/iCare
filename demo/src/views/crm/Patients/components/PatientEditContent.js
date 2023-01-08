import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPatientList, putPatient } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import PatientForm from 'views/crm/PatientForm'
import dayjs from 'dayjs'

const PatientEditContent = forwardRef((_, ref) => {

	const dispatch = useDispatch()

	const patient = useSelector((state) => state.crmPatients.state.selectedPatient)
	const data = useSelector((state) => state.crmPatients.data.patientList)
	const { id } = patient

	const onFormSubmit = values => {
		const { 
			name, 
			birthday, 
			email, 
			img,
			location,
			title,
			phoneNumber,
			facebook,
			twitter,
			pinterest,
			linkedIn
		} = values

		const basicInfo = {name, email, img }
		const personalInfo = {
			location,
			title,
			birthday: dayjs(birthday).format('DD/MM/YYYY'),
			phoneNumber,
			facebook,
			twitter,
			pinterest,
			linkedIn
		}
		let newData = cloneDeep(data)
		let editedPatient = {}
		newData = newData.map(elm => {
			if (elm.id === id) {
				elm = {...elm, ...basicInfo}
				elm.personalInfo = {...elm.personalInfo, ...personalInfo}
				editedPatient = elm
			}
			return elm
		})
		if(!isEmpty(editedPatient)) {
			console.log('editedPatient', editedPatient)
			dispatch(putPatient(editedPatient))
		}
		dispatch(setDrawerClose())
		dispatch(setPatientList(newData))
	}
	
	return (
		<PatientForm 
			ref={ref} 
			onFormSubmit={onFormSubmit}
			patient={patient}
		/>
	)
})

export default PatientEditContent
