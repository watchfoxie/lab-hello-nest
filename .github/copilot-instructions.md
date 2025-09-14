# Copilot Instructions for lab-hello-nest

## Project Overview
This is a NestJS (TypeScript) backend focused on managing relationships between universities and students. The codebase is modular, with each domain (e.g., students, universities, posts) implemented as a separate module under `src/modules/`.

## Architecture & Patterns
- **Modules**: Each feature (students, universities, posts) is a NestJS module with its own controller, service, DTO, and module file. Example: `src/modules/students/` contains `students.controller.ts`, `students.service.ts`, `students.dto.ts`, and `students.module.ts`.
- **Controllers**: Handle HTTP requests and delegate business logic to services.
- **Services**: Contain business logic and data access. Services are injected into controllers.
- **DTOs**: Data Transfer Objects are used for request validation and typing.
- **Common Utilities**: Shared logic (e.g., HTTP status codes, Swagger response helpers) is placed in `src/common/`.
- **Pipes**: Custom validation logic is implemented in `src/pipes/validation.pipe.ts`.

## Developer Workflows
- **Install dependencies**: `npm install`
- **Run in development**: `npm run start:dev` (uses nodemon for hot reload)
- **Run in production**: `npm run start:prod`
- **Run unit tests**: `npm run test`
- **Run e2e tests**: `npm run test:e2e` (see `test/app.e2e-spec.ts`)
- **Test coverage**: `npm run test:cov`

## Conventions & Practices
- **File Naming**: Use singular for modules (e.g., `students.module.ts`), plural for folders (e.g., `students/`).
- **DTOs**: Always define DTOs for request/response schemas in `<feature>.dto.ts`.
- **Service Injection**: Use NestJS dependency injection for services in controllers.
- **Swagger Integration**: Use helpers in `src/common/swagger/` for API documentation responses.
- **Status Codes**: Use constants from `src/common/status-codes/http-status-codes.ts` for HTTP responses.

## Integration Points
- **External Libraries**: Relies on NestJS core and common packages. Swagger is used for API docs.
- **Hot Reload**: Development uses `nodemon` (see `nodemon.json`).
- **TypeScript Config**: See `tsconfig.json` and `tsconfig.build.json` for build settings.

## Key Files & Directories
- `src/main.ts`: Application entry point.
- `src/app.module.ts`: Root module, imports feature modules.
- `src/modules/`: Feature modules (students, universities, posts).
- `src/common/`: Shared utilities and constants.
- `test/`: End-to-end tests and Jest config.

## Example: Adding a New Feature
1. Create a new folder under `src/modules/` (e.g., `courses/`).
2. Add controller, service, DTO, and module files.
3. Register the new module in `src/app.module.ts`.
4. Follow existing patterns for dependency injection and DTO usage.

---

If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.