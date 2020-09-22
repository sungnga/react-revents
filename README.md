# STEPS TO BUILDING THE REVENTS WEB APP

### CREATE-REACT-APP
- Run in command line. The --use-npm flag is to ensure that we're using the npm package manager: `npx create-react-app react-revents --use-npm`
- Once the React app has been successfully created, cd into the directory: `cd react-revents`
- Then run: `npm start`
- Can view the react-revents app in the browser: `http://localhost:3000`


## PROJECT SETUP
### Semantic UI React
- Website: www.react.semantic-ui.com
- Semantic UI React and Semantic UI CSS
  - Run to install both: `npm i semantic-ui-react semantic-ui-css`
- In index.js file:
  - Import the semantic min css just above the styles.css file: `import 'semantic-ui-css/semantic.min.css';`

### Hot Module Replacement
- The hot module replacement prevents a full page reload when we make changes to our code
- In index.js file:
  ```javascript
  const rootEl = document.getElementById('root');

  function render() {
    ReactDOM.render(<App />, rootEl);
  }

  if (module.hot) {
    module.hot.accept('./App', function () {
      setTimeout(render);
    });
  }

  render();
  ```

### VSCode extensions used:
- Auto Import - steoates
  - Configure the setting by going to preferences -> settings
  - Type in the search bar, autoimport. Under File to Scan, also add js and jsx to the list
- Auto Rename Tag - Jun Han
- Bracket Pair Colorizer 2 - CoenraadS
- ESLint - Dirk Baeumer
- Javascript Debugger (Nightly) - Microsoft
- Material Icon Theme - Philipp Kief
- npm Intellisense - Christian Kohler
- Path Intellisense - Christian Kohler
- Prettier - Code formatter - Esben Petersen
- Live Server - Ritwick Dey


## REACT CONCEPTS
- Components
- Virtual DOM
- One way binding
- JSX

**Components**
- Traditional web page: HTML, JS, CSS
- React: components which made up of JS, HTML, CSS

**React uses a Virtual DOM**
- React -> Virtual DOM -> Actual DOM
- Any updates we make are going to be stored inside a virtual representation of Document Object Model, and only those changes are going to be applied to the actual DOM
- This makes React pretty fast

**What is a Virtual DOM**
- Tree of JS Objects that represent the actual DOM itself
- We write the code as if we are recreating the entire DOM on every update and we rely on React to make the changes on our behalf
- Developer returns the DOM they wish to see
- React takes care of the transformation behind the scenes

**One way binding**
- Other libraries use 2 way bindings
  - Model updated in the DOM updates the component
- React bindings only go from component to Virtual DOM which updates the actual DOM
- This makes the code predictable and easy to debug

**Performance**
- The Virtual DOM:
  - Efficient diffing algorithms. React is going to take care of deciding what's necessary to update in the DOM
  - Update subtrees, the different parts of the DOM simultaneously 
  - Batch updates to the DOM
- Result = easy to use and optimized way to build web apps

**JSX**
- When we're writing code of React, what we're effectively doing is just creating Javascript functions that return JSX
- JSX adds an XML Syntax to Javascript, which makes React more elegant
- JSX tags have a tag name, attributes and children. Whilst it looks very similar to HTML, there are a few slight differences
- Note that we're not allowed to use the word 'class' inside JSX because the word 'class' is a reserved word in Javascript. Instead we use className to style our component


## S3: EVENT DASHBOARD PAGE LAYOUTS
**1. Building our first component - EventDashboard**
- This component renders two columns, a 10-column grid and a 6-column grid, using Semantic Grid component
- In src/features/events/eventDashboard folder, create a component/file called EventDashboard.jsx
- In EventDashboard.jsx file:
  - Import React: `import React from 'react';`
  - Import semantic Grid component: `import { Grid } from 'semantic-ui-react';`
  - Write an EventDashboard functional component
    - Render the Semantic UI Grid in JSX for now
    - Semantic UI uses a 16-column grid system
  ```javascript
  export default function EventDashboard() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <h2>Left Column</h2>
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Right Column</h2>
        </Grid.Column>
      </Grid>
    );
  }
  ```
