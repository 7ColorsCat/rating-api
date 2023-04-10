## Customer Feedback Rating App

This is a simple and intuitive customer feedback rating app built with Node.js, React, and Socket.IO. It enables customers to provide ratings and feedback on their experiences with a service or product. The app collects feedback in real-time, allowing businesses to monitor customer satisfaction and make informed decisions to improve their services.
Features

   - Real-time feedback collection using Socket.IO
   - Responsive and user-friendly interface built with React

Requirements

    Node.js (version 14.x or higher)
    npm (version 6.x or higher)
    A modern web browser that supports ECMAScript 6 (Chrome, Firefox, Safari, or Edge)

1.Installation


    Clone the repository:
```
git clone https://github.com/katinbox/rating-api.git
```

2.Navigate to the project directory:

```
cd rating-api
```
3.Install dependencies:
```
npm install
```

4.Build the React frontend:

```
npm run build
```

5.Start the server:

```
npm run deloy
```
6.Open your web browser and navigate to http://localhost:3000 to access the app.

Usage
Customer Interface

Customers can access the interface to rate their experiences and provide feedback. They can select a rating from 1 to 5 stars and optionally leave a comment.
To configure the app, edit the config.js file in the root directory. You can customize the following options:

    port: The port number for the server (default: 3000)

Scripts

Refer to the package.json file for the available npm scripts:

    server: Starts the server with staging environment variables using nodemon for automatic restarts on file changes.
    client: Starts the React development server with a custom host.
    dev: Runs both the server and client concurrently.
    build: Builds the React frontend.
    deploy: Starts the server with production environment variables.
