'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  altText?: string;
  profileLink?: string;
};

type LeadershipTeamProps = {
  members: TeamMember[];
};

export default function LeadershipTeam({ members }: LeadershipTeamProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gro-darkblue">
            Leadership Team
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Meet the passionate leaders driving our mission to provide exceptional early childhood education
          </p>
        </div>
        
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {members.map((member) => (
            <div 
              key={member.name} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.altText || member.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gro-darkblue">
                  {member.profileLink ? (
                    <Link 
                      href={member.profileLink} 
                      className="hover:text-gro-teal transition-colors duration-200"
                    >
                      {member.name}
                    </Link>
                  ) : (
                    member.name
                  )}
                </h3>
                <p className="text-gro-teal font-medium mb-3 text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 