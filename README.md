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
