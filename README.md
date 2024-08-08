# Ask Me Anything

A real-time Q&A web application built with React, TypeScript, and WebSockets.

## Overview

Ask Me Anything is a web application that allows users to create rooms for Q&A sessions. Users can join rooms, ask questions, and receive answers in real-time. The application uses WebSockets to establish a bi-directional communication channel between the client and server, enabling real-time updates and notifications.

## Features

- Create and join rooms for Q&A sessions
- Ask questions and receive answers in real-time
- Real-time updates and notifications using WebSockets
- User-friendly interface for easy navigation and interaction
- Support for multiple rooms and users

## Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: Go, WebSockets, PostgreSQL
- APIs: RESTful APIs for room management and message handling

## Getting Started

### Pre-requisites

1. Node.js (version 14 or higher)
2. Go (version 1.16 or higher)
3. PostgreSQL (version 13 or higher)
4. Docker

### Installation

Clone the repository: git clone https://github.com/your-username/ask-me-anything.git
Install dependencies: npm install (for frontend) and go get (for backend)
Start the development server: npm run dev (for frontend) and go run main.go (for backend)

### Configuration

- Create a .env file in the root directory with the following environment variables:
  - `WSGO_DB_USER`: PostgreSQL username
  - `WSGO_DB_PASSWORD`: PostgreSQL password
  - `WSGO_DB_HOST`: PostgreSQL host
  - `WSGO_DB_PORT`: PostgreSQL port
  - `WSGO_DB_NAME`: PostgreSQL database name

### Contributing

Contributions are welcome! Please submit a pull request with a clear description of the changes made.
