import ResumeForm from '@/components/ResumeForm';
import { Zap, FileText, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Optimize Your Resume with AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Boost your chances of landing interviews by tailoring your resume with AI-powered keyword optimization.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Zap className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">AI-Powered</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced AI algorithms analyze job descriptions to identify key requirements.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">ATS-Friendly</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Ensure your resume passes through Applicant Tracking Systems.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Targeted Optimization</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Tailor your resume specifically for each job application.
          </p>
        </div>
      </div>

      {/* Resume Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <ResumeForm />
      </div>
    </div>
  );
}