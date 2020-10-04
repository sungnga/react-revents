import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';

export default function ProfilePage() {
	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader />
				<h1>Profile content</h1>
			</Grid.Column>
		</Grid>
	);
}
