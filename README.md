## Getting started
1. Install Amplify CLI (https://docs.amplify.aws/cli/start/install)
2. Initialize the project with `amplify init`
3. Choose the staging environment
4. Amplify will require AWS Credentials from you. Cezar can give you permission.

To re-build the css after changing tailwindcss configs, run `npm run build:css`

## Behaviors
1. On the annotation path (`/annotation`) we have the AnnotationScreen. This compoent makes a call to get all posts for the project and stores them in a Redux store. Each post has an image associated with it, which can make the download of each post a bit slow. To fix that, the Redux store is populated with objects that have a PostImgDownload object instead of an image. The PostImgDownload object is a promise, that upon resolving, updates the object that contains it with the image that was downloaded.
2. When creating a new post from a screenshot, the screenshot image is being uploaded while the post form is being filled out. Right before presenting the NewPostForm, we create an image promise for the upload. The image promise is being awaited on in the form. This gets rid of some latency that I was experiencing when creating a new post (due to the image upload). Image upload is effectively 'parallel' to the form filling.

## Auto-genned README.md:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
