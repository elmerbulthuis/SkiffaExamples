# OpenTelemetry example

To test OpenTelemetry.

## Running

Make sure you have docker running! Then run `docker-compose up --wait` to start all dependency services. Then start the server via `npm start` from the `npm/opentelemetry` directory.

Then generate some data via `curl -i localhost:8080/noop`! Zipkin (traces) is at `http://localhost:9411` and Prometheus (metrics) is at `http://localhost:9090`.

\o/
