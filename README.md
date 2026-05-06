<p align="center">
  <img src="./LOGO.png" alt="Logo" width="90%"/>
</p>

# ExFast Flow

An Express.js library providing a structured framework for building scalable web applications with middleware management, dependency injection, modular architecture, and built-in security, validation, and observability features.

## Features

- **Dependency Injection** - Built-in IoC container for managing service dependencies
- **Modular Architecture** - Organize code into reusable, self-contained modules
- **Request Routing** - Advanced route compilation with versioning and auto-mounting
- **Security** - JWT authentication, request rate limiting, and helmet integration
- **Validation** - JSON Schema validation with AJV
- **Logging & Observability** - Structured logging with Pino and HTTP request tracking
- **Data Access** - Query builder, repository pattern, and unit of work support
- **Middleware Management** - Request ID tracking, error handling, and response formatting
- **Response Envelopes** - Standardized response format for success, error, and paginated results

## Installation

```bash
npm install exfast
```

Or with legacy peer dependency handling:

```bash
npm install --legacy-peer-deps exfast
```

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- Express.js >= 4.18.0

## Quick Start

### Basic Setup

```javascript
import express from 'express';
import { Core, Middleware, Security, Validation } from 'exfast';

const app = express();
const core = new Core();

// Add middleware
app.use(Middleware.requestId());
app.use(Middleware.handlerInvoker());
app.use(express.json());

// Add security middleware
app.use(Security.rateLimit());
app.use(Security.helmet());

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Dependency Injection

```javascript
import { Core } from 'exfast/core';

const core = new Core();

// Register services
core.register('userService', UserService);
core.register('emailService', EmailService);

// Resolve services
const userService = core.resolve('userService');
```

### Modular Architecture

```javascript
import { BaseModule, BaseRouter, BaseService } from 'exfast';

class UserService extends BaseService {
  constructor(dependencies) {
    super(dependencies);
  }

  async getUser(id) {
    this.logger.info(`Fetching user ${id}`);
    // Implementation
  }
}

class UserRouter extends BaseRouter {
  register() {
    this.router.get('/:id', this.getUser.bind(this));
  }

  async getUser(req, res, next) {
    try {
      const user = await this.userService.getUser(req.params.id);
      res.json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }
}

class UserModule extends BaseModule {
  constructor() {
    super({
      name: 'user',
      routes: [UserRouter],
      services: [UserService],
    });
  }
}
```

### Request Validation

```javascript
import { Validation } from 'exfast';

const userSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 1 },
    age: { type: 'integer', minimum: 0 },
  },
  required: ['email', 'name'],
};

// Validate request body
app.post('/users', (req, res, next) => {
  const validator = Validation.createValidator(userSchema);
  const valid = validator(req.body);
  
  if (!valid) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validator.errors,
    });
  }
  
  next();
});
```

### Security & Authentication

```javascript
import { Security } from 'exfast';

// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '24h',
};

// Create token
const token = Security.jwt.sign(
  { userId: 123, email: 'user@example.com' },
  jwtConfig
);

// Verify token
app.use(Security.jwtMiddleware(jwtConfig));

// Rate limiting
app.use(Security.rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Helmet for security headers
app.use(Security.helmet());
```

### Structured Logging

```javascript
import { Middleware } from 'exfast';

// Add request logging middleware
app.use(Middleware.httpLogger());

// Use logger in your code
class MyService extends BaseService {
  constructor(dependencies) {
    super(dependencies);
  }

  doSomething() {
    this.logger.info('Doing something');
    this.logger.warn('Warning message');
    this.logger.error('Error message');
  }
}
```

### Data Access & Repositories

```javascript
import { Data } from 'exfast';

const { QueryBuilder, RepositoryBase, UnitOfWork } = Data;

// Query Builder
const query = new QueryBuilder()
  .from('users')
  .select('id', 'name', 'email')
  .where('active = ?', [true])
  .orderBy('name', 'ASC')
  .limit(10)
  .offset(0)
  .build();

console.log(query.sql);
console.log(query.params);

// Repository Pattern
class UserRepository extends RepositoryBase {
  constructor(adapter) {
    super(adapter);
  }

  async findActive() {
    const query = new QueryBuilder()
      .from('users')
      .where('active = ?', [true])
      .build();
    return this.adapter.query(query.sql, query.params);
  }
}

// Unit of Work
const unitOfWork = new UnitOfWork(adapter);
unitOfWork.enqueue(async (adapter) => {
  await adapter.insert('users', { name: 'John', email: 'john@example.com' });
});
unitOfWork.enqueue(async (adapter) => {
  await adapter.update('users', { active: true }, { id: 1 });
});
await unitOfWork.commit();
```

### Response Formatting

```javascript
import { Output } from 'exfast';

const { envelope, responseSender } = Output;

// Use response envelope
app.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'John' }];
  const response = envelope.success(users);
  res.json(response);
});

