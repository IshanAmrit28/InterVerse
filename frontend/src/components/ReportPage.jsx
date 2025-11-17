//frontend\src\components\ReportPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A reusable component to display a detailed interview analysis report.
 * Includes header, stats, skill ratings, and question-by-question breakdown.
 */
export default function ReportPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-900 font-display text-gray-300">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-700 bg-gray-800/80 px-4 py-3 backdrop-blur-sm sm:px-6 md:px-8">
        <div className="flex items-center gap-4 text-white">
          <div className="size-8 text-blue-500">
            {/* Logo SVG */}
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              ></path>
              <path
                clipRule="evenodd"
                d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="font-heading text-lg font-bold leading-tight tracking-[-0.015em]">
            Smart Interview Coach
          </h2>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <div className="hidden items-center gap-6 md:flex">
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link className="text-sm font-medium text-white" to="/practice">
              Practice
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              to="/history"
            >
              History
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              to="/resources"
            >
              Resources
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
              <span className="material-symbols-outlined text-2xl">notifications</span>
            </button>
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
              <span className="material-symbols-outlined text-2xl">settings</span>
            </button>
            <div
              className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
              aria-label="User avatar"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYp9aA7pKEaFimTZv9XMTbUVUN00yKneaKZtrgTp93UM8daLkLgXQqiob1n9LEvTIiFBcH26BsyPOgYbHXPpz9z3KXFFdDFVRqnVxa3vEEH6UpM4hGmO8Pav6dKWO5EiQezrf1aiYrORbi0YUGvEFHNaqouq3Zb1DPbyE3lNPAmYHhW1je4LAiTD9OE2IDuH6FR2lsQYjaQPPyIJ5Lasiy_2F8uIF5xpfQAJ8aeSV2HXxdEjSNwEk1cIQNiai1ryrsISd41WwfAW2p")',
              }}
            ></div>
          </div>
        </div>
      </header>
      <main className="flex h-full w-full grow flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8">
          <div className="flex flex-col gap-8">
            {/* Page Heading & Actions */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="font-heading text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                  Software Engineer Interview Analysis
                </p>
                <p className="text-base font-normal leading-normal text-gray-400">
                  Here is a detailed breakdown of your performance.
                </p>
              </div>
              <div className="flex flex-shrink-0 gap-3">
                <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-gray-700 px-4 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 transition-all hover:bg-gray-600">
                  <span className="material-symbols-outlined text-xl">ios_share</span>
                  <span className="truncate">Share</span>
                </button>
                <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-500 px-4 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-blue-600">
                  <span className="material-symbols-outlined text-xl">download</span>
                  <span className="truncate">Download PDF</span>
                </button>
              </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <p className="text-base font-medium text-gray-400">Overall Score</p>
                <p className="font-heading text-3xl font-semibold leading-tight text-white">
                  88/100
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <p className="text-base font-medium text-gray-400">Confidence</p>
                <p className="font-heading text-3xl font-semibold leading-tight text-white">High</p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <p className="text-base font-medium text-gray-400">Duration</p>
                <p className="font-heading text-3xl font-semibold leading-tight text-white">
                  24:32 min
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <p className="text-base font-medium text-gray-400">Difficulty</p>
                <p className="font-heading text-3xl font-semibold leading-tight text-white">
                  Intermediate
                </p>
              </div>
            </div>
            {/* Skill Ratings */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
              <h2 className="font-heading text-xl font-semibold leading-tight text-white">
                Skill Ratings
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Skill Item 1 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-white">Problem Solving</span>
                    <span className="text-sm font-semibold text-blue-400">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                </div>
                {/* Skill Item 2 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-white">Communication</span>
                    <span className="text-sm font-semibold text-blue-400">85%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                {/* Skill Item 3 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-white">Technical Knowledge</span>
                    <span className="text-sm font-semibold text-blue-400">89%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                      style={{ width: '89%' }}
                    ></div>
                  </div>
                </div>
                {/* Skill Item 4 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-white">Clarity &amp; Conciseness</span>
                    <span className="text-sm font-semibold text-yellow-500">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Question Breakdown Table */}
            <div className="flex flex-col">
              <h2 className="px-1 pb-4 pt-2 font-heading text-xl font-semibold leading-tight text-white">
                Question-by-Question Breakdown
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-white/5">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                        scope="col"
                      >
                        Question
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                        scope="col"
                      >
                        Your Answer
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                        scope="col"
                      >
                        AI Evaluation
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                        scope="col"
                      >
                        Improvement Tip
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr className="hover:bg-white/5">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                        1. Data Structures
                      </td>
                      <td className="max-w-xs px-6 py-4 text-sm text-gray-400">
                        "I used a hash map to achieve O(1) time complexity..."{' '}
                        <a className="font-semibold text-blue-500 hover:underline" href="#">
                          Read more
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        Excellent choice and clear explanation.
                      </td>
                      <td className="px-6 py-4 text-sm text-white">-</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                        2. Algorithm Design
                      </td>
                      <td className="max-w-xs px-6 py-4 text-sm text-gray-400">
                        "For the sorting part, I thought about merge sort..."{' '}
                        <a className="font-semibold text-blue-500 hover:underline" href="#">
                          Read more
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        Good justification, slightly hesitant delivery.
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        Mention space complexity trade-offs.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                        3. Behavioral
                      </td>
                      <td className="max-w-xs px-6 py-4 text-sm text-gray-400">
                        "A time I had a conflict was with a PM over a feature..."{' '}
                        <a className="font-semibold text-blue-500 hover:underline" href="#">
                          Read more
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        Solid STAR method application.
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        Focus more on the positive resolution.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Strengths, Weaknesses, and Recommendations */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <h3 className="font-heading text-lg font-semibold text-white">Strengths</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-400">
                  <li>Strong grasp of fundamental data structures.</li>
                  <li>Effectively used the STAR method for behavioral questions.</li>
                  <li>Maintained a calm and professional demeanor throughout.</li>
</ul>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <h3 className="font-heading text-lg font-semibold text-white">Weaknesses</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-400">
                  <li>Could be more explicit about time/space complexity trade-offs.</li>
                  <li>Some hesitation when explaining alternative approaches.</li>
                  <li>Answers could be slightly more concise at times.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
                <h3 className="font-heading text-lg font-semibold text-white">AI Recommendations</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-400">
                  <li>Practice verbally explaining complexity for common algorithms.</li>
                  <li>Prepare 2-3 alternative solutions for common problem types.</li>
                  <li>Try another session focusing on "System Design" questions.</li>
                </ul>
              </div>
            </div>
            {/* Final CTA */}
            <div className="pt-4">
              <Link to="/practice" className="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 px-6 text-base font-semibold text-white shadow-lg transition-all hover:opacity-90">
                Start Another Practice Session
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}