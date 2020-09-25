import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import TestModal from './TestModal';
import { decrement, increment } from './testReducer';

export default function SandBox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);
	console.log(data)
	return (
		<>
			<h1>Testing</h1>
			<h3>The data is: {data}</h3>
			<Button
				onClick={() => dispatch(increment(10))}
				content='Increment'
				color='green'
			/>
			<Button
				onClick={() => dispatch(decrement(20))}
				content='Decrement'
				color='red'
			/>
			<Button
			onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: {data}}))}
			content='Open Modal'
			color='teal'
		/>
		</>
	);
}
