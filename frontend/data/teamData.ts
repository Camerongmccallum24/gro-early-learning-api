import { TeamMember } from '@/components/LeadershipTeam';

export const leadershipTeamData: TeamMember[] = [
  {
    name: 'Coraline Dufroux',
    role: 'Founder',
    bio: "Founded by Coraline Dufroux, GRO was born from firsthand experience of the childcare gaps in small towns. With a deep commitment to transforming regional childcare, the organisation has invested hundreds of thousands into uplifting environments, resources, and staff quality to elevate industry standards.",
    imageUrl: 'https://storage.googleapis.com/careerssite/Coraline_Dufroux.jpeg',
    altText: 'Coraline Dufroux, Founder of GRO Early Learning',
    profileLink: '/team/coraline-dufroux'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Education',
    bio: 'Michael is a qualified early childhood educator with a Masters in Educational Leadership. He oversees curriculum development and educator training across all GRO centres.',
    imageUrl: '/images/team/michael-chen.jpg',
    altText: 'Michael Chen, Head of Education',
    profileLink: '/team/michael-chen'
  },
  {
    name: 'Emma Williams',
    role: 'Operations Director',
    bio: 'Emma manages daily operations across our network of centres, ensuring high standards of care and educational excellence in every location.',
    imageUrl: '/images/team/emma-williams.jpg',
    altText: 'Emma Williams, Operations Director'
  },
  {
    name: 'David Rodriguez',
    role: 'Head of People & Culture',
    bio: 'David leads our human resources initiatives, focusing on educator wellbeing, professional development, and creating an inclusive workplace culture.',
    imageUrl: '/images/team/david-rodriguez.jpg',
    altText: 'David Rodriguez, Head of People & Culture',
    profileLink: '/team/david-rodriguez'
  }
];

// Example usage:
// import { leadershipTeamData } from '@/data/teamData';
// <LeadershipTeam members={leadershipTeamData} /> 