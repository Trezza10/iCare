import React, { useState } from 'react'
import { Card, Avatar, Button, Notification, toast } from 'components/ui'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePatient } from '../store/dataSlice'
import { openEditPatientDetailDialog } from '../store/stateSlice'
import EditPatientProfile from './EditPatientProfile'

const PatientInfoField = ({title, value}) => {
	return (
		<div>
			<span>{title}</span>
			<p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
		</div>
	)
}

const PatientProfileAction = ({id}) => {

	const dispatch = useDispatch()
	const [dialogOpen, setDialogOpen] = useState(false)

	const navigate = useNavigate()

	const onDialogClose = () => {
		setDialogOpen(false)
	}

	const onDialogOpen = () => {
		setDialogOpen(true)
	}

	const onDelete = () => {
		setDialogOpen(false)
		dispatch(deletePatient({id}))
		navigate('/app/crm/patients')
		toast.push(
			<Notification title={"Successfuly Deleted"} type="success">
				Patient successfuly deleted
			</Notification>
		)
	}

	const onEdit = () => {
		dispatch(openEditPatientDetailDialog())
	}

	return (
		<>
			<Button 
				block 
				icon={<HiOutlineTrash />}
				onClick={onDialogOpen}
			>
				Delete
			</Button>
			<Button 
				icon={<HiPencilAlt/>} 
				block 
				variant="solid"
				onClick={onEdit} 
			>	
				Edit
			</Button>
			<ConfirmDialog
				isOpen={dialogOpen}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
				type="danger"
				title="Delete patient"
				onCancel={onDialogClose}
				onConfirm={onDelete}
				confirmButtonColor="red-600"
			>
				<p>
					Are you sure you want to delete this patient? 
					All record related to this patient will be deleted as well. 
					This action cannot be undone.
				</p>
			</ConfirmDialog>
			<EditPatientProfile />
		</>
	)
}

const PatientProfile = ({data = {}}) => {
	return (
		<Card>
			<div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
				<div className="flex xl:flex-col items-center gap-4">
					<Avatar size={90} shape="circle" src={data.img} />
					<h4 className="font-bold">{data.name}</h4>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
					<PatientInfoField title="Email" value={data.email} />
					<PatientInfoField title="Phone" value={data.personalInfo?.phoneNumber} />
					<PatientInfoField title="Location" value={data.personalInfo?.location} />
					<PatientInfoField title="Date of birth" value={data.personalInfo?.birthday} />
					<PatientInfoField title="Title" value={data.personalInfo?.title} />
					<PatientInfoField title="Insurance" value={data.personalInfo?.insurance} />
					<div className="mb-7">
						<span>Social</span>
						<div className="flex mt-4">
							<Button 
								className="mr-2" 
								shape="circle"
								size="sm"
								icon={<FaFacebookF className="text-[#1773ea]" />} 
							/>
							<Button 
								className="mr-2" 
								shape="circle"
								size="sm"
								icon={<FaTwitter className="text-[#1da1f3]" />} 
							/>
							<Button 
								className="mr-2" 
								shape="circle"
								size="sm"
								icon={<FaLinkedinIn className="text-[#0077b5]" />} 
							/>
							<Button 
								className="mr-2" 
								shape="circle"
								size="sm"
								icon={<FaPinterestP className="text-[#df0018]" />} 
							/>
						</div>
					</div>
				</div>
				<div className="mt-4 flex flex-col xl:flex-row gap-2">
					<PatientProfileAction id={data.id} />
				</div>
			</div>
		</Card>
	)
}

export default PatientProfile
