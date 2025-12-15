import { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { useMessages } from '../../context/MessagesContext';

export default function Message({ id, description, ok }) {
    const [isDeleting, setDeleting] = useState(false);
    const { setMessages } = useMessages();

    function handleDeleteMessage(id) {
        setMessages(prev => prev.filter(message => message.id !== id));
    }

    function onHandleAnimationEnd(id) {
        if (isDeleting) {
            handleDeleteMessage(id);
            setDeleting(false);
        }
    }

    return (
        <div
            className={`pointer-events-auto grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] overflow-x-hidden ${isDeleting ? 'animate-delete-message' : 'animate-new-message'} ${ok ? 'bg-green' : 'bg-red'} `}
            onAnimationEnd={() => onHandleAnimationEnd(id)}
        >
            <div className='flex-1 p-4'>
                <p className='font-secundary text-md text-wrap text-white'>{description}</p>
            </div>
            <div>
                <button className='cursor-pointer p-1' onClick={() => setDeleting(true)}>
                    <IconX size={24} className='stroke-white' />
                </button>
            </div>
            <div className='col-span-2 h-2 w-full'>
                <div
                    className='animate-progress h-full w-0 bg-white'
                    onAnimationEnd={() => setDeleting(true)}
                ></div>
            </div>
        </div>
    );
}
