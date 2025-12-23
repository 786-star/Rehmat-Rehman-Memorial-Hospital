import { useAuth } from '@/providers/AuthProvider';
import { User } from 'lucide-react';
import Button from '../Button/Button';
import { useState } from 'react';
import TokenModal from '../Modal/TokenModal';

const Header = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-bold">
                Welcome, <span className='text-green-400'>{user?.username}</span>
              </span>
              <User size={24} />
              <Button label={'Token'} onClick={() => setOpenModal(true)} className='w-24' />
            </div>
          </div>
        </div>
      </header>
      {openModal && (
        <TokenModal onClose={() => setOpenModal(false)} />
      )}
    </>

  );
};

export default Header;