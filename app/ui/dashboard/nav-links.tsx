import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const graduateLinks = [
  { name: 'Үндсэн цэс', href: '/home', icon: HomeIcon },
  {
    name: 'Багш',
    href: '/home/instructors',
    icon: UserGroupIcon,
  },
  {
    name: 'Мессеж',
    href: '/home/messages',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Сургалт',
    href: '/home/trainings',
    icon: ComputerDesktopIcon,
  },
];

const instructorLinks = [
  { name: 'Үндсэн цэс', href: '/home', icon: HomeIcon },
  {
    name: 'Төгсөгч',
    href: '/home/graduates',
    icon: UserGroupIcon,
  },
  {
    name: 'Мессеж',
    href: '/home/messages',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Сургалт',
    href: '/home/trainings',
    icon: ComputerDesktopIcon,
  },
];

const adminLinks = [
  { name: 'Үндсэн цэс', href: '/home', icon: HomeIcon },
  {
    name: 'Багш бүртгэх',
    href: '/home/instructors/register',
    icon: UserGroupIcon,
  },
  {
    name: 'Багш нарын жагсаалт',
    href: '/home/instructors/delete',
    icon: UserGroupIcon,
  },
  {
    name: 'Төгсөгч бүртгэх',
    href: '/home/graduates/register',
    icon: UserGroupIcon,
  },
  {
    name: 'Төгсөгчдийн жагсаалт',
    href: '/home/graduates/delete',
    icon: UserGroupIcon,
  },
];

export default function NavLinks({ usertype }: { usertype: string }) {
  const links = usertype === 'admin' ? adminLinks : (usertype === 'graduate' ? graduateLinks : instructorLinks);

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
