export default async function getCSRF(): Promise<string> {
    const response = await fetch('/api/auth/csrf', {
        credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
}
