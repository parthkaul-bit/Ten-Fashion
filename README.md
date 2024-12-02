# TEN-Fashion Project

The Git repository is for creating a better shopping site, 'Ten Fashion.' It includes features such as user login and product purchasing. The admin can add or edit products based on stock availability. We should refer to the website https://ukbhatia.com as a reference.

## Project Overview

TEN-Fashion is an e-commerce platform designed to provide an enhanced shopping experience for users looking for fashion products. The platform aims to create an intuitive and user-friendly interface for purchasing clothing and accessories. With both customer and admin functionalities, TEN-Fashion allows users to log in, browse products, and complete purchases.

Admins have the ability to manage the product catalog by adding, editing, or removing items based on real-time stock availability. The platform is built with a focus on ease of use and seamless navigation, ensuring a smooth shopping journey for customers.

## Contributors

This project is the result of hard work and collaboration from many talented individuals. We welcome and appreciate contributions from the developer community.

## Setup Instructions

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```
   git clone https://github.com/sibi24sibi/Ten-fashion.git
   ```

2. Navigate to the project directory:

   for Frontend developers

   ```
   cd frontend
   ```

   for Backend developers

   ```
   cd backend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   for Frontend developers

   ```
   npm run dev
   ```

   for Backend developers

   ```
   npm start
   ```

5. setup .env file to configure Secure sensitive information

   ```
   #env

   PORT=8000
   CONNECTION_URL=mongodb://localhost:27017/app
   ```

6. Open your browser and visit `http://localhost:5173` to view the react application.

## How to Contribute

We welcome contributions! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

> **Note:** For more detailed information on how to contribute, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file in the root of the project.

## Rules For Development

follw the rules to develop the application

1. Dont install any npm package with information
2. Use flowbite react ui for frontend developement
3. Push the code to seperate branch for every features
4. Make the site mobile reponsive and both light and dark mode enabled

Please ensure your code adheres to the project's coding standards and include appropriate tests if applicable.
