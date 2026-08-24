# API Gateway

REST API entry point for the microservices system. Routes HTTP requests to `user-service`, `catalog-service`, and `order-service` over gRPC, validates incoming requests, and maps gRPC/domain errors back into proper HTTP status codes.

## Stack

NestJS, Express, class-validator, gRPC (`@grpc/grpc-js`)

## Endpoints

| Resource | Routes |
|---|---|
| Users | `POST /users`, `GET /users`, `GET /users/:id`, `PATCH /users/:id`, `DELETE /users/:id` |
| Categories | `POST /categories`, `GET /categories`, `GET /categories/:id`, `PATCH /categories/:id`, `DELETE /categories/:id` |
| Products | `POST /products`, `GET /products` (supports `page`, `limit`, `search`, `categoryId`), `GET /products/:id`, `PATCH /products/:id`, `DELETE /products/:id` |
| Orders | `POST /orders`, `GET /orders` (supports `page`, `limit`, `userId`, `productId`), `GET /orders/:id`, `DELETE /orders/:id` |
| Health | `GET /health` |

Every response is wrapped as `{ success, message, data }`.

## Error handling

Requests are validated with `class-validator` before reaching a controller (`BadRequestExceptionFilter` → `400`). Errors coming back from a downstream gRPC call are unwrapped by `GlobalExceptionFilter`: a typed `DomainException` (e.g. "email already exists") is mapped to its correct status (404/409/412/400/503) via `DOMAIN_ERROR_HTTP_STATUS`; a raw gRPC status (e.g. `UNAVAILABLE` when a downstream service is unreachable) falls back to `grpc-status.util.ts`; anything unrecognized becomes a generic `500` with the real error only logged server-side, never sent to the client.

## Running locally

```bash
npm install
npm run start:dev
```

Runs on `PORT` from `.env` (default `3000`).

## Required env vars

```
PORT=3000
GRPC_USER_SERVICE_URL=localhost:50051
GRPC_CATALOG_SERVICE_URL=localhost:50052
GRPC_ORDER_SERVICE_URL=localhost:50053
```

## Depends on

`user-service`, `catalog-service`, and `order-service` running and reachable via gRPC at the URLs above.
