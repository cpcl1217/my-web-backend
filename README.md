# Node.js Chat Application Backend

This is the backend for a chat application built with Node.js, Express, and Socket.IO. It serves as a backend chat room for website owners to communicate with frontend visitors.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/cpcl1217/my-web-backend.git
    cd my-web-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

Update the chat password in the `server.js` file:

```javascript
const CHAT_PASSWORD = "your_passwd";  // Set the chat room password
```

### Running the Application

To run the application locally, use the following command:

```bash
node server.js
```

The server will start on port 5000 by default.

## Deployment
You can deploy the application using Docker and Google Cloud Run. Follow these steps:

### Build a Docker image

```bash
docker build -t your-image-name .
```

### Push the Docker image to Google Artifact Registry

```bash
docker push your-image-name
```

Deploy the image to Google Cloud Run using the Google Cloud Console or the gcloud command line tool.

## API Endpoints

- GET /login: Validates the chat room password.
  - Query Parameters: password (string)
  - Responses:
    - 200 OK if the password is correct.
    - 401 Unauthorized if the password is incorrect.

## Socket.IO Events

- connection: Triggered when a client connects to the server.
- chat message: Triggered when a client sends a chat message. The message is broadcasted to all connected clients.
- disconnect: Triggered when a client disconnects from the server.

## CORS Configuration

The server is configured to allow CORS requests from any origin:

```javascript
app.use(cors({
  origin: '*'
}));
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
