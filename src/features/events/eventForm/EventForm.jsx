import cuid from 'cuid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Segment, FormField } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { updateEvent, createEvent } from '../eventActions';

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

	const [values, setValues] = useState(initialValues);

	function handleFormSubmit() {
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
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	return (
		<Segment clearing>
			<Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => console.log(values)}
			>
				<Form className='ui form'>
					<FormField>
						<Field name='title' placeholder='Event title' />
					</FormField>

					<FormField>
						<Field name='category' placeholder='Category' />
					</FormField>

					<FormField>
						<Field name='description' placeholder='Description' />
					</FormField>

					<FormField>
						<Field name='city' placeholder='City' />
					</FormField>

					<FormField>
						<Field name='venue' placeholder='Venue' />
					</FormField>

					<FormField>
						<Field name='date' placeholder='Event date' type='date' />
					</FormField>

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
