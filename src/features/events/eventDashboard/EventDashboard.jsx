import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart
} from '../../../app/async/asyncReducer';
import {
	dataFromSnapshot,
	getEventsFromFirestore
} from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';

export default function EventDashboard() {
	const dispatch = useDispatch();
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);

	useEffect(() => {
		dispatch(asyncActionStart());
		const unsubscribe = getEventsFromFirestore({
			next: (snapshot) => {
				dispatch(
					listenToEvents(
						snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
					)
				);
				dispatch(asyncActionFinish());
			},
			error: (error) => dispatch(asyncActionError(error))
		});
		return unsubscribe;
	}, [dispatch]);

	return (
		<Grid>
			<Grid.Column width={10}>
				{loading && (
					<>
						<EventListItemPlaceholder />
						<EventListItemPlaceholder />
					</>
				)}
				<EventList events={events} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventFilters />
			</Grid.Column>
		</Grid>
	);
}
