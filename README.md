Pharmacy Locator Application

The Pharmacy Locator Application is a web-based system designed to help users find nearby pharmacies based on their current location (Casablanca , Essaouira ,Agadir). It provides users with a list of pharmacies in their city and around them, along with their addresses, allowing them to quickly locate the nearest pharmacy.


Features

Geolocation: Utilizes the browser's geolocation API to determine the user's current location.
Reverse Geocoding: Uses OpenStreetMap's Nominatim API to convert the user's coordinates into a readable address including the city and street.
Pharmacy Search: Fetches a list of pharmacies in the user's city based on the obtained address.
Session Management: Implements user authentication and session management using Express.js and express-session middleware.
Protected Routes: Defines protected routes that require users to log in before accessing certain functionalities, such as searching for pharmacies in their area.
Technologies Used
Frontend: Built using Next.js
Backend: Developed with Node.js and Express.js 
Data Storage: Stores user and pharmacy data using JSON files.
API Integration: Integrates with external APIs such as Nominatim for geocoding.

How to Use

Clone this repository to your local machine.
Install dependencies by running npm install in both the frontend and backend directories.
Start the frontend and backend servers by running npm start in their respective directories.
Access the application in your browser at http://localhost:3000.
Grant permission for geolocation when prompted, or manually enter your location.
Explore nearby pharmacies and search for specific streets or cities.
Log in to access protected routes such as searching for pharmacies.
thank You For Your visite
Oussama Amaali

