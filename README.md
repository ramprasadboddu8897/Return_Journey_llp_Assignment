# IP Address and OTP Validation API

This Node.js application provides two API endpoints for IP address validation and OTP (One-Time Password) validation, with the following functionality:

## Features

- **IP Address Validation**: Verify if an IP address is from "India."

- **OTP Validation**: Generate and validate one-time passwords for secure authentication.

## API Endpoints

### Register User

- **Endpoint**: `/user/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "userName": "John Doe",
    "phoneNumber": "+1234567890"
  }

### Response:

#### Valid IP (from "India"):

  **OTP Sent:**

  ```json
  {
    "message": "OTP sent to +1234567890"
  }

  **Error(OTP not Sent):**

  ```json
  {
    "error": "Failed to send OTP. Please try again later."
  }

### Invalid OTP:

  ```json
  {
    "error": "Invalid OTP. Please enter the correct OTP."
  }
