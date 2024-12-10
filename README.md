# Blog Application

A simple Blog Application with the following features:
- User Signup and Signin
- Create a Blog
- Edit Blog
- Delete Blog
- View Blogs
- Add Comments to Blogs

This guide provides step-by-step instructions to set up the project locally for development.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>


2. Set Up the Backend
Navigate to the backend folder:
bash
Copy code
cd backend
2.1 Start PostgreSQL Using Docker
Run the following command to start a PostgreSQL instance using Docker:

bash
Copy code
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
2.2 Configure the .env File
Create a .env file in the backend folder with the following content:

env
Copy code
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
JWT_SECRET="my_jwt_secret"
2.3 Install Backend Dependencies
Run the following command to install all necessary backend dependencies:

bash
Copy code
npm install
2.4 Apply Database Migrations
Run the following Prisma command to apply database migrations:

bash
Copy code
npx prisma migrate dev --name <migration_name>
Replace <migration_name> with a meaningful name for your migration.

2.5 Compile TypeScript Files
Run the TypeScript compiler to build the backend code:

bash
Copy code
tsc -b
2.6 Start the Backend Server
Start the backend server using the compiled JavaScript files:

bash
Copy code
node dist/app.js
The backend should now be running at http://localhost:3000
