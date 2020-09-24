import React from 'react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { updateEvent, createEvent } from '../eventActions';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default function EventForm({ match, history }) {
	const dispatch = useDispatch();
	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	);

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: ''
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title'),
		category: Yup.string().required('You must provide a category'),
		description: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
		date: Yup.string().required()
	});

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values }))
						: dispatch(
								createEvent({
									...values,
									id: cuid(),
									hostedBy: 'Bob',
									attendees: [],
									hostPhotoURL: '/assets/user.png'
								})
						  );
					history.push('/events');
				}}
			>
				<Form className='ui form'>
					<Header sub color='teal' content='Event Details' />
					<MyTextInput name='title' placeholder='Event title' />
					<MyTextInput name='category' placeholder='Category' />
					<MyTextInput name='description' placeholder='Description' />
					<Header sub color='teal' content='Event Location Details' />
					<MyTextInput name='city' placeholder='City' />
					<MyTextInput name='venue' placeholder='Venue' />
					<MyTextInput name='date' placeholder='Event date' type='date' />

					<Button type='submit' floated='right' positive content='Submit' />
					<Button
						as={Link}
						to='/events'
						type='submit'
						floated='right'
						content='Cancel'
					/>
				</Form>
			</Formik>
		</Segment>
	);
}
