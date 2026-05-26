# Build stage
FROM golang:1.26.3-alpine3.23 AS builder

WORKDIR /app

# Copy dependency definitions
COPY go.mod ./
# RUN go mod download - since we don't have internet inside isolated compose sometimes, we copy all files and go build will fetch them if needed, or docker-compose takes care of building online.
# Let's copy all backend files
COPY . .

# Build static binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Run stage
FROM alpine:3.19

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/main .

# Expose Go API default port
EXPOSE 8080

# Run service
ENTRYPOINT ["/app/main"]
