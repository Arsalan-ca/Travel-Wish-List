# Travel Wishlist App

## Description
The Travel Wishlist App is a full-stack application designed to help users manage and organize their travel destinations. Users can add, view, update, and delete travel destinations along with associated details such as country, estimated cost, and priority. The data is stored in a SQLite database, and the frontend is built using React for a seamless user experience.

## Features
- Add New Destinations: Users can add new travel destinations with relevant details.
- View Destinations: Display a list of all travel destinations.
- Update Destinations: Edit existing travel destinations.
- Delete Destinations: Remove destinations from the wishlist.
- SQLite Database: All data is securely stored in an SQLite database.
- Responsive Design: Application adapts to different screen sizes for a smooth experience on both desktop and mobile devices.

## Technologies Used
- Frontend: React Native
- Backend: Express.js
- Database: SQLite
- API: Axios for data fetching

## Getting Started
### Prerequisites
- Node.js (v14.x or higher)
- SQLite3 installed on your system
- A running instance of Node.js server (server.js)

## API Endpoints
### Backend API Routes
- GET /api/ - Fetch all wishlist destinations
- POST /api/ - Add a new destination
- PUT /api/ - Replace the entire wishlist
- DELETE /api/ - Delete all destinations
- GET /api/:id - Get a specific destination by ID
- PUT /api/:id - Update a specific destination by ID
- DELETE /api/:id - Delete a specific destination by ID

## Database
The application uses SQLite to store all data in a local database (wishlist.db). Ensure the database is initialized properly as described in database.js.

## Contributing
Contributions are welcome! If you have suggestions or find any bugs, feel free to create an issue or submit a pull request.

## Link to Video
[Here](https://youtu.be/W1ocYcpmJlM)
