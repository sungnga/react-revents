import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { listenToEvents } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function EventDetailedPage({ match }) {
	const dispatch = useDispatch();
	const event = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	);
	const { loading } = useSelector((state) => state.async);

	useFirestoreDoc({
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch]
	});

	if (loading || !event) return <LoadingComponent content='Loading event...' />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event} />
				<EventDetailedInfo event={event} />
				<EventDetailedChat />
			</Grid.Column>

			<Grid.Column width={6}>
				<EventDetailedSidebar attendees={event?.attendees} />
			</Grid.Column>
		</Grid>
	);
}
