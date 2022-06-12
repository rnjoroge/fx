const authConfig = {
    secret: process.env.SECRET,
    tokenExpiryTime: 300, // seconds => 5 minutes
  }
  
  export { authConfig }