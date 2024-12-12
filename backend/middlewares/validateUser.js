import jwt from 'jsonwebtoken';

// Middleware to validate token and check role
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Assuming the token is passed as Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // You should have a JWT_SECRET in your .env file
    req.user = decoded; // Attach the user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Middleware to check if the user has a 'courseManager' role
export const checkCourseManagerRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
  };
};
