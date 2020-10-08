import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addUserAttendance } from '../../../app/firestore/firestoreService';

const eventImageStyle = {
	filter: 'brightness(30%)'
};

const eventImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white'
};

export default function EventDetailedHeader({ event, isHost, isGoing }) {
	const [loading, setLoading] = useState(false);

	async function handleUserJoinEvent() {
		setLoading(true);
		try {
			await addUserAttendance(event);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: '0' }}>
				<Image
					src={`/assets/categoryImages/${event.category}.jpg`}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={event.title}
									style={{ color: 'white' }}
								/>
								<p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
								<p>
									Hosted by <strong>{event.hostedBy}</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached='bottom' clearing>
				{!isHost && (
					<>
						{isGoing ? (
							<Button>Cancel My Place</Button>
						) : (
							<Button
								onClick={handleUserJoinEvent}
								loading={loading}
								color='teal'
							>
								JOIN THIS EVENT
							</Button>
						)}
					</>
				)}
				{isHost && (
					<Button
						as={Link}
						to={`/manage/${event.id}`}
						color='orange'
						floated='right'
					>
						Manage Event
					</Button>
				)}
			</Segment>
		</Segment.Group>
	);
}
