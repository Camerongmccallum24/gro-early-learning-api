'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  subject: "",
  message: "",
};

const locations = [
  { value: "", label: "Select a location" },
  { value: "mount-isa", label: "Mount Isa" },
  { value: "moranbah", label: "Moranbah" },
  { value: "charters-towers", label: "Charters Towers" },
  { value: "other", label: "Other" },
];

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General Inquiry" },
  { value: "careers", label: "Career Opportunities" },
  { value: "training", label: "Training Programs" },
  { value: "relocation", label: "Relocation Support" },
  { value: "sponsorship", label: "Sponsorship Support" },
  { value: "support", label: "Technical Support" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: integrate real API
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Form submitted:", formData);
    
    setFormData(initialForm);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-gro-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-gro-green" />
        </div>
        <h3 className="text-xl font-bold text-gro-darkblue mb-2">Message Sent!</h3>
        <p className="text-gro-gray mb-4">
          Thank you for your message. We&apos;ll get back to you within 24 hours.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)} 
          variant="outline"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gro-darkblue mb-2">
          Send us a Message
        </h2>
        <p className="text-sm text-gro-gray">
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name *">
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </FormField>
          
          <FormField label="Email Address *">
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Phone Number">
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
            />
          </FormField>
          
          <FormField label="Preferred Location">
            <Select
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField label="Subject *">
          <Select
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            required
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Message *">
          <Textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Tell us how we can help you..."
            className="min-h-[120px]"
            required
          />
        </FormField>

        <Button 
          type="submit" 
          className="w-full"
          variant="secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="block mb-2">{label}</Label>
      {children}
    </div>
  );
} 