import React, { useState } from 'react';
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function EventsTab() {
	const [activeTab, setActiveTab] = useState(0);
	const panes = [
		{ menuItem: 'Future Events', pane: { key: 'future' } },
		{ menuItem: 'Past Events', pane: { key: 'past' } },
		{ menuItem: 'Hosting', pane: { key: 'hosting' } }
	];

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='calendar' content='Events' />
				</Grid.Column>
				<Grid.Column width={16}>
					<Tab
						onTabChange={(e, data) => setActiveTab(data.activeIndex)}
						panes={panes}
						menu={{ secondary: true, pointing: true }}
					/>
					<Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
						<Card as={Link} to={`/events`}>
							<Image
								src='/assets/categoryImages/drinks.jpg'
								style={{ minHeight: 100, objectFit: 'cover' }}
							/>
							<Card.Content>
								<Card.Header content='Title' textAlign='center' />
								<Card.Meta textAlign='center'>
									<div>Date</div>
									<div>Time</div>
								</Card.Meta>
							</Card.Content>
						</Card>
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
