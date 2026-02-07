import type { User } from '../interfaces/Objects';
import getCSRF from './csrf';

export async function GET(url: string): Promise<User> {
    const response = await fetch(url, { credentials: 'include' });
    const data = await response.json();
    return data;
}

export async function POST<T>(url: string, data: unknown): Promise<T> {
    const token = await getCSRF();
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': token },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
}
