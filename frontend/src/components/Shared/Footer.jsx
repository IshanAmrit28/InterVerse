//frontend\src\components\Shared\Footer.jsx
import React from 'react';

/**
 * A reusable Footer component for the website.
 * Styled with standard Tailwind dark theme classes.
 */
export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-solid border-gray-700/50 bg-gray-900">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-10 py-8 sm:flex-row">
        <p className="text-sm text-gray-400">© 2024 Smart Interview Coach. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
            About
          </a>
          <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
            Pricing
          </a>
          <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
            Contact
          </a>
          <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
            Privacy Policy
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn social media icon" href="#">
            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
            </svg>
          </a>
          <a className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter social media icon" href="#">
            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.218 3.82 4.65- .783.212-1.623.262-2.478.098 1.62 2.206 4.256 3.02 6.566 2.476-2.189 1.711-4.965 2.597-7.86 2.15 2.296 1.476 5.023 2.338 7.948 2.338 9.525 0 14.738-7.892 14.738-14.738 0-.224-.005-.447-.015-.668.986-.712 1.85-1.6 2.548-2.637z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}