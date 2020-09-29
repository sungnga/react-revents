import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';

export default function EventDashboard() {
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);

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
				<h2>Event Filters</h2>
			</Grid.Column>
		</Grid>
	);
}
