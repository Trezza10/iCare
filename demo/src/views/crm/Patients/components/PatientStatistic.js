import React, { useEffect } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import { getPatientStatistic } from '../store/dataSlice'
import { HiOutlineUserGroup, HiOutlineUserAdd, HiOutlineUsers } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'

const StatisticCard = props => {

	const { icon, avatarClass, label, value, growthRate, loading } = props

	const avatarSize = 55

	return (
		<Card bordered>
			<Loading 
				loading={loading} 
				customLoader={
					<MediaSkeleton 
						avatarProps={
							{
								className: 'rounded',
								width: avatarSize,
								height: avatarSize
							}
						} 
					/>
				}
			>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<Avatar className={avatarClass} size={avatarSize} icon={icon} />
						<div>
							<span>{label}</span>
							<h3>
								<NumberFormat
									displayType="text"
									value={value}
									thousandSeparator
								/>
							</h3>
						</div>
					</div>
					<GrowShrinkTag value={growthRate} suffix="%" />
				</div>
			</Loading>
		</Card>
	)
}

const PatientStatistic = () => {

	const dispatch = useDispatch()

	const statisticData = useSelector((state) => state.crmPatients.data.statisticData)
	const loading = useSelector((state) => state.crmPatients.data.statisticLoading)

	useEffect(() => {
		dispatch(getPatientStatistic())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
			<StatisticCard 
				icon={<HiOutlineUserGroup />} 
				avatarClass="!bg-indigo-600"
				label="Total Patients"
				value={statisticData?.totalPatients?.value}
				growthRate={statisticData?.totalPatients?.growShrink}
				loading={loading}
			/>
			<StatisticCard 
				icon={<HiOutlineUsers />} 
				avatarClass="!bg-blue-500"
				label="New Patients"
				value={statisticData?.activePatients?.value}
				growthRate={statisticData?.activePatients?.growShrink}
				loading={loading}
			/>
		</div>
	)
}

export default PatientStatistic