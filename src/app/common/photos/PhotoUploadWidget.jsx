import React, { useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

export default function PhotoUploadWidget() {
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);

	return (
		<Grid>
			<Grid.Column width={4}>
				<Header color='teal' sub content='Step 1 - Add Photo' />
				<PhotoWidgetDropzone setFiles={setFiles} />
			</Grid.Column>
			<Grid.Column width={1} />

			<Grid.Column width={4}>
				<Header color='teal' sub content='Step 2 - Resize' />
				{files.length > 0 && (
					<PhotoWidgetCropper
						setImage={setImage}
						imagePreview={files[0].preview}
					/>
				)}
			</Grid.Column>
			<Grid.Column width={1} />

			<Grid.Column width={4}>
				<Header color='teal' sub content='Step 3 - Preview & Upload' />
				{files.length > 0 && (
					<>
						<div
							className='img-preview'
							style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
						/>
						<Button.Group>
							<Button style={{ width: 100 }} positive icon='check' />
							<Button style={{ width: 100 }} icon='close' />
						</Button.Group>
					</>
				)}
			</Grid.Column>
		</Grid>
	);
}
