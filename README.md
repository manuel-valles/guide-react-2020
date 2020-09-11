# React Development | Complete Course

A step-by-step guide of a React course (2020) with the main tips from the Frontend Masters course: https://frontendmasters.com/courses/complete-react-v5/

1. Intro

   - Font:
     - https://github.com/tonsky/FiraCode
     - \$ choco install firacode (as Admin)
     - VSCode: Ctrl + ,
     ```javascript
     "editor.fontFamily": "Fira Code",
     "editor.fontLigatures": true
     ```

2. Pure React
3. Tools:
   - **Prettier** (format project constantly):
     - $ npm i -D prettier
     - Add the script to the package.json:
     ```json
     "scripts": {
         "format": "prettier \"src/**/*.{js,html}\" --write"
     }
     ```
     - $ npm run format
     - Install the Prettier Extension for VSCode:
       - Ctrl+, and look for:
            - format on save
            - require config (check the Prettier: Require Config)
       - Create **.prettierrc** with an empty object (it will apply any config to the files every time you save them)
   - **ESLint**:
     - $ npm i -D eslint eslint-config-prettier
     - Install extra packages for VSCode/ESLint to understand jsx files:
        - $ npm i -D babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
     - Install an ESLint plugin to deal with Hooks: 
        - $ npm i -D eslint-plugin-react-hooks
     - Create **.eslintrc.json**
     ```json
     {
        "extends": [
            "eslint:recommended",
            "plugin:import/errors",
            "plugin:react/recommended",
            "plugin:jsx-a11y/recommended", 
            "prettier", 
            "prettier/react"
        ],
        "rules":{
            "react/prop-types": 0,
            "no-console": 1,
            "react-hooks/rules-of-hooks": 2,
            "react-hooks/exhaustive-deps": 1
        },
        "plugins": ["react", "import", "jsx-a11y", "react-hooks"],
        "parserOptions": {
            "ecmaVersion": 2018,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "env": {
            "es6": true,
            "browser": true,
            "node": true
        },
        "settings": {
            "react": {
                "version": "detect"
            }
        }
     } 
     ```
     - Add the script to the package.json:
     ```json
     "lint": "eslint \"src/**/*.{js,jsx}\" --quiet"
     ```
     - $ npm run lint
     - Install the ESLint Extension for VSCode (it will highlight the problems in files)
    - Example of **.gitignore**
    ```
    node_modules/
    .cache/
    dist/
    coverage/
    .vscode/
    .env
    ```
    - **Parcel** (A bundler with no configuration needed -vs Webpack)
        - $ npm i -D parcel-bundler
        - Add the script to the package.json:
        ```json
        "dev": "parcel src/index.html"
        ```
        - This *parcel* can be found on node_modules/.bin/
        - $ npm run dev
            - Go to: http://localhost:1234 
        - It also installs any package dectected from imports. For example:
            - ```javascript
                import { ANIMALS } from '@frontendmasters/pet';
              ```
            - ```json 
                "@frontendmasters/pet": "^1.0.3" 
              ```
    - **React & ReactDOM**
        - $ npm i react react-dom
4. JSX
5. Hooks:
    - Anything started by 'use', such as useState and useEffect;
    - It's a destructuring array where the first one is the default value and the second is an updater function. e.g: [location, setLocation];
    - It should never go inside an if statement;

