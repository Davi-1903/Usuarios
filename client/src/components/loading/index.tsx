export default function Loading() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center gap-12'>
            <div className='aspect-square h-32 animate-spin rounded-full border-16 border-black border-b-transparent'></div>
            <p className='text-lg font-semibold text-black'>Verificando autenticação...</p>
        </main>
    );
}
