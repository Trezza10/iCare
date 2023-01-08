import React, { useRef } from 'react'
import { Button } from 'components/ui'
import { getPatients, setTableData, setFilterData } from '../store/dataSlice'
import PatientTableSearch from './PatientTableSearch'
import PatientTableFilter from './PatientTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

const PatientsTableTools = () => {

	const dispatch = useDispatch()

	const inputRef = useRef()

	const tableData = useSelector((state) => state.crmPatients.data.tableData)

	const handleInputChange = (val) => {
		const newTableData = cloneDeep(tableData)
		newTableData.query = val
		newTableData.pageIndex = 1
		if(typeof val === 'string' && val.length > 1) {
			fetchData(newTableData)
		}

		if(typeof val === 'string' && val.length === 0) {
			fetchData(newTableData)
		}
	}

	const fetchData = data => {
		dispatch(setTableData(data))
		dispatch(getPatients(data))
	}

	const onClearAll = () => {
		const newTableData = cloneDeep(tableData)
		newTableData.query = ''
		inputRef.current.value = ''
		dispatch(setFilterData({status: ''}))
		fetchData(newTableData)
	}

	return (
		<div className="md:flex items-center justify-between">
			<div className="md:flex items-center gap-4">
				<PatientTableSearch ref={inputRef} onInputChange={handleInputChange} />
				<PatientTableFilter />
			</div>
			<div className="mb-4">
				<Button 
					size="sm"
					onClick={onClearAll}
				>
					Clear All
				</Button>
			</div>
		</div>
	)
}

export default PatientsTableTools