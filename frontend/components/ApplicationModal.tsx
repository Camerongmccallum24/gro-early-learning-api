'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import type { Job } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  X, 
  Upload, 
  FileText, 
  Send, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplicationModal({ job, isOpen, onClose, onSuccess }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
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