import React, { useEffect } from 'react';
import { onAuthStateChanged } from '/auth';
import { auth } from './lib/';
import { useStore } from './store/useStore';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';

function App() {
  const { setUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // If user is new, set initial boosts
      if (user) {
        // In a real app, you'd fetch this from your backend
        useStore.getState().setBoosts(3);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Optimize Your Resume with AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Boost your chances of landing interviews by tailoring your resume with AI-powered keyword optimization.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <ResumeForm />
          </div>

          {/* Features section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* ... (features section remains the same) ... */}
          </div>
        </div>
      </main>

      {/* ... (footer remains the same) ... */}
    </div>
  );
}

export default App;