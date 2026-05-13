# RFID-Based Inventory Management System

A modern inventory management system that uses RFID technology to track and manage inventory items efficiently. This system provides real-time tracking, automated inventory updates, and a user-friendly interface for managing your inventory.

## Features

- Real-time RFID tag scanning and tracking
- Automated inventory updates
- User authentication and authorization
- Dashboard with inventory analytics
- Stock level monitoring and alerts
- Item history tracking
- Export functionality for reports
- Mobile-responsive web interface

## Tech Stack

### Frontend
- React.js
- Material-UI
- Redux for state management
- Axios for API calls

### Backend
- Spring Boot
- Java
- MQTT for RFID communication
- MySQL Database
- JWT Authentication

## Prerequisites

- Java JDK 17 or higher
- Node.js 14.x or higher
- MySQL 8.0 or higher
- Maven
- RFID Reader hardware

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure the database:
   - Create a MySQL database
   - Update `application.properties` with your database credentials

3. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Configuration

### RFID Reader Setup
1. Connect the RFID reader to your system
2. Configure the MQTT broker settings in `application.properties`
3. Ensure the RFID reader is properly powered and connected

### Environment Variables
Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_MQTT_BROKER=ws://localhost:9001
```

## Usage

1. Log in to the system using your credentials
2. Navigate to the dashboard to view inventory status
3. Use the RFID reader to scan items
4. Monitor real-time updates in the inventory list
5. Generate reports as needed
