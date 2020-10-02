import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import MyTextInput from '../../app/common/form/MyTextInput';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';

export default function RegisterForm() {
	const dispatch = useDispatch();

	return (
		<ModalWrapper size='mini' header='Register to Re-vents'>
			<Formik
				initialValues={{ displayName: '', email: '', password: '' }}
				validationSchema={Yup.object({
					displayName: Yup.string().required(),
					email: Yup.string().required().email(),
					password: Yup.string().required()
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						await registerInFirebase(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (error) {
						setSubmitting(false);
						console.log(error);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty }) => (
					<Form className='ui form'>
						<MyTextInput name='displayName' placeholder='Display Name' />
						<MyTextInput name='email' placeholder='Email Address' />
						<MyTextInput
							name='password'
							placeholder='Password'
							type='password'
						/>
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Register'
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
