import React from 'react';

const AboutPage = () => {
  const values = [
    { title: "Sustainability", desc: "Dedicated to protecting the environment through energy-efficient products." },
    { title: "Innovation", desc: "Investing in research to create smarter, future-ready electrical solutions." },
    { title: "Quality", desc: "Ensuring every product meets the highest standards of safety and durability." },
    { title: "Integrity", desc: "Operating with honesty, transparency, and accountability in all aspects." },
    { title: "Social Impact", desc: "Making energy-efficient products accessible and affordable for all." },
    { title: "Responsibility", desc: "Helping communities reduce costs while preserving natural resources." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#5c6bc0] to-[#7e57c2] pt-32 pb-20 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Our Purpose</h1>
          <p className="text-lg md:text-xl text-indigo-100 font-medium leading-relaxed">
            Your Trusted Partner in Safe Electricity. We illuminate lives and power progress 
            through innovative, energy-efficient electrical solutions.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-[#5c6bc0] rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To be the leading provider of high-quality electrical products that maximize energy efficiency 
              and minimize environmental impact on a global scale.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-[#5c6bc0] rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Design and manufacture high-quality products through continuous innovation and sustainable practices, 
              empowering customers to save energy and support a greener planet.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Core Values</h2>
            <div className="w-20 h-1 bg-[#5c6bc0] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:-translate-y-1 transition-all">
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#5c6bc0] transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability Statement */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Energy Responsibility</h2>
        <p className="text-slate-500 italic leading-loose text-lg">
          "We believe in the optimum use of energy, helping communities and industries reduce costs 
          while preserving the earth's natural resources for future generations."
        </p>
      </div>
    </div>
  );
};

export default AboutPage;