- In src/app/layout folder, create a component/file called App.jsx
- In App.jsx file:
  - Import React: `import React from 'react';`
  - Import the EventDashboard component: `import EventDashboard from '../../features/events/eventDashboard/EventDashboard';`
  - Write an App functional component that renders other components to the page
  - Render the EventDashboard component inside JSX
  ```javascript
  export default function App() {
    return (
      <>
        <h1>Re-vents</h1>
        <EventDashboard />
      </>
    );
  }
  ```

**2. Create Nav Menu: NavBar component**
- Create Navigation menu
- In features/nav folder, create a component/file called NavBar.jsx
- In NavBar.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic Button, Container, and Menu: `import { Button, Container, Menu } from 'semantic-ui-react';`
  - Write a NavBar functional component that renders the navigation menu using Semantic UI components
  ```javascript
  export default function NavBar() {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header>
            <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
            Revents
          </Menu.Item>
          <Menu.Item name='Events' />
          <Menu.Item>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button basic inverted content='Login' />
            <Button
              basic
              inverted
              content='Register'
              style={{ marginLeft: '0.5em' }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
  ```
- In App.jsx file:
  - Import the NavBar component: `import NavBar from '../../features/nav/NavBar';`
  - Import Semantic Container: `import { Container } from 'semantic-ui-react';` 
  - Render the NavBar component just above the EventDashboard component. Also wrap the EventDashboard component in a container so we can apply styles to it
  ```javascript
  export default function App() {
    return (
      <>
        <NavBar />
        <Container className='main'>
          <EventDashboard />
        </Container>
      </>
    );
  }
  ```
- In src/app/layout folder, create a file called styles.css. This page will contain the projects css styles
- In styles.css file:
  - Apply background color styles to the nav menu
  - Apply styles for the main container so that there's a space between the navbar and the main content
  ```css
  body {
    background-color: #eaeaea;
  }

  .ui.fixed.menu {
    background-image: linear-gradient(
      135deg,
      rgb(24, 42, 115) 0%,
      rgb(33, 138, 174) 69%,
      rgb(32, 167, 172) 89%
    );
  }

  .ui.main.container {
    margin-top: 7em;
  }
  ```

**3. Create Event List Items: EventList, EventListItem, and EventListAttendee components**
- In the EventDashboard 10-column grid section, create and display the details of event list item that includes the title of the event, who is hosting the event, date, venue, description of the event, a button to view the event detail, and list of attendees
- In features/events/eventDashboard folder, create a component/file called EventList.jsx
- In EventList.jsx file:
  - Import React: `import React from 'react';`
  - Import the EventListItem component: `import EventListItem from './EventListItem';`
  - Write an EventList functional component that renders the EventListItem component several times
  ```javascript
  export default function EventList() {
    return (
      <>
        <EventListItem />
        <EventListItem />
        <EventListItem />
        <EventListItem />
      </>
    );
  }
  ```
- In features/events/eventDashboard folder, create a component/file called EventListItem.jsx
- In EventListItem.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';`
  - Import the EventListAttendee component: `import EventListAttendee from './EventListAttendee';`
  - Write an EventListItem functional component that renders the list item details using Semantic UI
    - Render several EventListAttendee components
  ```javascript
  export default function EventListItem() {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header content='Event Title' />
                <Item.Description>Hosted by Bob</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment>
          <span>
            <Icon name='clock' /> Date
            <Icon name='marker' />
            Venue
          </span>
        </Segment>

        <Segment secondary>
          <List horizontal>
            <EventListAttendee />
            <EventListAttendee />
            <EventListAttendee />
          </List>
        </Segment>

        <Segment clearing>
          <div>Description of event</div>
          <Button color='teal' floated='right' content='View' />
        </Segment>
      </Segment.Group>
    );
  }
  ```
