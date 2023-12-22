import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white py-4 px-6 fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Uniuyo Senior Staff Club
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/events" className="hover:text-cyan-500">
              Events
            </Link>
          </li>
          <li>
            <Link href="/members" className="hover:text-yellow-400">
              Members
            </Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;