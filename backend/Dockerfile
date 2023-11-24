# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Set environment variables from args (with defaults)
ARG MONGODB_DB
ENV MONGODB_DB=${MONGODB_DB:-platform_base}

ARG MONGODB_HOST
ENV MONGODB_HOST=${MONGODB_HOST:-localhost}

ARG MONGODB_PORT
ENV MONGODB_PORT=${MONGODB_PORT:-27017}

ARG JWT_SECRET_KEY
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY:-your_jwt_secret}

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=${OPENAI_API_KEY:-your_openai_api_key}

ARG LANGCHAIN_API_KEY
ENV LANGCHAIN_API_KEY=${LANGCHAIN_API_KEY:-your_langchain_api_key}

ARG DRAMATIQ_BROKER_URL
ENV DRAMATIQ_BROKER_URL=${DRAMATIQ_BROKER_URL:-redis://localhost:6379}

# Run app.py when the container launches
CMD ["python", "app.py"]
