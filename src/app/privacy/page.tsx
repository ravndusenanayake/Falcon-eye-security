import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black-950 py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-gold max-w-none text-gray-300 space-y-6">
          <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            At Falcon Eye Security, we take your privacy seriously. We collect information that you provide directly to us, such as when you request a consultation, sign up for our services, or communicate with us. This may include your name, contact details, company information, and specific security requirements.
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is strictly used to provide, maintain, and improve our elite security services. We use this data to perform threat assessments, deploy personnel effectively, and ensure the safety of our clients. We do not sell or share your personal data with unauthorized third parties.
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">3. Data Security and Confidentiality</h2>
          <p>
            Confidentiality is the cornerstone of our operations. We implement rigorous, military-grade security measures to protect your personal and operational information from unauthorized access, alteration, disclosure, or destruction. All our personnel are bound by strict Non-Disclosure Agreements (NDAs).
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">4. Your Rights</h2>
          <p>
            You have the right to access, update, or request the deletion of your personal information at any time. If you have any questions or concerns regarding our privacy practices, please contact our administrative office.
          </p>
          
          <div className="mt-12 p-4 bg-black-900 border border-white/5 rounded-lg">
            <p className="text-sm text-gray-500 italic text-center">
              Disclaimer: This is a placeholder Privacy Policy for demonstration purposes. Please consult with legal counsel to draft a comprehensive Privacy Policy for your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
