# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy application files to the container
COPY server/app.py .
COPY server/requirements.txt .
COPY engine/stockfish-ubuntu-x86-64-sse41-popcnt /app/engine/stockfish

# Give executable permission to the Stockfish engine binary
RUN chmod +x /app/engine/stockfish

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 for Flask
EXPOSE 5000

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Command to run the Flask app using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