6. Effects:
    - Related to Lifecycles;
    - useEffect is scheduled during the first render;
    - The last parameter is the list (array) of dependencies (order doesn't matter) that will make it render again. If it's not set, it will render constantly, and if you set it empty [], it will render just once (first time).

7. Dev Tools:
    - Parcel takes care of the variable NODE_ENV. Development is like 4x larger and 40x slower than production;
    - Strict Mode (<React.StrictMode></React.StrictMode>) helps you to feature prove your app, like not allowing to use things that will be sooned be deprecated. It can be used just in sole components. 
    ```javascript
    const App = () => {
        return (
            <React.StrictMode>
                <div>
                    <h1 id="something-important">Adopt Me!</h1>
                    <SearchParams />
                </div>
            </React.StrictMode>
        );
    };
    ```

8. Async & Routing:
    - Add the property 'browserlist' to the package.json, so Parcel won't use Babel to translate our async/await calls.
    ```json
    {
        "browserslist": ["last 2 Chrome versions"]
    }
    ```
    -  In order to run in offline mode, just make sure that PET_MOCK=mock is in your environmental variables:
        - $ npm install -D cross-env;
        - Add this to your package.json's scripts:
        ```json
        "dev:mock": "cross-env PET_MOCK=mock npm run dev"
        ```
        - If it doesn't work correctly, just remove the .cache & dist folders.
    - **Reach Router**:
        - It is a router from one of the creators of React Router, Ryan Florence, who made a simpler, more accessible, and easier to accomplish advanced tasks like animated transitions.
        ```javascript
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
        ```
    - There is a funny Debugger Option that can be included in a component &#x1F9D0;:
        ```javascript
        <pre>
            <code>{JSON.stringify(props, null, 4)}</code>
        </pre>
        ```

9. Class Components:
    - It must have a render() method;
    - **componentDidMount** is a function that's called after the first rendering is completed (pretty similar to a *useEffect*). This is typically for the data fetching.
    - **this.props** is read-only (from parent to child).
    - **this.state** is a self-contained within a class, so you cannot modify it outside. It creates an instance that can be modified with the **this.setState({})**.
    - A better way to instance the props is using class properties and configuring the Babel to handle it:
        - ```$ npm install -D babel-eslint @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react```
        - Create a .babelrc file with the specific presets and plugins:
        ```json
        {
            "presets": ["@babel/preset-react", "@babel/preset-env"],
            "plugins": ["@babel/plugin-proposal-class-properties"]
        }
        ```
        - Add the parser option to .eslintrc.json:
        ```json
        "parser": "babel-eslint",
        ```
    - **getDerivedStateFromProps** is a special React method, that must be static, that takes a set of props and gives back a new set of states.
    - The **unary plus operator** (+) precedes its operand and evaluates to its operand but attempts to convert it into a number, if it isn't already.
    - Whenever you're passing functions down to children or event listeners, use an arrow function to guarantee that 'this' is correct.

10. Error Bounderies:
    - Docs: https://reactjs.org/docs/error-boundaries.html);
    - You can use Error Bounderies only with class components;
    - They allow you to catch the API errors without crashing your app;
    - Error boundaries only catch errors in the components below them in the tree (children). An error boundary can’t catch an error within itself. If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it. This, too, is similar to how catch {} block works in JavaScript.
    - **{...props}** will spread the props across the component, like *id={props.id}*
    ```javascript
    export default function DetailsWithErrorBoundary(props) {
        return (
            <ErrorBoundary>
                <Details {...props} />
            </ErrorBoundary>
        );
    }
    ```
    - Example to fake an error:
    ```javascript
    componentDidMount() {
        throw new Error('LOL');
    ```

11. Context:
    - **React Context** is a stable datastore API (much easier than Redux), where you can stick anything there, like a string or a Hook.
        ```javascript
        // state & updater (the empty function - not doing anything so far - placeholder).
        createContext(['green', () => {}])
        ```
    - You must wrap anything with the Context Component to have access to it, e.g. in the *App.js*:
        ```javascript
        <ThemeContext.Provider value={themeHook}>
            <div>
            <header>
                <Link to="/">Adopt Me!</Link>
            </header>
            <Router>
                <SearchParams path="/" />
                <Details path="/details/:id" />
            </Router>
            </div>
        </ThemeContext.Provider>
      ``` 
    - It's a bit more complex with the Classes:
        ```javascript
        <ThemeContext.Consumer>
            {(themeHook) => (
              <button style={{ backgroundColor: themeHook[0] }}>
                Adopt {name}
              </button>
            )}
        </ThemeContext.Consumer>
        // OR
        <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>
                Adopt {name}
              </button>
            )}
        </ThemeContext.Consumer>
        ```
    - To update the Context (e.g. theme) you just need to take advantage of the fact that the Context is a Hook (*setTheme*) that lives in the App. So it will persist through navigation:
        ```javascript
        const [theme, setTheme] = useContext(ThemeContext);
        ```
