# Source-Hub 🚀

**A comprehensive programming resource sharing platform for students and developers**

Source-Hub is a modern web application that serves as a centralized hub for programming resources. Whether you're a student learning to code or an experienced developer looking for specific resources, Source-Hub helps you discover, share, and organize programming materials across various topics and technologies.

## 🌟 Features

- **Resource Discovery**: Search and filter programming resources by topic, technology, or tags
- **User Management**: Secure user registration, authentication, and profile management
- **Content Sharing**: Create and share programming resources with the community
- **Interactive Engagement**: Like and comment on resources to build community discussions
- **Advanced Search**: Powerful search functionality to find exactly what you need
- **Tag-based Organization**: Organize resources with custom tags for easy categorization
- **Input Validation**: Comprehensive request validation using Zod schemas with detailed error messages

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod for schema validation and type safety
- **Security**: bcrypt for password hashing
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ziad540/Source-Hub.git
cd Source-Hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/source-hub
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/source-hub

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Build and Run

```bash
# Development mode with hot reloading
npm run dev

# Production build
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signUp` | Register a new user | No |
| POST | `/user/signIn` | User login | No |


### Post/Resource Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/post/create_post` | Create a new resource | Yes |
| GET | `/post/get_post` | Get a specific resource | No |
| GET | `/post/list_posts` | List all resources | Yes |
| PUT | `/post/edit_post` | Edit a resource | Yes |
| DELETE | `/post/delete_post` | Delete a resource | Yes |
| GET | `/post/search_posts` | Search resources | Yes |
| GET | `/post/filter-tag` | Filter by tags | Yes |

### Interaction Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/like/create_like` | Like a resource | Yes |
| DELETE | `/like/delete_like` | Unlike a resource | Yes |
| POST | `/comment/create` | Add a comment | Yes |
| GET | `/comment/list` | Get comments | No |
| DELETE | `/comment/delete` | Delete a comment | Yes |

## 🛡️ Validation Middleware with Zod

Source-Hub implements a robust validation system using **Zod** for type-safe request validation. The validation middleware ensures data integrity and provides detailed error messages for invalid requests.

### Overview

The validation system consists of:
- **Zod Schemas**: Define validation rules for different endpoints
- **Validation Middleware**: Processes requests and validates against schemas
- **Custom Error Handling**: Provides structured error responses
- **TypeScript Integration**: Type-safe validation with automatic type inference

### How It Works

#### 1. Schema Definition

Validators are defined using Zod schemas in the `src/validator/` directory:

```typescript
// Example: User Sign Up Validator
export const signUpValidator = {
    body: z.strictObject({
        email: z.email(),
        username: z.string().nonoptional(),
        password: z.string().regex(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/).nonoptional(),
        firstname: z.string().min(2, "Too short!").nonoptional(),
        lastname: z.string().min(2, "Too short!").nonoptional(),
    })
}
```

#### 2. Middleware Usage

Apply validation middleware to routes:

```typescript
import { validationMiddleware } from '../middleware/validation.middleware';
import { signUpValidator } from '../validator/user.validator';

// Apply validation to route
router.post('/signUp', validationMiddleware(signUpValidator), signUpController);
```

#### 3. Type Safety

Automatic type inference from Zod schemas:

```typescript
// Types are automatically generated from validators
export type signUpBody = z.infer<typeof signUpValidator.body>
export type createPostBody = z.infer<typeof createPostValidator.body>
```

### Available Validators

#### User Validators (`user.validator.ts`)
- **signUpValidator**: Email, username, password (with regex), firstname, lastname
- **signInValidator**: Email and password
- **getUserByEmailValidator**: Email lookup
- **updateUserValidator**: Optional username and email updates

#### Post Validators (`post.validator.ts`)
- **createPostValidator**: Title and URL (must be valid URL)
- **getPostByIdValidator**: MongoDB ObjectId (24 characters)
- **editPostValidator**: Post ID, optional title, URL, and tags array
- **searchPostValidator**: Search keyword
- **filterPostValidator**: Tag filter

#### Like Validators (`like.validator.ts`)
- **createLikeValidator**: Post ID (24 characters)
- **deleteLikeValidator**: Post ID (24 characters)

#### Comment Validators (`comment.validator.ts`)
- **createCommentValidator**: Title and Post ID
- **deleteCommentValidator**: Comment ID (24 characters)
- **listCommentsValidator**: Post ID (24 characters)

### Validation Features

