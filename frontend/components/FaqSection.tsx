'use client';

import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Search, ChevronDown, CircleHelp, Users } from 'lucide-react';

interface FAQItem {
  id: string;
  icon: React.ReactNode;
  question: string;
  answer: React.ReactNode;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const categories: Category[] = [
  {
    id: 'general',
    title: 'Working at GRO – General',
    icon: <CircleHelp className="h-6 w-6 text-white" />,
    items: [
      {
        id: 'general-1',
        icon: <CircleHelp className="h-5 w-5 text-gro-teal" />,
        question: 'What makes a career at GRO Early Learning different from other childcare providers?',
        answer: <p>GRO focuses on holistic child development, offers continuous training, and values educator wellbeing through flexible work arrangements, mentorship programs, and a supportive community.</p>
      },
      {
        id: 'general-2',
        icon: <CircleHelp className="h-5 w-5 text-gro-teal" />,
        question: 'What qualifications do I need to work at GRO Early Learning?',
        answer: <p>We welcome educators with Certificate III in Early Childhood Education and Care, Diploma qualifications, or Bachelor degrees in Early Childhood. We also support career changers through our training programs.</p>
      },
      {
        id: 'general-3',
        icon: <CircleHelp className="h-5 w-5 text-gro-teal" />,
        question: 'What are the career progression opportunities at GRO?',
        answer: <p>Our clear career pathway takes you from Assistant Educator to Centre Director, with defined milestones, training opportunities, and leadership development at each level.</p>
      }
    ]
  },
  {
    id: 'visa',
    title: 'International Applicants & Visa Sponsorship',
    icon: <Users className="h-6 w-6 text-white" />,
    items: [
      {
        id: 'visa-1',
        icon: <CircleHelp className="h-5 w-5 text-gro-teal" />,        
        question: 'Which visa pathways does GRO sponsor for early‑childhood roles?',
        answer: <p>We sponsor the Skilled Worker visa (subclass 482) and offer support for DAMA agreements in designated regions.</p>
      },
      {
        id: 'visa-2',
        icon: <CircleHelp className="h-5 w-5 text-gro-teal" />,        
        question: 'What is the visa sponsorship process timeline?',
        answer: <p>The process typically takes 3-6 months from application to approval. We provide dedicated support throughout, including document preparation and liaison with immigration authorities.</p>
      },
      {
        id: 'visa-3',
        icon: <CircleHelp className="h-5 w-5 text-gro-teal" />,        
        question: 'Do you provide relocation assistance for international applicants?',
        answer: <p>Yes! We offer comprehensive relocation support including temporary accommodation, settling-in assistance, and up to $5,000 in relocation benefits for successful candidates.</p>
      }
    ]
  }
];

export default function FaqSection() {
  const [filter, setFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].id);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.question.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-br from-gro-orange/10 to-gro-teal/10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gro-darkblue">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about working at GRO Early Learning
          </p>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow focus-within:ring-2 ring-gro-teal mb-8">
          <Search className="h-5 w-5 text-gro-teal mr-2" aria-hidden />
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="flex-1 h-10 bg-transparent placeholder:text-gray-500 focus:outline-none text-base"
            placeholder="Search for a question..."
            aria-label="Search FAQ"
          />
        </div>

        {/* Category tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full border transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gro-teal focus:ring-offset-2 ${
                activeCategory === cat.id
                  ? cat.id === 'general' 
                    ? 'bg-gro-orange/20 text-gro-orange border-gro-orange' 
                    : 'bg-gro-teal/20 text-gro-teal border-gro-teal'
                  : 'bg-transparent text-gro-gray border-gray-300 hover:bg-gro-lightgray'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </nav>

        {/* Accordion */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map(cat => (
            <div key={cat.id} className="mb-8">
              <div className="mb-4">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <span className={`p-2 rounded-full ${cat.id === 'general' ? 'bg-gro-orange' : 'bg-gro-teal'}`}>
                    {cat.icon}
                  </span>
                  <h3 className="text-xl font-bold text-gro-darkblue">
                    {cat.title}
                    <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                      {cat.items.length}
                    </span>
                  </h3>
                </div>
              </div>
              
              <Accordion.Root type="single" collapsible className="space-y-2">
                {cat.items.map(item => (
                  <Accordion.Item key={item.id} value={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 text-left text-base font-medium hover:bg-gro-teal/5 focus:outline-none focus:ring-2 focus:ring-gro-teal rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-gro-darkblue">{item.question}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gro-teal transition-transform data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
                      {item.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gro-gray text-lg">No results found for &ldquo;{filter}&rdquo;</p>
            <p className="text-gro-gray text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </section>
  );
} 