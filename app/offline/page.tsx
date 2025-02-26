"use client";
export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Offline</h1>
      <p className="text-xl mb-8">
        You are currently offline. Please check your internet connection.
      </p>
      <button
        onClick={() =>(typeof window !== "undefined") && window.location.reload()}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