- In features/events/eventDashboard folder, create a component/file called EventListAttendee.jsx
- In EventListAttendee.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic Image and List components: `import { Image, List } from 'semantic-ui-react';`
  - Write an EventListAttendee functional component that renders list items of users
  ```javascript
  export default function EventListAttendee() {
    return (
      <List.Item>
        <Image size='mini' circular src='/assets/user.png' />
      </List.Item>
    );
  }
  ```
- In the EventDashboard.jsx file:
  - Import the EventList component: `import EventList from './EventList';`
  - Render the EventList component inside the 10-column Grid component
  ```javascript
  <Grid.Column width={10}>
    <EventList />
  </Grid.Column>
  ```

**4. Create an Event Form: EventForm component**
- In features/events/eventForm folder, create a component/file called EventForm.jsx
- In EventForm.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Button, Form, Header, Segment } from 'semantic-ui-react';`
  - Write an EventForm functional component that renders a form using Semantic UI to create an event
    ```javascript
    export default function EventForm() {
      return (
        <Segment clearing>
          <Header content='Create new event' />
          <Form>
            <Form.Field>
              <input type='text' placeholder='Event Title' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Category' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Description' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='City' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Venue' />
            </Form.Field>
            <Form.Field>
              <input type='date' placeholder='Date' />
            </Form.Field>
            <Button type='submit' floated='right' positive content='Submit' />
            <Button type='submit' floated='right' content='Cancel' />
          </Form>
        </Segment>
      );
    }
    ```
- In EventDashboard.jsx file:
  - Import the EventForm component: `import EventForm from '../eventForm/EventForm';`
  - Render the component inside the 6-column Grid component
  ```javascript
  <Grid.Column width={6}>
    <EventForm />
  </Grid.Column>
  ```

**5. Passing props down to child components**
- In src/app/api foler, there's a sampleData.js file which contains sample data of events that we can use display events information
- In EventDashboard.jsx file:
  - Import the sample data file: `import { sampleData } from '../../../app/api/sampleData';`
  - The EventDashboard component is a parent of the EventList component. Parent can pass properties/props down to child components
  - Pass the events props to the EventList child component and assign its value to sampleData
    - `<EventList events={sampleData} />`
- In EventList.jsx file:
  - To receive properties/props being passed down from the parent component, simply take `props` as an argument
    - `export default function EventList(props) { ... }`
  - Now the EventList component has assess to the events sample data by using the `props.events` notation
  - We can further destructure the events object from props
    - `export default function EventList({ events }) { ... }`
  - Loop over the events array using the .map() method and pass down the event item, as event props, to the EventListItem component
  ```javascript
  export default function EventList({ events }) {
    return (
      <>
        {events.map((event) => (
          <EventListItem event={event} key={event.id} />
        ))}
      </>
    );
  }
  ```
- In EventListItem.jsx file:
  - Receive the event props as an argument from EventList parent component and destructure it
    - `export default function EventListItem({ event }) { ... }`
  - Now we can update the event generic detail information with the event properties, which have the sample data
  - To display the list of attendees, loop through the event.attendees array using the .map() method and pass down the attendee item, as attendee props, to the EventListAttendee child component
  ```javascript
  export default function EventListItem({ event }) {
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
            <Icon name='clock' /> {event.date}
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
          <Button color='teal' floated='right' content='View' />
        </Segment>
      </Segment.Group>
    );
  }
  ```
- In EventListAttendee.jsx file:
  - Receive the attendee props as an argument from EventListItem parent component and destructure it
    - `export default function EventListAttendee({ attendee }) { ... }`
  - Replace the image source with `attendee.photoURL`
  ```javascript
  export default function EventListAttendee({ attendee }) {
    return (
      <List.Item>
        <Image size='mini' circular src={attendee.photoURL} />
      </List.Item>
    );
  }
  ```

**6. React component state: React useState hook**
- In EventDashboard.jsx file:
  - Import react useState hook: `import React, { useState } from 'react';`
  - Create an events state and initialize its value to sampleData. Now the events state holds the data sample coming from the dataSample.js file
    - `const [events, setEvents] = useState(sampleData);`
  - For the events props that we pass down to the EventList child component, we can assign its value to events state
    - `<EventList events={events} />`
- Now let's work on showing and hiding the event form based on the state. When the "Create Event" button in the NavBar is clicked, we want to display the EventForm. When the "Cancel" button in the EventForm is clicked, we want to hide the EventForm
- In App.jsx file:
  - Import react useState hook: `import React, { useState } from 'react';`
  - Create a formOpen state and initialize it to false
    - `const [formOpen, setFormOpen] = useState(false);`
  - Pass the setFormOpen method down as props to the NavBar child component. The NavBar component will comsume this method, setting the state to true, when the 'Create Event' button is clicked. This will trigger the EventForm component to display in the EventDashboard component
    - `<NavBar setFormOpen={setFormOpen} />`
  - Pass the formOpen state and setFormOpen method down as props to the EventDashboard component
    - `<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />` 
  ```javascript
  export default function App() {
    const [formOpen, setFormOpen] = useState(false);

    return (
      <>
        <NavBar setFormOpen={setFormOpen} />
        <Container className='main'>
          <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
        </Container>
      </>
    );
  }
  ```
- In the NavBar.jsx file:
  - Receive the setFormOpen props as an argument from App parent component and destructure it
    - `export default function NavBar({ setFormOpen }) { ... }`
  - In the 'Create Event' button element
    - Add an onClick event that will execute the setFormOpen method when the button is clicked
    - Execute the setFormOpen method inside an arrow/anonymous function and pass in true as an argument
    - We execute the setFormOpen method inside an arrow function because we want to call setFormOpen() only when the button is clicked. We don't want to execute setFormOpn() when the NavBar component loads
    - `<Button onClick={() => setFormOpen(true)} positive inverted content='Create Event' />`
- In EventDashboard.jsx file:
  - Receive the formOpen and setFormOpen props as an argument from App parent component and destructure them
    - `export default function EventDashboard({ formOpen, setFormOpen }) { ... }`
  - Pass the setFormOpen method down as props to the EventForm child component. The EventForm component will comsume this method, setting the state to false, when the 'Cancel' button is clicked
  - We can show or hide the event form based on the state
    - `{formOpen && <EventForm setFormOpen={setFormOpen} />}`
    - Whatever is on the left of && is true, do whatever is on the right of &&
    - Only display the EventForm component if formOpen state is true
    - This means that when the when the 'Create Event' in the NavBar is clicked, formOpen state is true and EventForm will display
    - When the 'Cancel' button in the EventForm component is clicked, formOpen state is false and EventForm will not display
  ```javascript
  export default function EventDashboard({ formOpen, setFormOpen }) {
    const [events, setEvents] = useState(sampleData);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          {formOpen && <EventForm setFormOpen={setFormOpen} />}
        </Grid.Column>
      </Grid>
    );
  }
  ```
- In the EventForm.jsx file:
  - Receive the setFormOpen props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ setFormOpen }) { ... }`
  - In the 'Cancel' button element
    - Add an onClick event and execute the setFormOpen() method inside an arrow function and set it to false
    ```javascript
    <Button
      onClick={() => setFormOpen(false)}
      type='submit'
      floated='right'
      content='Cancel'
    />
    ```


