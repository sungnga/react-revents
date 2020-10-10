import React, { useEffect, useState } from 'react';
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
import { CLEAR_COMMENTS } from '../eventConstants';

export default function EventDetailedChat({ eventId }) {
	const dispatch = useDispatch();
	const { comments } = useSelector((state) => state.event);
	const [showReplyForm, setShowReplyForm] = useState({
		open: false,
		commentId: null
	});

	function handleCloseReplyForm() {
		setShowReplyForm({ open: false, commentId: null });
	}

	useEffect(() => {
		getEventChatRef(eventId).on('value', (snapshot) => {
			if (!snapshot.exists()) return;
			// console.log(firebaseObjectToArray(snapshot.val()));
			dispatch(
				listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
			);
		});
		return () => {
			dispatch({ type: CLEAR_COMMENTS });
			getEventChatRef().off();
		};
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
				<EventDetailedChatForm eventId={eventId} parentId={0} />
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
								<Comment.Text>
									{comment.text.split('\n').map((text, i) => (
										<span key={i}>
											{text}
											<br />
										</span>
									))}
								</Comment.Text>
								<Comment.Actions>
									<Comment.Action
										onClick={() =>
											setShowReplyForm({ open: true, commendId: comment.id })
										}
									>
										Reply
									</Comment.Action>
									{showReplyForm.open &&
										showReplyForm.commendId === comment.id && (
											<EventDetailedChatForm
												eventId={eventId}
												parentId={comment.id}
												closeForm={handleCloseReplyForm}
											/>
										)}
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					))}
				</Comment.Group>
			</Segment>
		</>
	);
}
