'use client';

import { useState } from 'react';
import type { Job } from '@/data/mockJobsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import {
  X,
  Mail,
  Phone,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface ApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplicationModal({ job, isOpen, onClose, onSuccess }: ApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSubmitted(false);
      }, 2000);
    }, 1000);
  };

  const contactEmail = 'careers@groearlylearning.com.au';
  const contactPhone = '1300 GRO CARE';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-gro-darkblue">
            Apply for {job.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-gro-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gro-darkblue mb-2">
                Thank you for your interest!
              </h3>
              <p className="text-gro-gray">
                We'll be in touch soon with next steps.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gro-teal/10 rounded-lg p-4">
                <h3 className="font-semibold text-gro-darkblue mb-2">Position Details</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {job.title}</p>
                  <p><strong>Location:</strong> {job.location.city}, {job.location.state}</p>
                  <p><strong>Type:</strong> {job.employment.type}</p>
                  {job.salary.showRange && (
                    <p><strong>Salary:</strong> ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()} {job.salary.currency} {job.salary.period}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gro-darkblue">How to Apply</h3>
                <p className="text-gro-gray">
                  To apply for this position, please contact us using one of the methods below.
                  We look forward to hearing from you!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-gro-teal mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gro-darkblue mb-1">Email</h4>
                        <p className="text-sm text-gro-gray mb-2">
                          Send your resume and cover letter to:
                        </p>
                        <a
                          href={`mailto:${contactEmail}?subject=Application for ${job.title} - ${job.location.city}&body=Dear GRO Early Learning Team,%0D%0A%0D%0AI am interested in applying for the ${job.title} position in ${job.location.city}.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AThank you for your consideration.`}
                          className="text-gro-teal hover:text-gro-teal/80 font-medium text-sm flex items-center gap-1"
                        >
                          {contactEmail}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-gro-orange mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gro-darkblue mb-1">Phone</h4>
                        <p className="text-sm text-gro-gray mb-2">
                          Call us to discuss this opportunity:
                        </p>
                        <a
                          href={`tel:${contactPhone}`}
                          className="text-gro-orange hover:text-gro-orange/80 font-medium text-sm flex items-center gap-1"
                        >
                          {contactPhone}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gro-green/10 rounded-lg p-4">
                <h4 className="font-semibold text-gro-darkblue mb-2">What to Include</h4>
                <ul className="text-sm text-gro-gray space-y-1">
                  <li>• Your current resume/CV</li>
                  <li>• A cover letter explaining your interest</li>
                  <li>• Any relevant qualifications or certifications</li>
                  <li>• References (optional)</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="px-6 bg-gro-orange hover:bg-gro-orange/90"
                >
                  I've Sent My Application
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
setError('Please upload a PDF or Word document');
return;
      }

if (file.size > maxSize) {
  setError('File size must be less than 5MB');
  return;
}

setFormData(prev => ({
  ...prev,
  resumeFile: file
}));
setError(null);
    }
  };

const handleSubmit = async () => {
  if (!formData.coverLetter.trim()) {
    setError('Please write a cover letter');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    setUploadProgress(50);

    const applicationResponse = await apiClient.submitApplication(job._id, {
      coverLetter: formData.coverLetter
    });

    setUploadProgress(100);

    if (applicationResponse.status === 'success') {
      setTimeout(() => {
        onSuccess();
        onClose();
        setFormData({
          coverLetter: '',
          resumeFile: null
        });
        setStep(1);
        setUploadProgress(0);
      }, 1000);
    } else {
      throw new Error(applicationResponse.error || 'Failed to submit application');
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Application submission failed');
    setUploadProgress(0);
  } finally {
    setLoading(false);
  }
};

const handleNext = () => {
  setError(null);
  setStep(step + 1);
};

const handleBack = () => {
  setError(null);
  setStep(step - 1);
};

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gro-darkblue">Apply for Position</h2>
          <p className="text-gro-gray mt-1">{job.title}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step} of 2</span>
          <span className="text-sm text-gray-500">
            {step === 1 ? 'Cover Letter' : 'Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gro-teal h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Your Cover Letter</h3>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                placeholder="Tell us why you're interested in this position and what makes you a great fit for GRO Early Learning..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.coverLetter.length} characters
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Cover Letter Tips</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Explain why you want to work in early childhood education</li>
                <li>• Mention your passion for working with children</li>
                <li>• Highlight relevant experience or skills</li>
                <li>• Show enthusiasm for the specific location and community</li>
              </ul>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Application</h3>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-gray-900">Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Position:</strong> {job.title}</p>
                    <p><strong>Location:</strong> {job.location?.city}, {job.location?.state}</p>
                    <p><strong>Employment Type:</strong> {job.employment?.type}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-gray-900">Your Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-3 rounded border max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {formData.coverLetter}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {loading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-sm font-medium text-blue-900">
                    Submitting your application...
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-6 border-t bg-gray-50">
        <div>
          {step > 1 && (
            <Button onClick={handleBack} variant="secondary" disabled={loading}>
              Back
            </Button>
          )}
        </div>
        <div className="flex space-x-3">
          <Button onClick={onClose} variant="secondary" disabled={loading}>
            Cancel
          </Button>
          {step < 2 ? (
            <Button onClick={handleNext} variant="gro" disabled={loading || !formData.coverLetter.trim()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant="gro" disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
);
} 