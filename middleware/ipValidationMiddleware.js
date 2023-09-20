import ipinfoConfig from '../config/ipinfo.js';
import IPinfoWrapper from 'node-ipinfo';

// Replace 'YOUR_API_TOKEN' with your actual IPinfo API token
const apiToken = ipinfoConfig.access_token;

// const ipinfo = new IPinfoWrapper(apiToken);

// Define a middleware function to validate the user's IP address
const validateIPAddressMiddleware = async (req, res, next) => {
  try {
    // Get the user's IP address from the 'x-user-ip' header
    // const userIPAddress = req.headers['x-user-ip'];

    const request = await fetch(`https://ipinfo.io/json?token=${apiToken}`)
    const ipData = await request.json();

    // console.log(ipData.ip, ipData.country);

    // Log the IP data for debugging purposes
    console.log('IP information:', ipData);

    // Implement your IP validation logic here (e.g., using the isIPValid function)
    if (isIPValid(ipData)) {
      // The IP address is valid, proceed to the next middleware or route handler
      next();
    } else {
      // The IP address is invalid, send an error response with a reason
      res.status(403).json({ error: 'Access denied: Invalid IP address' });
    }
  } catch (err) {
    console.error('Error fetching IP information:', err);

    // Handle errors that occur during IP validation
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define a function to check if an IP address is valid (customize this as needed)
const isIPValid = (ipData) => {
  // Check if the IP data is available
  if (!ipData) {
    return false; // If no IP data is available, consider it invalid
  }

  // Check the country code (e.g., allow IPs from India)
  if (ipData.country !== 'IN') {
    return false; // Only allow IPs from India
  }
  
  // If all checks pass, consider the IP valid
  return true;
};

export default validateIPAddressMiddleware;
