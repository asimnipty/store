import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Welcare Power Ltd</h3>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            Leading the way in energy-efficient electrical solutions. Dedicated to sustainability, quality, and innovation.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li className="hover:text-blue-600 cursor-pointer">Products</li>
            <li className="hover:text-blue-600 cursor-pointer">Mission & Vision</li>
            <li className="hover:text-blue-600 cursor-pointer">Sustainability</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Connect</h4>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li>info@welcarepowerltd.com</li>
            <li>+880 1234 567 890</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] font-medium text-slate-400">© 2026 Welcare Power Ltd. All rights reserved.</p>
        <div className="flex gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;