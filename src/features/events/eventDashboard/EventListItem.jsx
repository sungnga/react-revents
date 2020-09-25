import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../eventActions';
import { format } from 'date-fns';

export default function EventListItem({ event }) {
	const dispatch = useDispatch();

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header content={event.title} />
							<Item.Description>Hosted by {event.hostedBy}</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>

			<Segment>
				<span>
					<Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')}
					<Icon name='marker' />
					{event.venue}
				</span>
			</Segment>

			<Segment secondary>
				<List horizontal>
					{event.attendees.map((attendee) => (
						<EventListAttendee attendee={attendee} key={attendee.id} />
					))}
				</List>
			</Segment>

			<Segment clearing>
				<div>{event.description}</div>
				<Button
					onClick={() => dispatch(deleteEvent(event.id))}
					color='red'
					floated='right'
					content='Delete'
				/>
				<Button
					as={Link}
					to={`/events/${event.id}`}
					color='teal'
					floated='right'
					content='View'
				/>
			</Segment>
		</Segment.Group>
	);
}
