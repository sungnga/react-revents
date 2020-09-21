import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../eventForm/EventForm';
import EventList from './EventList';

export default function EventDashboard() {
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventForm />
			</Grid.Column>
		</Grid>
	);
}
