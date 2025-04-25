# Room Rental Management System

This project is a Room Rental Management System built using JavaScript for the frontend and backend, with MySQL as the database. The system allows users to manage rental information, including displaying, creating, and deleting rental entries.

## Project Structure

```
room-rental-management
├── backend
│   ├── controllers
│   │   ├── rentalController.js
│   │   └── userController.js
│   ├── models
│   │   ├── rentalModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── rentalRoutes.js
│   │   └── userRoutes.js
│   ├── config
│   │   └── dbConfig.js
│   └── server.js
├── frontend
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   ├── app.js
│   │   └── rental.js
│   ├── views
│   │   ├── index.html
│   │   ├── createRental.html
│   │   └── deleteRental.html
│   └── assets
│       └── README.md
├── database
│   └── schema.sql
├── package.json
└── README.md
```

## Features

- **Display Rentals**: View a list of all available rentals.
- **Create Rental**: Add new rental entries through a user-friendly form.
- **Delete Rental**: Remove existing rental entries with a confirmation step.

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd room-rental-management
   ```

2. **Install Dependencies**:
   Navigate to the backend directory and install the required packages:
   ```
   cd backend
   npm install
   ```

3. **Database Setup**:
   - Create a MySQL database and run the SQL schema located in `database/schema.sql` to set up the necessary tables.

4. **Configure Database Connection**:
   Update the database connection settings in `backend/config/dbConfig.js` with your MySQL credentials.

5. **Run the Backend Server**:
   Start the backend server:
   ```
   node server.js
   ```

6. **Access the Frontend**:
   Open `frontend/views/index.html` in your web browser to access the application.

## Usage

- Navigate through the application to view, create, and delete rental entries.
- Follow the prompts for creating and confirming deletions of rentals.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features you would like to add.