#### Request Validation
The middleware validates multiple parts of the request:
- **Body**: Request payload validation
- **Params**: URL parameter validation
- **Query**: Query string validation
- **Headers**: Header validation (when specified)

#### Error Handling
Validation errors return structured responses:

```json
{
    "success": false,
    "type": "ValidationError",
    "message": "Validation failed: email - Invalid email, password - String must contain at least 8 character(s)",
    "statusCode": 400,
    "errors": [
        {
            "field": "body.email",
            "message": "Invalid email",
            "code": "validation_failed"
        },
        {
            "field": "body.password",
            "message": "String must contain at least 8 character(s)",
            "code": "validation_failed"
        }
    ],
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Common Validation Rules

#### Password Requirements
```typescript
// Strong password: 2+ uppercase, 1+ special char, 2+ numbers, 3+ lowercase, exactly 8 chars
z.string().regex(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/)
```

#### MongoDB ObjectId
```typescript
// Validates 24-character hex string (MongoDB ObjectId format)
z.string().length(24)
```

#### Email Validation
```typescript
// Built-in email validation
z.email()
```

#### URL Validation
```typescript
// Validates proper URL format
z.url()
```

### Creating Custom Validators

To add validation for new endpoints:

1. **Create validator schema**:
```typescript
// src/validator/example.validator.ts
import * as z from "zod";

export const exampleValidator = {
    body: z.strictObject({
        name: z.string().min(1).max(100),
        age: z.number().min(0).max(120),
        tags: z.array(z.string()).optional()
    }),
    params: z.strictObject({
        id: z.string().length(24)
    })
}
```

2. **Add type definitions**:
```typescript
// src/customTypes/validationTypes.ts
export type exampleBody = z.infer<typeof exampleValidator.body>
```

3. **Apply to routes**:
```typescript
router.post('/example/:id', validationMiddleware(exampleValidator), exampleController);
```

### Best Practices

- **Use `z.strictObject()`** to prevent additional properties
- **Use `.nonoptional()`** for required fields to be explicit
- **Validate MongoDB ObjectIds** with `.length(24)` for proper format
- **Use descriptive error messages** with `.min()`, `.max()`, etc.
- **Group related validators** in the same file
- **Export type definitions** for TypeScript integration

## 🏗️ Project Structure

```
Source-Hub/
├── src/
│   ├── customTypes/          # TypeScript type definitions
│   │   ├── express.d.ts      # Express type extensions
│   │   ├── mongooseObj.ts    # Mongoose object types
│   │   ├── requestTypes.ts   # Request/Response types
│   │   └── validationTypes.ts # Zod validation type definitions
│   ├── dataStore/            # Database layer
│   │   ├── DAO/              # Data Access Objects
│   │   ├── mongoDb/          # MongoDB connection and models
│   │   └── index.ts          # Database exports
│   ├── middleware/           # Express middleware
│   │   ├── authentication.middleware.ts
│   │   ├── errorHandling.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routers/              # API route handlers
│   │   ├── commentRouters/   # Comment-related routes
│   │   ├── likeRouters/      # Like-related routes
│   │   ├── postRouters/      # Post/Resource routes
│   │   └── userRouters/      # User authentication routes
│   ├── utlis/                # Utility functions
│   │   ├── customError.ts    # Custom error classes
│   │   └── validationError.ts # Validation error handling
│   ├── validator/            # Zod validation schemas
│   │   ├── comment.validator.ts
│   │   ├── like.validator.ts
│   │   ├── post.validator.ts
│   │   └── user.validator.ts
│   ├── types.ts              # Main type definitions
│   └── index.ts              # Application entry point
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── nodemon.json              # Nodemon configuration
```

## 🔧 Available Scripts

```bash
# Start development server with hot reloading
npx nodemon


# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run tests (when implemented)
npm test

# Lint code (when configured)
npm run lint
```

## 🤝 Contributing

We welcome contributions to Source-Hub! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all endpoints are properly authenticated where required
- Test your changes thoroughly


## 🐛 Bug Reports & Feature Requests

If you encounter any bugs or have feature requests, please create an issue on our [GitHub Issues](https://github.com/ziad540/Source-Hub/issues) page.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check existing documentation
- Review the API endpoints above

## 🚧 Roadmap

- [ ] Frontend web interface
- [x] Validation middleware
- [ ] Advanced search filters
- [ ] Resource categories and subcategories
- [ ] User reputation system
- [ ] Resource bookmarking
- [ ] Email notifications
- [ ] API rate limiting
- [ ] Comprehensive testing suite
- [ ] Docker containerization

---

**Made with ❤️ for the programming community**