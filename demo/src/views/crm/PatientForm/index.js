import React, { forwardRef } from 'react'
import { Tabs, FormContainer, } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email Required'),
	name: Yup.string().required('User Name Required'),
	location: Yup.string(),
	title: Yup.string(),
	phoneNumber: Yup.string().matches(
		/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 
		'Phone number is not valid'
	),
	birthday: Yup.string(),
	facebook: Yup.string(),
	twitter: Yup.string(),
	pinterest: Yup.string(),
	linkedIn: Yup.string(),
	img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const PatientForm = forwardRef((props, ref) => {

	const { patient, onFormSubmit } = props

	return (
		<Formik
			innerRef={ref}
			initialValues={{ 
				name: patient.name || '',
				email: patient.email || '',
				img: patient.img || '',
				location: patient?.personalInfo?.location || '',
				title: patient?.personalInfo?.title || '',
				phoneNumber:patient?.personalInfo?.phoneNumber || '',
				birthday: patient?.personalInfo?.birthday && dayjs(patient.personalInfo.birthday,'DD/MM/YYYY').toDate(),
				facebook: patient?.personalInfo?.facebook || '',
				twitter: patient?.personalInfo?.twitter || '',
				pinterest: patient?.personalInfo?.pinterest || '',
				linkedIn: patient?.personalInfo?.linkedIn || '',
			}}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				onFormSubmit?.(values)
				setSubmitting(false)
			}}
		>
			{({touched, errors, resetForm}) => (
				<Form>
					<FormContainer>
						<Tabs defaultValue="personalInfo">
							<TabList>
								<TabNav value="personalInfo">Personal Info</TabNav>
								<TabNav value="social">Social</TabNav>
							</TabList>
							<div className="p-6">
								<TabContent value="personalInfo">
									<PersonalInfoForm touched={touched} errors={errors} />
								</TabContent>
								<TabContent value="social">
									<SocialLinkForm touched={touched} errors={errors} />
								</TabContent>
							</div>
						</Tabs>
					</FormContainer>
				</Form>
			)}
		</Formik>
	)
})

export default PatientForm
