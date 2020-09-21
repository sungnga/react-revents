import React from 'react';
import { Grid } from 'semantic-ui-react';

export default function EventDashboard() {
	return (
		<Grid>
			<Grid.Column width={10}>
				<h2>Left Column</h2>
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Right Column</h2>
			</Grid.Column>
		</Grid>
	);
}
