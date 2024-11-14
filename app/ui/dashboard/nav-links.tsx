import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { computeFromManifest } from 'next/dist/build/utils';
import Link from 'next/link';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  {
    name: 'Instructors',
    href: '/home/instructors',
    icon: UserGroupIcon,
  },
  {
    name: 'Messages',
    href: '/home/messages',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Trainings',
    href: '/home/trainings',
    icon: ComputerDesktopIcon,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
