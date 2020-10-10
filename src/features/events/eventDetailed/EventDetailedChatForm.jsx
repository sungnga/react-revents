import React from 'react';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import { Loader } from 'semantic-ui-react';

export default function EventDetailedChatForm({ eventId }) {
	return (
		<Formik
			initialValues={{ comment: '' }}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				try {
					await addEventChatComment(eventId, values.comment);
					resetForm();
				} catch (error) {
					toast.error(error.message);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, handleSubmit }) => (
				<Form className='ui form'>
					<Field name='comment'>
						{({ field }) => (
							<div style={{ position: 'relative' }}>
								<Loader active={isSubmitting} />
								<textarea
									rows='2'
									{...field}
									placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
									onKeyPress={(e) => {
										if (e.key === 'Enter' && e.shiftKey) {
											return;
										}
										if (e.key === 'Enter' && !e.shiftKey) {
											handleSubmit();
										}
									}}
								></textarea>
							</div>
						)}
					</Field>
				</Form>
			)}
		</Formik>
	);
}
