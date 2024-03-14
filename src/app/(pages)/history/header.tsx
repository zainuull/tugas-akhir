'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <span className="flex items-center gap-x-4 px-4">
      <Link
        href={'/history'}
        className={`mb-4  text-primary ${
          pathname == '/history' ? 'font-semibold border-b-2 border-primary' : ''
        }`}>
        Credit
      </Link>
      <Link
        href={'/history/activation'}
        className={`mb-4  text-primary ${
          pathname == '/history/activation' ? 'font-semibold border-b-2 border-primary' : ''
        }`}>
        Activation
      </Link>
      <Link
        href={'/history/injection'}
        className={`mb-4  text-primary ${
          pathname == '/history/injection' ? 'font-semibold border-b-2 border-primary' : ''
        }`}>
        Injection
      </Link>
      <Link
        href={'/history/new-cards'}
        className={`mb-4  text-primary ${
          pathname == '/history/new-cards' ? 'font-semibold border-b-2 border-primary' : ''
        }`}>
        New Cards
      </Link>
    </span>
  );
};

export default Header;
