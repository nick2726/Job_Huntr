import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 text-center bg-white rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
        Welcome to InternshipHub
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
        Discover and apply to the best internships. AI-powered matching, intelligent search, and easy bookmarking all in one place.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/internships"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Browse Internships
        </a>
      </div>
    </div>
  );
};

export default Home;
