# API Gateway

REST API entry point for the microservices system. Routes HTTP requests to `user-service`, `catalog-service`, and `order-service` over gRPC, validates incoming requests, and maps gRPC/domain errors back into proper HTTP status codes.

## Stack

NestJS, Express, class-validator, gRPC (`@grpc/grpc-js`)

## Endpoints

| Resource | Routes |
|---|---|
| Users | `POST /users`, `GET /users`, `GET /users/:id`, `PATCH /users/:id`, `DELETE /users/:id` |
| Categories | `POST /categories`, `GET /categories`, `GET /categories/:id`, `PATCH /categories/:id`, `DELETE /categories/:id` |
| Products | `POST /products`, `GET /products` (page/limit/search/categoryId), `GET /products/:id`, `PATCH /products/:id`, `DELETE /products/:id` |
| Orders | `POST /orders`, `GET /orders` (page/limit/userId/productId), `GET /orders/:id`, `DELETE /orders/:id` |
| Health | `GET /health` |

Every response is wrapped as `{ success, message, data }`.

## Error handling

`BadRequestExceptionFilter` handles request validation failures. `GlobalExceptionFilter` unwraps errors from downstream gRPC calls: a typed `DomainException` maps to its correct status via `DOMAIN_ERROR_HTTP_STATUS`; a raw gRPC status (e.g. `UNAVAILABLE`) falls back to `grpc-status.util.ts`; anything unrecognized becomes a generic `500`.

## Folder structure

```
src/
├── modules/            # feature modules
│   ├── user/
│   ├── catalog/        # category/ and product/
│   └── order/
├── common/              # filters, errors, grpc client helpers, middleware, pipes
├── config/
└── health/
```

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
