<p align="center">
  <a href="http://nestjs.com/" target="_blank" style="display: inline-block; margin-right: 20px;">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
  <a href="https://flex-flex-web-app.vercel.app/movies" target="_blank" style="display: inline-block;">
    <img src="https://raw.githubusercontent.com/BesmaSmile/flex-flex-web-app/refs/heads/master/src/assets/img/app-name.svg" height="60" alt="App Name" />
  </a>
</p>



# 🎬 Flix Flex NestJS API

Flix Flex is a RESTful API built with [NestJS](https://nestjs.com/) designed to serve movie-related data. It follows best practices for security, validation, error handling, and documentation using Swagger.

---

## 🧩 Related Project

👉 The [Nextjs App Flix Flex](https://github.com/BesmaSmile/flex-flex-web-app)  connects to this API 

---
## 🔗 API Documentation

👉 [Swagger Documentation](https://flix-flex-api-production.up.railway.app/api)
(Bearer token required for protected routes)

---

## 🚀 Features

- 🌐 RESTful API with global prefix: `/api`
- 🔐 JWT Authentication with Bearer tokens
- 🛡️ Helmet for enhanced security headers
- ✅ Global validation with `class-validator` and custom pipes
- ⚠️ Custom global exception filter
- 📄 Integrated Swagger documentation
- 💾 MongoDB with Mongoose
- 🔁 External API support via Axios

---

## 📦 Technologies 

- **NestJS v11**
- **TypeScript**
- **Mongoose**
- **Passport + JWT**
- **Swagger**
- **Axios**

## 🔧 Getting Started
1. Install Dependencies
```bash
npm install
```
2. Set Environment Variables
Create an .env file based on .env.example:
```bash
cp .env.example .env
```


3. Run the App
```bash
npm run start:dev
```
> Server will run on http://localhost:3000/api


Once the app is running, access the interactive Swagger API docs:
```bash
http://localhost:3000/api
```

## 🔐 Authentication
All protected endpoints require an Authorization header with the format:
```bash
Authorization: Bearer <your_token>
```
## 👤 Author

Made with ❤️ by [Besma RABIA CHERIF](https://www.linkedin.com/in/besmarabiacherif/).