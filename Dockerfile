# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the React Vite project
RUN yarn build

# Stage 2: Production
FROM node:18-alpine AS production

# Install serve to serve the build folder
RUN yarn global add serve

# Set working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables (copy .env file)
COPY .env .env

# Expose the port the app will run on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