## S4: CRUD OPERATIONS IN REACT
- Controlled Components
  - No direct access to the DOM
  - So no access to Input
  - Only concerned with altering State
  - Rely on React to manipuate the DOM via the Virtual DOM

**1. Basic forms in React: EventForm**
- Enable the EventForm component to receive input values from the user and update the values state with the input values
- In EventDashboard.jsx file:
  - Since we're going to be updating events, we're going to be updating them in events state. So we want to pass down the setEvents method as props to the EventForm child component 
    - `<EventForm setFormOpen={setFormOpen} setEvents={setEvents} />`
- In EventForm.jsx file:
  - Receive the setEvents props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ setEvents }) { ... }`
  - Create an initialValues object with initial empty-value properties
    ```javascript
    const initialValues = {
      title: '',
      category: '',
      description: '',
      city: '',
      venu: '',
      date: ''
    };
    ```
  - Create a values state and initialize its value to the initialValues object. Note that this values state is an object
    - `const [values, setValues] = useState(initialValues);`
  - In the Form element, the handleFormSubmit method is executed when the onSubmit event is triggered. Meaning, when the Submit button is clicked
    - `<Form onSubmit={handleFormSubmit}>`
  - For each Form input element, the handleInputChange method is executed when the input value changes via the onChange event being triggered
    - add name, value, and onChange properties to each form input element
    ```javascript
    <Form.Field>
      <input
        type='text'
        placeholder='Event Title'
        name='title'
        value={values.title}
        onChange={(e) => handleInputChange(e)}
      />
    </Form.Field>
    ```
  - Write a handleInputChange method that updates the values state with the input values
    - It takes the input event as argument
    - Each input element has name and value properties, so we can destructure those from e.target
    - Update the values state with the input values based on its name and value properties
    ```javascript
    function handleInputChange(e) {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    }
    ```
  - Write a handleFormSubmit method that creates an event
    - Console log the values state for now
    ```javascript
    function handleFormSubmit() {
      console.log(values);
    }
    ```

**2. Creating an event, cuid**
- We create a new event by updating the events state with the new event. Do this by creating a method and pass in the values state which comes from the form input values
- In EventDashboard.jsx file:
  - Write a handleCreateEvent method that adds a new event received to the events state using the setEvents() method
    - It takes event as an argument
    - Note that the events state is an array. So when we call the setEvents(), we add the new event to an array
    ```javascript
    function handleCreateEvent(event) {
      setEvents([...events, event]);
    }
    ```
  - Then pass down this handleCreateEvent method as createEvent props to the EventForm child component
    - `<EventForm createEvent={handleCreateEvent} />`
- In EventForm.jsx file:
  - Receive the createEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ createEvent }) { ... }`
  - In the handleFormSubmit() method
    - Execute the createEvent method and pass in the values state as argument
    ```javascript
    function handleFormSubmit() {
      createEvent(values);
    }
    ```
