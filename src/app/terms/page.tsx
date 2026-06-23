import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black-950 py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-gold max-w-none text-gray-300 space-y-6">
          <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing the services provided by Falcon Eye Security, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">2. Description of Services</h2>
          <p>
            Falcon Eye Security provides elite protection services, including but not limited to VIP bodyguards, event security, asset protection, and corporate guarding. The exact scope of services will be defined in a separate, confidential agreement signed by both parties prior to deployment.
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">3. Client Responsibilities</h2>
          <p>
            Clients must provide accurate and complete information required for threat assessment and operational planning. The client agrees to cooperate fully with Falcon Eye personnel to ensure the highest level of security.
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            While Falcon Eye Security employs highly trained professionals and industry-leading strategies to mitigate risks, we cannot guarantee absolute immunity from all threats. Falcon Eye Security shall not be held liable for indirect, incidental, or consequential damages arising from unforeseen events beyond our reasonable control.
          </p>

          <h2 className="text-2xl font-semibold text-gold-500 mt-8 mb-4">5. Governing Law</h2>
          <p>
            These terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Sri Lanka.
          </p>
          
          <div className="mt-12 p-4 bg-black-900 border border-white/5 rounded-lg">
            <p className="text-sm text-gray-500 italic text-center">
              Disclaimer: This is a placeholder Terms of Service document for demonstration purposes. Please consult with legal counsel to draft comprehensive Terms for your business operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