// Paginated response
app.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'John' }];
  const response = envelope.paginated(users, total, page, pageSize);
  res.json(response);
});

// Error response
app.get('/api/users/:id', (req, res) => {
  try {
    // logic
  } catch (error) {
    const response = envelope.error('USER_NOT_FOUND', 'User not found', { id: req.params.id });
    res.status(404).json(response);
  }
});
```

## API Documentation

### Core Module

#### `Core`
Main container for dependency injection and application configuration.

**Methods:**
- `register(name, Service, dependencies)` - Register a service
- `resolve(name, overrides)` - Resolve a registered service
- `singleton(name, Service)` - Register a singleton service

### Middleware

#### `requestId()`
Generates and attaches unique request IDs.

#### `handlerInvoker(handler)`
Wraps route handlers with error handling.

#### `httpLogger()`
Logs HTTP requests with structured format.

### Security

#### `jwt.sign(payload, config)`
Create a JWT token.

#### `jwt.verify(token, config)`
Verify and decode a JWT token.

#### `jwtMiddleware(config)`
Express middleware for JWT authentication.

#### `rateLimit(options)`
Rate limit middleware using express-rate-limit.

#### `helmet()`
Security headers middleware.

### Validation

#### `createValidator(schema)`
Create an AJV validator from JSON Schema.

### Routing

#### `RouteCompiler.compile(routes, version)`
Compile routes with versioning.

#### `RouteCompiler.autoMount(app, routes)`
Automatically mount compiled routes to Express app.

### Data Access

#### `QueryBuilder`
Fluent API for building SQL queries.

**Methods:**
- `from(table)` - Set table
- `select(...fields)` - Select fields
- `where(condition, params)` - Add WHERE clause
- `orderBy(field, direction)` - Add ORDER BY
- `limit(count)` - Set LIMIT
- `offset(count)` - Set OFFSET
- `build()` - Return `{ sql, params }`

#### `RepositoryBase`
Base class for data repositories.

#### `UnitOfWork`
Transaction management for data operations.

**Methods:**
- `enqueue(operation)` - Add operation to transaction
- `commit()` - Execute all operations in transaction
- `rollback()` - Rollback transaction

### Output

#### `envelope.success(data)`
Format successful response.

#### `envelope.paginated(data, total, page, pageSize)`
Format paginated response.

#### `envelope.error(code, message, context)`
Format error response.

## Configuration

### Environment Variables

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

### Logger Configuration

```javascript
import { Logger } from 'exfast';

const logger = Logger.create({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
```

## Testing

Run the test suite:

```bash
npm test
```

With coverage:

```bash
npm run test:cov
```

Run linter:

```bash
npm run lint
npm run lint:fix
```

Format code:

```bash
npm run format
npm run format:check
```

## Project Structure

```
src/
├── core/              # Dependency injection container
├── middleware/        # Express middleware
├── security/          # Authentication and security utilities
├── validation/        # Schema validation
├── routing/           # Route compilation and registry
├── data/              # Data access patterns
├── output/            # Response formatting
├── modules/           # Module base classes
└── index.js           # Main export
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
└── perf/              # Performance tests
```

## Examples

See the `examples/` directory for complete working examples:

- Basic Express app setup
- Modular architecture
- JWT authentication
- Data validation
- Repository pattern
- Error handling

## Performance

ExFast Flow is optimized for:

- Minimal overhead compared to plain Express
- Efficient dependency injection with lazy loading
- Smart caching of compiled routes
- Optimized SQL query building

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -am 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues, questions, or suggestions:

- GitHub Issues: [github.com/exfast/flow/issues](https://github.com/girish-kor/Exfast/issues)
- Email: [girishkor05@gmail.com](mailto:girishkor05@gmail.com)
- Homepage: [github.com/exfast/flow](https://github.com/girish-kor/Exfast)

## Changelog

### Version 1.0.0

- Initial release
- Core dependency injection
- Modular architecture
- Security middleware
- Validation with AJV
- Data access patterns
- Structured logging
- Response envelopes

## Roadmap

- [ ] OpenAPI/Swagger integration
- [ ] GraphQL support
- [ ] WebSocket support
- [ ] Caching layer
- [ ] Event system
- [ ] Plugin system
- [ ] CLI tooling
