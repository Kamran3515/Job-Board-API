# 🚀 Job Board API

## Live Demo
🌐 https://jobora.ir

<p align="center">

![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django)
![DRF](https://img.shields.io/badge/Django_REST_Framework-red?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-Enabled-009639?style=for-the-badge&logo=nginx)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Enabled-F38020?style=for-the-badge&logo=cloudflare)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

A **production-ready Job Board platform** built with **Django**, **Django REST Framework**, **PostgreSQL**, **Docker**, **Gunicorn**, **Nginx**, **Cloudflare**, and **Let's Encrypt SSL**.

The platform allows employers to publish job opportunities, applicants to submit resumes, and administrators to manage the entire recruitment system.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Access Token
- Refresh Token
- Role-based permissions
- Secure password hashing
- Protected API endpoints

---

## 👤 User Roles

### Admin

- Manage users
- Manage companies
- Manage jobs
- Manage applications

### Employer

- Create company profile
- Upload company logo
- Publish job offers
- Edit/Delete jobs
- View applicants

### Job Seeker

- Create profile
- Upload resume
- Browse jobs
- Search jobs
- Apply for jobs
- Track submitted applications

---

## 💼 Job Management

- Create Jobs
- Update Jobs
- Delete Jobs
- Job Search
- Ordering
- Filtering
- Pagination

---

## 📨 Applications

- Resume Upload
- Prevent Duplicate Applications
- Employer Application Dashboard

---

## 🌐 REST API

- Versioned API
- JWT Authentication
- OpenAPI Ready
- RESTful Design

---

# 🏗 Tech Stack

## Backend

- Python
- Django 6
- Django REST Framework
- Simple JWT

## Database

- PostgreSQL

## Production

- Docker
- Docker Compose
- Gunicorn
- Nginx
- Cloudflare
- Let's Encrypt SSL

## Testing

- Pytest
- Factory Boy
- Faker

---

# 📂 Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── CI Pipeline
│
├── app/
│   ├── accounts/
│   ├── companies/
│   ├── jobs/
│   ├── applications/
│   ├── frontend/
│   ├── templates/
│   ├── static/
│   ├── media/
│   ├── tests/
│   └── config/
│
├── nginx/
│
├── logs/
│
├── Dockerfile
├── docker-compose.prod.yml
├── requirements.txt
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YourUsername/Job-Board-API.git

cd Job-Board-API
```

---

## Environment Variables

Create:

```text
.env
```

Example:

```env
DEBUG=False

SECRET_KEY=your_secret_key

ALLOWED_HOSTS=localhost,127.0.0.1

POSTGRES_DB=job_board
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

DB_HOST=db
DB_PORT=5432
```

---

## Run with Docker

```bash
docker compose up --build
```

---

# 🧪 Run Tests

```bash
pytest
```

---

# 📡 API Endpoints

## Authentication

```
/accounts/api/v1/
```

## Companies

```
/companies/api/v1/
```

## Jobs

```
/jobs/api/v1/
```

## Applications

```
/applications/api/v1/
```

---

# 🔒 Production Ready

This project is deployed using:

- Docker
- Docker Compose
- Gunicorn
- Nginx
- Cloudflare
- HTTPS
- Let's Encrypt SSL

Production Features:

- JWT Authentication
- HTTPS Only
- Security Headers
- HSTS
- Static Files
- Media Files
- Health Check
- Docker Healthcheck
- Automatic SSL Renewal

---

# 🛡 Security

- JWT Authentication
- Secure Cookies
- CSRF Protection
- XSS Protection
- HSTS
- HTTPS Redirect
- Reverse Proxy Headers

---

# ⚡ CI/CD

GitHub Actions automatically run:

- Install Dependencies
- Run Tests
- Verify Build

---

# 📸 Screenshots

Coming Soon...

---

# 🚀 Future Improvements

- Email Verification
- Password Reset
- Redis
- Celery
- Elasticsearch
- Saved Jobs
- Notifications
- API Rate Limiting
- Kubernetes Deployment

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Kamran Rezaei**

Backend Developer

GitHub:
https://github.com/Kamran3515
