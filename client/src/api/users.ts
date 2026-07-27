let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

export async function tryRefresh(): Promise<string | undefined> {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // envia o cookie HttpOnly automaticamente
    });

    if (!response.ok) return;

    const data = await response.json();
    setAccessToken(data.token);
    return data.token;
}

export async function GET<T = unknown>(url: string, headers: HeadersInit = {}): Promise<T & { status: number }> {
    let response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
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
        headers: { ...headers, 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    result.status = response.status;
    return result;
}
