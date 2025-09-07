import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: any) {
    e.preventDefault();
    await axios.post('/auth/login', { email, password });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
