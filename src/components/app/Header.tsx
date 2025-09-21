import { FileJsonIcon } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline">
            <FileJsonIcon className="h-6 w-6 text-primary" />
            <span>Project Maestro</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
