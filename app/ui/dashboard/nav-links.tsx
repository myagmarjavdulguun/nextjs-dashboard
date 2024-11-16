import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Define links for each user type
const graduateLinks = [
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

const instructorLinks = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  {
    name: 'Graduates',
    href: '/home/graduates',
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

export default function NavLinks({ usertype }: {usertype: string}) {
  // Determine the links to display based on user type
  const links = usertype === 'graduate' ? graduateLinks : instructorLinks;

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
