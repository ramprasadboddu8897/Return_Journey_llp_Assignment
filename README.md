# IP Address and OTP Validation API

This Node.js application provides two API endpoints for IP address validation and OTP (One-Time Password) validation, with the following functionality:

## Features

- **IP Address Validation**: Verify if an IP address is from "India."

- **OTP Validation**: Generate and validate one-time passwords for secure authentication.

## API Endpoints

### 1. Register User

- **Endpoint**: `/user/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "userName": "John Doe",
    "phoneNumber": "+1234567890"
  }

- **Response**:
  - **Valid IP (from "India")**:
    - **OTP Sent:**

        ```json
          {
            "message": "OTP sent to +1234567890"
          }

    - **Error(OTP not Sent)**:

      ```json
        {
          "error": "Failed to send OTP. Please try again later."
        }
  
  - **Invalid IP (not from "India")**:

    ```json
    {
      "error": "User must be from India."
    }

### 2. Validate User

- **Endpoint**: `/user/validate`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "userName": "John Doe",
    "phoneNumber": "+1234567890",
    "otp": "123456"
  }

- **Response**:
  - **Valid OTP**:
    - **User Details saved:**

        ```json
          {
            "message": "User details saved successfully."
          }

    - **Error (User details not saved)**:

      ```json
        {
          "error": "Failed to save user details. Please try again later."
        }
  
  - **Invalid OTP**:

    ```json
    {
      "error": "Invalid OTP. Please enter the correct OTP."
    }

 
## Getting Started

1. Clone this repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your environment variables:

   ```env
   IPINFO_API_TOKEN=your-ipinfo-api-token
   OTP_SECRET=your-otp-secret
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
