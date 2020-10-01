/* global google */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { listenToEvents } from '../eventActions';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
	addEventToFirestore,
	cancelEventToggle,
	listenToEventFromFirestore,
	updateEventInFirestore
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({ match, history }) {
	const dispatch = useDispatch();
	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	);
	const { error, loading } = useSelector((state) => state.async);

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: {
			address: '',
			latLng: null
		},
		venue: {
			address: '',
			latLng: null
		},
		date: ''
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title'),
		category: Yup.string().required('You must provide a category'),
		description: Yup.string().required(),
		city: Yup.object().shape({
			address: Yup.string().required('City is required')
		}),
		venue: Yup.object().shape({
			address: Yup.string().required('Venue is required')
		}),
		date: Yup.string().required()
	});

	useFirestoreDoc({
		shouldExecute: !!match.params.id,
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch]
	});

	if (loading) return <LoadingComponent content='Loading event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventInFirestore(values)
							: await addEventToFirestore(values);
						setSubmitting(false);
						history.push('/events');
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />
						<MyTextInput name='title' placeholder='Event title' />
						<MySelectInput
							name='category'
							placeholder='Event category'
							options={categoryData}
						/>
						<MyTextArea name='description' placeholder='Description' rows={3} />
						<Header sub color='teal' content='Event Location Details' />
						<MyPlaceInput name='city' placeholder='City' />
						<MyPlaceInput
							name='venue'
							placeholder='Venue'
							disabled={!values.city.latLng}
							options={{
								location: new google.maps.LatLng(values.city.latLng),
								radius: 1000,
								types: ['establishment']
							}}
						/>
						<MyDateInput
							name='date'
							placeholderText='Event date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm a'
						/>
						{selectedEvent && (
							<Button
								type='button'
								floated='left'
								color={selectedEvent.isCancelled ? 'green' : 'red'}
								content={
									selectedEvent.isCancelled
										? 'Reactivate Event'
										: 'Cancel Event'
								}
								onClick={() => cancelEventToggle(selectedEvent)}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							floated='right'
							positive
							content='Submit'
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to='/events'
							type='submit'
							floated='right'
							content='Cancel'
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
