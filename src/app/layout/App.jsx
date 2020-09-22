import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';

export default function App() {
	const [formOpen, setFormOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	function handleSelectEvent(event) {
		setSelectedEvent(event);
		setFormOpen(true);
	}

	function handleCreateFormOpen() {
		setSelectedEvent(null);
		setFormOpen(true);
	}

	return (
		<>
			<Route path='/' exact component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar setFormOpen={handleCreateFormOpen} />
						<Container className='main'>
							<Route path='/' exact component={HomePage} />
							<Route path='/events' exact component={EventDashboard} />
							<Route path='/events/:id' exact component={EventDetailedPage} />
							<Route path='/createEvent' exact component={EventForm} />
						</Container>
					</>
				)}
			/>
		</>
	);
}
