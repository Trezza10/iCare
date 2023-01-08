import React, { useEffect } from 'react'
import { AdaptableCard, Loading, Container, DoubleSidedImage } from 'components/shared'
import PatientProfile from './components/PatientProfile'
import PaymentHistory from './components/PaymentHistory'
import CurrentSubscription from './components/CurrentSubscription'
import PaymentMethods from './components/PaymentMethods'
import { useDispatch, useSelector } from 'react-redux'
import { getPatient } from './store/dataSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import isEmpty from 'lodash/isEmpty'
import useQuery from 'utils/hooks/useQuery'

injectReducer('crmPatientDetails', reducer)

const PatientDetail = () => {

	const dispatch = useDispatch()

	const query = useQuery()

	const data = useSelector((state) => state.crmPatientDetails.data.profileData)
	const loading = useSelector((state) => state.crmPatientDetails.data.loading)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	const fetchData = () => {
		const id = query.get('id')
		if (id) {
			dispatch(getPatient({id}))
		}
	}

	return (
		<Container className="h-full">
			<Loading loading={loading}>
				{!isEmpty(data) && (
					<div className="flex flex-col xl:flex-row gap-4">
						<div>
							<PatientProfile data={data} />
						</div>
						<div className="w-full">
							<AdaptableCard>
								<CurrentSubscription />
								<PaymentHistory />
								<PaymentMethods data={data.paymentMethod} />
							</AdaptableCard>
						</div>
					</div>
				)}
			</Loading>
			{(!loading && isEmpty(data)) && (
				<div className="h-full flex flex-col items-center justify-center">
					<DoubleSidedImage 
						src="/img/others/img-2.png"
						darkModeSrc="/img/others/img-2-dark.png"
						alt="No user found!"
					/>
					<h3 className="mt-8">No user found!</h3>
				</div>
			)}
		</Container>
	)
}

export default PatientDetail