- Now, when we hit form submit to create a new event, we will run into 2 errors
  - First is, we don't have a unique event id. In the EventList component, when we're mapping over the events array, it's expecting to find an event.id for eachh event
  - Second is, our values object state does not have an attendees property. Since the attendees array is not defined and the .map() method is called on it, we get an error
  - Solution: need to provide the event an id and an array of attendees
- Install a cuid package, a unique identifier: `npm install cuid`
- In EventForm.jsx file:
  - Import the cuid: `import cuid from 'cuid';`
  - In the handleFormSubmit() method:
    - What we provide to the createEvent() method is the existing values state object, plus an id property with the cuid value
      - Also add a hostedBy property. Set a default string value for now
      - Also add an attendees property. Set it to an empty array for now
      - Also add a hostPhotoURL property. Set it to a static image for now
    - Lastly, once the form has been submitted to create an event, we want to close the form. Do this by calling the setFormOpen() method and set it to false 
    ```javascript
    function handleFormSubmit() {
      createEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '/assets/user.png'
      });
      setFormOpen(false);
    }
    ```

**3. Selecting an event to read**
- When we click on the 'View' button on an event, it opens up the event form and populates the values from the event inside the form as well. We need to create a selectedEvent state to store the selected event values. And depending on the condition of this state, we can either show an empty form or a form with the values from the event
- In App.jsx file:
  - Create a selectedEvent state and give its initial value of null
    - `const [selectedEvents, setSelectedEvent] = useState(null);`
  - Write a handleSelectEvent method that sets the selectedEvent state to the event and opens the EventForm
    - It takes event as an argument
  - Write a handleCreateFormOpen method that sets the selectedEvent to null and opens the EventForm
    - It doesn't take any arguments
  - Pass down the handleCreateFormOpen method as setFormOpen props to the NavBar child component
  - For the EventDashboard child component, we pass down the handleSelectEvent method and the selectedEvent state as props
  ```javascript
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
        <NavBar setFormOpen={handleCreateFormOpen} />
        <Container className='main'>
          <EventDashboard
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            selectEvent={handleSelectEvent}
            selectedEvent={selectedEvent}
          />
        </Container>
      </>
    );
  }
  ```
