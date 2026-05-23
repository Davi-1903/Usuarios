export async function tryRefresh(): Promise<string | undefined> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return;

    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return;

    const data = await response.json();
    localStorage.setItem('access_token', data.token);
    return data.token;
}

export async function GET<T = unknown>(
    url: string,
    headers: HeadersInit = {},
): Promise<T & { status: number }> {
    const token = localStorage.getItem('access_token');
    let response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { ...headers, Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
        const newToken = await tryRefresh();
        if (newToken) {
            response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: { ...headers, Authorization: `Bearer ${newToken}` },
            });
        }
    }

    const data = await response.json();
    data.status = response.status;
    return data;
}

export async function POST<T>(url: string, data: unknown, headers: HeadersInit = {}): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    result.status = response.status;
    return result;
}
