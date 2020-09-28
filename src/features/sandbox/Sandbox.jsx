import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import TestMap from './TestMap';
import TestPlaceInput from './TestPlaceInput';
import { decrement, increment } from './testReducer';

export default function SandBox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);
	console.log(data);
	const defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
	};
	const [location, setLocation] = useState(defaultProps);

	function handleSetLocation(latLng) {
		setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
	}
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
				onClick={() =>
					dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
				}
				content='Open Modal'
				color='teal'
			/>
			<div style={{ marginTop: 15 }}>
				<TestPlaceInput setLocation={handleSetLocation} />
				<TestMap location={location} />
			</div>
		</>
	);
}