- In EventDashboard.jsx file:
  - Receive the selectEvent and selectedEvent props as an argument from App parent component and destructure them
    - `export default function EventDashboard({ selectEvent, selectedEvent }) {...}`
  - Pass down the selectEvent method as selectEvent props to the EventList child component
    - `<EventList events={events} selectEvent={selectEvent} />`
  - Pass down the selectedEvent state as selectedEvent props to the EventForm child component. This way we can see the selected form
    - `<EventForm selectedEvent={selectedEvent} />`
- In EventList.jsx file:
  - Receive the selectEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventList({ events, selectEvent }) {...}`
  - Pass down this props as selectEvent props to the EventListItem child component
    - `<EventListItem event={event} key={event.id} selectEvent={selectEvent} />`
- In EventListItem.jsx file:
  - Receive the selectEvent props as an argument from EventList parent component and destructure it
    - `export default function EventListItem({ event, selectEvent }) {...}`
  - In the 'View' Button element:
    - Add an onClick event property that executes the selectEvent() method when the 'View' button is clicked
    - Call the selectEvent() method inside an arrow function and pass in the event as argument
    ```javascript
    <Button
      onClick={() => selectEvent(event)}
      color='teal'
      floated='right'
      content='View'
    />
    ```
- In EventForm.jsx file:
  - Receive the selectedEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ selectedEvent }) {...}`
  - We're going to use the ?? null conditional operator to check if the selectedEvent state is null
    - If selectedEvent state is null, then we pass anything to the right of ??. This means that the initialValues is set to the empty-string object
    - If selectedEvent state is NOT null, then the initialValues is set to the selectedEvent state values
    - Remember that when the 'View' button is clicked, the setSelectedEvent() method is called to set the event values to the selectedEvent state
  ```javascript
	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venu: '',
		date: ''
	};
  ```

**4. Controlled components with a key: EventForm**
- The current problem we have is that when we click on the 'View' button to view a different event or click on the 'Create Event' button to create a new event, nothing causes the page to re-render so nothing happens. Behind the scene, however, the EventForm component does have the correct information in props when one of those buttons are clicked
- When we send new props to a component, it does not cause the component to be re-rendered. The work-around solution is to use the special React attibute called key. We can add a key property to a component. So when the key changes, the component will be recreated with a freshly initialized state
- So we're going to give our EventForm component a key
- In EventDashboard.jsx file:
  - For the EventForm child component, add a key property
  - For the key value, we first check to see if we have a selected event in selectedEvent state, if selectedEvent is not null
    - If it's not null, set the key value to selectedEvent.id
    - If it's null, then set the key to be null itself
  - `<EventForm key={selectedEvent ? selectedEvent.id : null} />`
- Lastly, if the selected event form is opened, we want the form title to say 'Edit the event'. If it's a new event form, the form title should say 'Create new event'
- In EventForm.jsx file:
  - In the Header element, add a conditional to display one or the other
  - `<Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />`

**5. Updating an event**
- We can update an event in the events state by check the updatedEvent id with the event id in the events state. If it matches, we can update the event with the new values. Write a method to handle the update event
- In EventDashboard.jsx file:
  - Write a handleUpdateEvent method that updates an event in the events state based on the event id. Also sets the selectedEvent back to null and closes the form
    - This method takes an updatedEvent as argument
    - Use the setEvents() method to set the events state with the updated event, if the updatedEvent id matches with the event id in the events state
    - Use the selectEvent() method to set the selectedEvent state back to null
    ```javascript
    function handleUpdateEvent(updatedEvent) {
      setEvents(
        events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
      );
      selectEvent(null);
    }
    ```
  - Pass down this handleUpdateEvent method as updateEvent props to the EventForm child component
    - `<EventForm updateEvent={handleUpdateEvent} />`
