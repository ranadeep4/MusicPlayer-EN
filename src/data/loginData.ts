// Data-driven login test cases
export interface LoginTestCase {
  username: string;
  password: string;
  valid: boolean;
  description: string;
}

export const loginData: LoginTestCase[] = [
  { username: 'demo', password: 'demo', valid: true, description: 'Valid credentials' },
  { username: 'demo', password: 'wrongpass', valid: false, description: 'Invalid password' },
  { username: 'wronguser', password: 'demo', valid: false, description: 'Invalid username' },
  { username: '', password: '', valid: false, description: 'Empty credentials' }
];
