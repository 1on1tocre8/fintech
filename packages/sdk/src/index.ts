import fetch from 'cross-fetch';

export async function getHealth(baseUrl: string) {
  const res = await fetch(`${baseUrl}/health`);
  return res.json();
}
