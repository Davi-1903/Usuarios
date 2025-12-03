export default function Footer() {
    return (
        <footer className='col-span-2 col-start-1 bg-black p-2'>
            <p className='font-primary text-center text-lg text-white'>
                Copyright &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
        </footer>
    );
}
