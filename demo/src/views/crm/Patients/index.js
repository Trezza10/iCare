import React from 'react'
import { AdaptableCard } from 'components/shared'
import PatientsTable from './components/PatientsTable'
import PatientsTableTools from './components/PatientsTableTools'
import PatientStatistic from './components/PatientStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmPatients', reducer)

const Patients = () => {
	return (
		<>
			<PatientStatistic />
			<AdaptableCard className="h-full" bodyClass="h-full">
				<PatientsTableTools />
				<PatientsTable />
			</AdaptableCard>
		</>
	)
}

export default Patients
