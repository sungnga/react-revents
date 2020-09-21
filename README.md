# STEPS TO BUILDING THE REVENTS WEB APP

### CREATE-REACT-APP
- Run in command line. The --use-npm flag is to ensure that we're using the npm package manager: `npx create-react-app react-revents --use-npm`
- Once the React app has been successfully created, cd into the directory: `cd react-revents`
- Then run: `npm start`
- Can view the react-revents app in the browser: `http://localhost:3000`


## PROJECT SETUP
--------------------------
### Folder Structure:
- /src
-   /app
-     /layout
-       App.jsx
-   /features
-     /events
-       /eventDashboard
-         EventDashboard.jsx
-         EventFilters
-       /eventList
-         EventList.jsx
-         EventListItem.jsx
-         EventListAttendee.jsx
-     /nav
-       NavBar.jsx

### Semantic UI React
- Website: www.react.semantic-ui.com
- Semantic UI React and Semantic UI CSS
  - Run to install both: `npm i semantic-ui-react semantic-ui-css`
- In index.js file:
  - Import the semantic min css just above the styles.css file: `import 'semantic-ui-css/semantic.min.css';`

**Hot Module Replacement**
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
---------------------
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








## LIBRARIES AND PACKAGES USED IN THIS PROJECT
- Semantic UI React and Semantic UI CSS
  - Website: www.react.semantic-ui.com
  - Install: `npm i semantic-ui-react semantic-ui-css`
  - Import in index.js file. Above the styles.css import: `import 'semantic-ui-css/semantic.min.css';`








