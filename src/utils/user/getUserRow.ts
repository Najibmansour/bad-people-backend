import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { Socket } from 'socket.io';
import { SignInDto } from 'src/modules/auth/dto/sign-in.dto';

const secret = process.env.JWT_SECRET;

const jwt = new JwtService({
  secret: secret,
});

type Payload = {
  username: string;
  id: string;
  iat: number;
};
function verifyToken(token: string | null) {
  if (token === null) return null;

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

export function getUserFromToken(token: string | null): Payload {
  return verifyToken(token);
}

export function getUserIdFromToken(token: string) {}

export function getUserRoomFromToken(token: string) {}

export function getTokenFromClient(client: Socket): string | null {
  try {
    const authHeader = client.handshake.headers.authorization;

    // No Authorization header
    if (!authHeader) {
      return null;
    }

    // Must start with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return null;
    }

    // Extract token part
    const token = authHeader.split(' ')[1];

    return token || null;
  } catch (err) {
    // Handle unexpected handshake format
    console.error('Error extracting token from client:', err);
    return null;
  }
}
