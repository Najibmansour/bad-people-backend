import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

const jwt = new JwtService({
  secret: secret,
});

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token); // returns payload if valid
    return decoded;
  } catch (error) {
    // Differentiate errors if needed
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('Invalid token');
    } else {
      console.error('Token verification failed', error);
    }
    return null; // Or rethrow if you want higher-level handling
  }
}

export function getUserFromToken(token: string) {
  const data = verifyToken(token);
  console.log(data);
}

export function getUserIdFromToken(token: string) {}

export function getUserRoomFromToken(token: string) {}
