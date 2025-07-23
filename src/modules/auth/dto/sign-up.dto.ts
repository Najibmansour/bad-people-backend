import { IsEmail, IsString, Matches, Max, Min } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  username: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character',
    },
  )
  password: string;
}
