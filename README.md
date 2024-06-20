# Backend server for windows form app 

This is a simple Node.js API for managing submissions, built using Express. The API supports creating, reading, updating, and deleting submissions stored in a JSON file.

## Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)

## Getting Started

Follow these instructions to set up and run the server on your local machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Server

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will start and run on `http://localhost:3000`.

## API Endpoints

### Ping the Server

- **Endpoint:** `/ping`
- **Method:** `GET`
- **Description:** Check if the server is running.
- **Response:** `true`

### Submit Form Data

- **Endpoint:** `/submit`
- **Method:** `POST`
- **Description:** Submit new form data.
- **Request Body:**
  ```json
  {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "github_link": "https://github.com/johndoe",
      "stopwatch_time": "00:10:15"
  }
  ```
- **Response:**
  ```json
  {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "github_link": "https://github.com/johndoe",
      "stopwatch_time": "00:10:15"
  }
  ```

### Read All Form Data

- **Endpoint:** `/read`
- **Method:** `GET`
- **Description:** Read all submitted form data.
- **Response:** Array of submission objects.

### Read Form Data by Index

- **Endpoint:** `/read/:index`
- **Method:** `GET`
- **Description:** Read form data by index.
- **Parameters:** `index` - Index of the submission to retrieve.
- **Response:** Submission object or error message if not found.

### Update Form Data

- **Endpoint:** `/update/:id`
- **Method:** `PUT`
- **Description:** Update form data by ID.
- **Parameters:** `id` - ID of the submission to update.
- **Request Body:** Partial or full submission object to update.
- **Response:** Updated submission object or error message if not found.

### Delete Form Data

- **Endpoint:** `/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete form data by ID.
- **Parameters:** `id` - ID of the submission to delete.
- **Response:** Success message or error message if not found.

## Error Handling

Each endpoint returns appropriate error messages and status codes in case of failure. Common errors include:

- `500 Internal Server Error`: Issues with reading or writing to the JSON file.
- `404 Not Found`: Submission not found for the provided index or ID.


Feel free to reach out if you have any questions or need further assistance!
