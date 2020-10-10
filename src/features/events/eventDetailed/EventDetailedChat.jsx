import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Header, Comment } from 'semantic-ui-react';
import {
	firebaseObjectToArray,
	getEventChatRef
} from '../../../app/firestore/firebaseService';
import EventDetailedChatForm from './EventDetailedChatForm';
import { listenToEventChat } from '../eventActions';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

export default function EventDetailedChat({ eventId }) {
	const dispatch = useDispatch();
	const { comments } = useSelector((state) => state.event);

	useEffect(() => {
		getEventChatRef(eventId).on('value', (snapshot) => {
			if (!snapshot.exists()) return;
			// console.log(firebaseObjectToArray(snapshot.val()));
			dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())));
		});
	}, [eventId, dispatch]);

	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				inverted
				color='teal'
				style={{ border: 'none' }}
			>
				<Header>Chat about this event</Header>
			</Segment>

			<Segment attached>
				<Comment.Group>
					{comments.map((comment) => (
						<Comment key={comment.id}>
							<Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
							<Comment.Content>
								<Comment.Author as={Link} to={`/profile/${comment.uid}`}>
									{comment.displayName}
								</Comment.Author>
								<Comment.Metadata>
									<div>{formatDistance(comment.date, new Date())}</div>
								</Comment.Metadata>
								<Comment.Text>{comment.text}</Comment.Text>
								<Comment.Actions>
									<Comment.Action>Reply</Comment.Action>
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					))}
				</Comment.Group>
				<EventDetailedChatForm eventId={eventId} />
			</Segment>
		</>
	);
}
