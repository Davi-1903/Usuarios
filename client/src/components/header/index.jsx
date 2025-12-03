import { Link } from 'react-router-dom';
import { IconHome, IconLogin } from '@tabler/icons-react';

export default function Header() {
    return (
        <header className='bg-header shadow-basic col-span-2 flex items-center justify-between px-8'>
            {/* Logo Ilustrativa */}
            <div className='aspect-square h-[60%] rounded-full bg-black'></div>
            <nav>
                <ul className='flex gap-8'>
                    <li className='link'>
                        <Link to='/'>
                            <button>
                                <IconHome />
                            </button>
                        </Link>
                    </li>
                    <li className='link'>
                        <Link to='/auth'>
                            <button>
                                <IconLogin />
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
