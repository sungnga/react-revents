import React, { useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { format } from 'date-fns';

export default function AboutTab({ profile }) {
	const [editMode, setEditMode] = useState(false);

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated='left'
						icon='user'
						content={`About ${profile.displayName}`}
					/>
					<Button
						onClick={() => setEditMode(!editMode)}
						floated='right'
						basic
						content={editMode ? 'Cancel' : 'Edit'}
					/>
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<p>Profile form</p>
					) : (
						<>
							<div style={{ marginBottom: 10 }}>
								<strong>
									Member since: {format(profile.createdAt, 'dd MMM yyyy')}
								</strong>
								<div>{profile.description || null}</div>
							</div>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
