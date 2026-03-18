import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
      {/* Sleek Gradient Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        Loading Gear...
      </p>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
        ⚠️
      </div>
      <div>
        <p className="text-red-800 text-sm font-bold">System Notice</p>
        <p className="text-red-600 text-xs font-medium">{message}</p>
      </div>
    </div>
  );
}

const UI = { LoadingSpinner, ErrorMessage };
export default UI;