'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import type { Application } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  X, 
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Plus,
  Send,
  Video
} from 'lucide-react';

interface ApplicationDetailModalProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedApplication: Application) => void;
}

export default function ApplicationDetailModal({ 
  application, 
  isOpen, 
  onClose, 
  onUpdate 
}: ApplicationDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'interviews'>('overview');
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  if (!isOpen) return null;

  const candidate = typeof application.candidate === 'object' ? application.candidate : null;
  const job = typeof application.job === 'object' ? application.job : null;

  const candidateInfo = {
    name: candidate?.profile?.firstName && candidate?.profile?.lastName 
      ? `${candidate.profile.firstName} ${candidate.profile.lastName}`
      : 'Unknown Candidate',
    email: candidate?.email || 'No email',
    phone: candidate?.profile?.phone || 'No phone'
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800 border-blue-200',
      reviewing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      shortlisted: 'bg-green-100 text-green-800 border-green-200',
      interviewing: 'bg-purple-100 text-purple-800 border-purple-200',
      offered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      hired: 'bg-green-200 text-green-900 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gro-darkblue">{candidateInfo.name}</h2>
              <p className="text-gro-gray">{job?.title || 'Job Application'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
              {formatStatus(application.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-gro-teal border-b-2 border-gro-teal' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'notes' 
                ? 'text-gro-teal border-b-2 border-gro-teal' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Notes ({application.notes?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'interviews' 
                ? 'text-gro-teal border-b-2 border-gro-teal' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Interviews ({application.interviews?.length || 0})
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Candidate Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gro-darkblue">
                    <UserIcon className="h-5 w-5 mr-2" />
                    Candidate Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{candidateInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-sm">{candidateInfo.phone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Cover Letter */}
              {application.coverLetter && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gro-darkblue">Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {application.coverLetter}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gro-darkblue">Application Notes</h3>
                <Button 
                  onClick={() => setShowAddNote(true)} 
                  variant="gro" 
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>

              {showAddNote && (
                <Card className="border-gro-teal">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note about this application..."
                        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent resize-none"
                      />
                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={async () => {
                            if (!newNote.trim()) return;
                            try {
                              setLoading(true);
                              const response = await apiClient.addApplicationNote(application._id, newNote);
                              if (response.status === 'success' && response.data) {
                                onUpdate(response.data);
                                setNewNote('');
                                setShowAddNote(false);
                              }
                            } catch {
                              alert('Error adding note');
                            } finally {
                              setLoading(false);
                            }
                          }}
                          disabled={loading || !newNote.trim()}
                          size="sm"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowAddNote(false);
                            setNewNote('');
                          }}
                          variant="secondary" 
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {application.notes && application.notes.length > 0 ? (
                  application.notes.map((note, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-700">{note.note}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(note.addedAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No notes yet. Add the first note above.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gro-darkblue">Interviews</h3>
                <Button variant="gro" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>

              <div className="space-y-4">
                {application.interviews && application.interviews.length > 0 ? (
                  application.interviews.map((interview, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Video className="h-4 w-4 text-gro-teal" />
                          <span className="font-medium text-gray-900">
                            {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(interview.scheduledDate).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No interviews scheduled yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 