- In EventForm.jsx file:
  - Receive the updateEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ updateEvent }) {...}`
  - In the handleFormSubmit() method:
    - Use a ternary operator to check if selectedEvent state is not null
    - If it's not null, call the updateEvent() method. What we give to the method is the all the current values in selectedEvent state, plus the updated values that's replacing the values in selectedEvent state
    - If it's null, then call the createEvent() method
    ```javascript
    function handleFormSubmit() {
      selectedEvent
        ? updateEvent({ ...selectedEvent, ...values })
        : createEvent({
            ...values,
            id: cuid(),
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '/assets/user.png'
          });
      setFormOpen(false);
    }
    ```

**6. Deleting an event**
- In EventDashboard.jsx file:
  - Write a handleDeleteEvent method removes an event from the events state based on its id
    - This method takes an eventId as argument
    - Call the setEvents() method to update the events state
    - Use the .filter() method on events to filter out all the events that does not match the eventId, hence removes the event that matches
    ```javascript
    function handleDeleteEvent(eventId) {
      setEvents(events.filter((evt) => evt.id !== eventId));
    }
    ```
  - Pass down this handleDeleteEvent method as deleteEvent props to the EventList child component
    - `<EventList deleteEvent={handleDeleteEvent} />`
- In EventList.jsx file:
  - Receive the deleteEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventList({ deleteEvent }) {...}`
  - Pass down this DeleteEvent method as deleteEvent props to the EventListItem child component
    - `<EventListItem deleteEvent={deleteEvent} />`
- In EventListItem.jsx file:
  - Receive the deleteEvent props as an argument from EventList parent component and destructure it
    - `export default function EventListItem({ deleteEvent }) {...}`  
  - In the render section
    - Create a 'Delete' Button element
    - In the Delete Button element, add an onClick event property that executes the deleteEvent() method when the 'Delete' button is clicked
    - Call the deleteEvent() method inside an arrow function and pass in the event.id
    ```javascript
    <Button
      onClick={() => deleteEvent(event.id)}
      color='red'
      floated='right'
      content='Delete'
    />
    ```


## S5: ROUTING IN REACT
- We will be using React Route 5
- React Router is broken into 3 packages:
  - react-router
  - react-router-dom
  - react-router-native
- React-router-dom and react-router-native re-export all of react-router. React-router contains all of the main functionality. So we only need to install react-router-dom and we get all of the react-router functionality
- The Router
  - `<BrowserRouter>`
    - Handle dynamic requests
  - `<HashRouter>`
    - Static websites
  - Can only have a single child component
  - Surround our `<App />` to work with this limitation
- History
  - The history object is part of the browser. Every browser has a history object
  - The way the routing system works is it uses a history object which:
    - Keeps track of the current location
    - Re-renders whenever that changes
  - The history object comes with a number of methods
    - What we typically do is use the push() method to push a new route into history and this will cause the component to re-render and display what it is we're routing to on the page
  
**Install react-router-dom**
  - Install: `npm i react-router-dom`

**1. Adding some additional components to route to**
- In features folder, create a new folder called home. In home folder, create a component/file called HomePage.jsx
- In HomePage.jsx file:
  - Import React: `import React from 'react';`
  - Write a HomePage functional component that renders a 'Homeage' text for now
- In features/events folder, create a new folder called eventDetailed. In eventDetailed folder, create a component/file called EventDetailedPage.jsx
- In EventDetailedPage.jsx file:
  - Import React: `import React from 'react';`
  - Write a EventDetailedPage functional component that render a 'Event Detailed Page' text for now
  
**2. Routing configuration**
- Website: https://reactrouter.com/web/guides/quick-start
- In index.js file:
  - Import BrowserRouter component: `import { BrowserRouter } from 'react-router-dom';`
  - Wrap the App component inside the BrowserRouter component
  ```javascript
  function render() {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootEl
    );
  }
  ```
