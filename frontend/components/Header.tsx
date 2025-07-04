'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated, apiClient } from '@/lib/api';
import { User, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link className="flex items-center" href="/">
            <Image
              src="/GRO-Logo.png"
              alt="GRO Early Learning"
              width={48}
              height={48}
              className="h-12 w-auto object-fill"
              priority
            />
          </Link>
        </div>
        <nav className={`lg:flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/">Home</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/jobs">Jobs</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/about">About Us</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/our-team">Our Team</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/benefits">Benefits</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/professional-development">Development</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/relocation">Relocation</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/blog">Blog</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/faq">FAQ</Link>
          <Link className="font-medium text-gro-darkgray hover:text-gro-teal transition-colors" href="/contact">Contact</Link>
        </nav>
        <div className="hidden md:block flex-1 max-w-md mx-6">
          <div className="relative">
            <svg className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 pr-10" placeholder="Search jobs, pages..." defaultValue="" />
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 transform hover:shadow-lg hover:-translate-y-0.5 h-10 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <User className="h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 transform hover:shadow-lg hover:-translate-y-0.5 h-10 px-4 py-2 bg-gro-orange hover:bg-gro-orange/90 text-white"
              >
                Browse Jobs
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 transform hover:shadow-lg hover:-translate-y-0.5 h-10 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
              <Link 
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 transform hover:shadow-lg hover:-translate-y-0.5 h-10 px-4 py-2 bg-gro-orange hover:bg-gro-orange/90 text-white"
              >
                Apply Now
              </Link>
            </>
          )}
        </div>
        <button className="lg:hidden p-2" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="lucide lucide-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        </button>
      </div>
    </header>
  );
} 