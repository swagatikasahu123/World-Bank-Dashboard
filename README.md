🌍 /*World Bank Dashboard*/
Project Description

This project is a web-based interactive dashboard that fetches global development data from the World Bank Open Data API and displays it in a visual format. The dashboard is designed for data exploration and provides dynamic filters to analyze population and GDP trends across multiple countries over time.

Key Features:

Interactive Charts:

Population Data (Bar Chart)

GDP per Capita (Line Chart)

Dynamic Filters:

Select multiple countries

Specify start and end years for analysis

Authentication:

User login/logout using JWT

Dashboard is accessible only to authenticated users

Data Source:

World Bank Open Data

Tech Stack

Backend: Django + Django REST Framework + SimpleJWT for authentication

Frontend: React + Tailwind CSS + Chart.js

API Integration: World Bank Open Data API

Screenshots:
Login Page:
Dashboard Page:

Project Structure
          
  ├─ api/          # Django app with API endpoints
  ├─ backend/      # Project settings
dashboard-frontend/          # React frontend
  ├─ src/
      ├─ Dashboard.js
      ├─ Filters.js
      ├─ Login.js

Setup & Running the Project
1. Backend (Django)

Navigate to backend directory:




Create and activate a virtual environment:

python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate


Install dependencies:

pip install -r requirements.txt


Apply migrations and create superuser:

python manage.py migrate
python manage.py createsuperuser


Start the server:

python manage.py runserver


Backend runs at: http://127.0.0.1:8000/

2. Frontend (React)

Navigate to frontend directory:

cd dashboard-frontend


Install dependencies:

npm install


Start the frontend server:

npm start


Frontend runs at: http://localhost:3000/

3. Usage

Open http://localhost:3000 in your browser.

Log in with the credentials created via Django superuser.

On the dashboard:

Use filters to select countries and date range

View interactive Population and GDP charts

Click Logout to end the session

4. API Endpoints
Endpoint	Method	Description
/api/login/	POST	Authenticate user & get JWT
/api/token/refresh/	POST	Refresh JWT access token
/api/population/	GET	Fetch population data
/api/gdp/	GET	Fetch GDP per capita data
/api/countries/	GET	Fetch list of available countries
5. Notes

Ensure both backend and frontend are running simultaneously.

Dashboard data is fetched dynamically from the World Bank API.


Tailwind CSS is used for styling; Chart.js is used for interactive charts.