- So now our App component has routing capability. We can setup the routes inside there
- In App.jsx file:
  - Import the Route component: `import { Route } from 'react-router-dom';`
  - Create routes using the Route component for HomePage, EventDashboard, EventDetailedPage, and EventForm components. Each route has a unique path
  ```javascript
  <Container className='main'>
    <Route path='/' exact component={HomePage} />
    <Route path='/events' exact component={EventDashboard} />
    <Route path='/events/:id' exact component={EventDetailedPage} />
    <Route path='/createEvent' exact component={EventForm} />
  </Container>
  ```

**3. Using NavLinks and Links**
- `<NavLink>` is a special version of the `<Link>` that will add styling attribute to the rendered element when it matches the current URL. It adds an activeClass and applies styles to a link
- In NavBar.jsx file:
  - For Semantic UI components, we can use an 'as' property and give its value the name of another component that we want the Semantic component to act as
  - In our case, we want the Semantic `<Menu.Item>` to act as a `<NavLink>` component. Then we can pass in properties that the `<NavLink>` is expecting, such as the 'to' property pathname and 'exact'
  - Note that we no longer use the onClick event for the 'Create Event' button to direct user to the EventForm. We can use the NavLink instead
  ```javascript
  <Menu.Item as={NavLink} exact to='/' header>
    <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
    Revents
  </Menu.Item>
  <Menu.Item as={NavLink} to='/events' name='Events' />
  <Menu.Item as={NavLink} to='/createEvent'>
    <Button positive inverted content='Create Event' />
  </Menu.Item>
  ```

**4. Home page styling**
- We don't want the NavBar to show when we're on home page. We want something that takes up the entire screen and provide a button that takes us to the events page
- In HomePage.jsx file:
  - Add content and styles to the page using Semantic UI
  ```javascript
  export default function HomePage() {
    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
        <Container>
          <Header as='h1' inverted>
            <Image
              size='massive'
              src='/assets/logo.png'
              style={{ marginBottom: 12 }}
            />
            Re-vents
          </Header>
          <Button size='huge' inverted>
            Get started
            <Icon name='right arrow' inverted />
          </Button>
        </Container>
      </Segment>
    );
  }
  ```
- In styles.css file:
  - Add styles to the home page
  ```css
  .masthead {
    display: flex;
    align-items: center;
    background-image: linear-gradient(
      135deg,
      rgb(24, 42, 115) 0%,
      rgb(33, 138, 174) 69%,
      rgb(32, 167, 172) 89%
    ) !important;
    height: 100vh;
  }

  .masthead h1.ui.header {
    font-size: 4em;
  }
  ```
- In App.jsx file:
  - For the HomePage to appear outside of the NavBar and Container components, we need create another route that renders the NavBar and Container separately from the HomePage
  - This new route takes a path with an expression that says, anything after the / forward slash plus something else, render it differently
  - This new route also takes a render property rather an a component property. This render property takes a function. And inside this function, we can render the NavBar and the Container components. Wrap it inside a fragment tag because it only allows one child component
  ```javascript
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
  ```
- Since the HomePage component is inside a `<Route>`, we have access to the routing properties. This is props being passed down to the HomePage component. One of these props is the history object. We can use the history.push() method to push another route onto the history object and push the user to that particular route
- In HomePage.jsx file:
  - Receive the history object props as an argument and destructure it
    - `export default function HomePage({ history }) {...}`
  - In the 'Get started' Button element:
    - Add an onClick event property and execute the history.push() method to direct user to a different route when the button is clicked
    - Call the history.push() method inside an arrow function and pass in the pathname as the argument
    ```javascript
    <Button onClick={() => history.push('/events')} size='huge' inverted>
      Get started
      <Icon name='right arrow' inverted />
    </Button>
    ```





















## LIBRARIES AND PACKAGES USED IN THIS PROJECT
- Semantic UI React and Semantic UI CSS
  - Website: www.react.semantic-ui.com
  - Install: `npm i semantic-ui-react semantic-ui-css`
  - Import in index.js file. Above the styles.css, import: `import 'semantic-ui-css/semantic.min.css';`
- cuid, a unique identifier
  - Install: `npm i cuid`
  - Import in EventForm.jsx file: `import cuid from 'cuid';`
- React Router 5
  - Install: `npm i react-router-dom`






