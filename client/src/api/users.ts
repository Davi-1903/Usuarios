import type { User } from '../interfaces/Objects';

export async function GET(
    url: string,
    headers: HeadersInit | undefined = undefined,
): Promise<User> {
    console.log(headers);
    const response = await fetch(url, { method: 'GET', credentials: 'include', headers: headers });
    const data = await response.json();
    data.status = response.status;
    return data;
}

export async function POST<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    result.status = response.status;
    return result;
}
