//frontend\src\components\AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
/**
 * A reusable "About Us" page component.
 * Includes a header, hero section, mission, team, and privacy sections.
 * The footer has been removed to allow for a reusable footer component.
 */
export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-900 font-display">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex justify-center border-b border-white/10 bg-gray-900/[.85] backdrop-blur-sm">
        <div className="flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-20">
          <Link to="/" className="flex items-center gap-4 text-white">
            <div className="size-6 text-blue-500">
              {/* Logo SVG */}
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            <h2 className="text-white text-lg font-bold leading-tight font-heading">
              Smart Interview Coach
            </h2>
          </Link>
          <div className="hidden items-center gap-9 lg:flex">
            <Link
              className="text-gray-300 hover:text-blue-500 text-sm font-medium leading-normal"
              to="/practice"
            >
              Features
            </Link>
            <Link
              className="text-gray-300 hover:text-blue-500 text-sm font-medium leading-normal"
              to="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-gray-300 hover:text-blue-500 text-sm font-medium leading-normal"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="text-blue-500 text-sm font-bold leading-normal"
              to="/about"
            >
              About
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <Link
              to="/login"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-700 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-600"
            >
              <span className="truncate">Log In</span>
            </Link>
            <Link
              to="/signup"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-gray-900 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90"
            >
              <span className="truncate">Sign Up</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <div className="flex w-full max-w-[1440px] flex-col px-6 py-12 md:px-10 md:py-16 lg:px-20 lg:py-24">
          {/* Hero Section */}
          <section className="flex flex-col items-center gap-4 py-16 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              About Smart Interview Coach
            </h1>
            <p className="max-w-3xl text-lg text-gray-300">
              We're on a mission to empower professionals to conquer their
              interviews with confidence and intelligence.
            </p>
          </section>

          {/* Mission Section */}
          <section className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                Our Mission
              </h2>
              <p className="text-base leading-relaxed text-gray-300">
                Smart Interview Coach was founded on the belief that everyone
                deserves a fair chance to showcase their true potential. We're
                dedicated to leveling the playing field in the hiring process by
                providing AI-powered tools and personalized feedback that helps
                you prepare smarter, not just harder.
              </p>
              <p className="text-base leading-relaxed text-gray-300">
                Our goal is to demystify the interview process, build your
                confidence, and help you land the job you deserve. We combine
                cutting-edge technology with expert insights to create a
                personalized coaching experience that adapts to your unique
                needs.
              </p>
            </div>
            <div
              className="aspect-[4/3] w-full rounded-xl bg-cover bg-center"
              aria-label="A diverse team collaborating in a modern office environment."
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBy4pgtrLedK-c_XmnItMtCRUJrkT6SUW3nWhV-rkvHd1yQOc0hzK4DzppzCYhJ-IYiY4L6-Bpi_xYXl8dq-kTD3QZl915uSawbA0NPBloG7OQdB8j3QeFHjbggEdWVOwE8_jRQPjgoaktGQv-RA8i_6_e1NiGgP9ukEsHiuXr_ZVWrs9c5sTUv81eVW06CztFKv8RE_dPYX3bnARqBBYe4vRWRUA2_AD1583COD6KwN178gzCHNNGkvYhDJrOJwRczo8EAkcbx-M4p")',
              }}
            ></div>
          </section>

          {/* Team Section */}
          <section className="py-16">
            <div className="text-center">
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-blue-500">
                Meet the Team
              </h4>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                The Minds Behind the Mission
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className="aspect-square w-full max-w-[200px] rounded-full bg-cover bg-center"
                  aria-label="Headshot of Alex Johnson, Co-Founder & CEO."
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCei9bJukGM28o9pYtpdOtDtn7oOu-hym_t2_W5RGwR1G135us7jjgnh369Zgo9KKpYdBftK9TuqLKV7ZUjPuiarWlGq7usRutGNnknLjegRhiGMjlj6FAsCLeWYd6a7awB-EMrX9dFb1kb7xGBAdGI16HQUfPkHlUxUPuXcA-V6zdOuD8lUCqXiA7H1Ji-hEfmVlikgDVBPfbLr2gZBuQGbsv-M34c9k3FiiWPoV1ecwOVRaD0x9JYGGAl1Cnd2UTv569kClRJq9QK")',
                  }}
                ></div>
                <div>
                  <p className="text-lg font-bold text-white">Alex Johnson</p>
                  <p className="text-sm font-medium text-blue-500">
                    Co-Founder & CEO
                  </p>
                  <a
                    className="text-sm text-gray-400 hover:text-blue-500"
                    href="#"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className="aspect-square w-full max-w-[200px] rounded-full bg-cover bg-center"
                  aria-label="Headshot of Maria Garcia, Co-Founder & CTO."
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAC2GVYKk9Qtjptuqg6AjCQKkD88a362fcUws0jxPBxOL_xop4xX5-k2HffFZqR9pOPYIZ6VbnOHfHuTw-XHwZsf5DiFP4aRKhhu_QzHnF9M0aA8hwHJc85lp_GN5pv-oFQ_64Kldo1__4AnJiohPXVSB9Am7OZT3zdzhzfIAIPb9-l4ubI3RR1BfMzS-mjxtU4yWZnJRgUN6QV_cZSWQGgs12gmVROGu7YT8lOGIySfuBPdAWtl7DwYYDsPIwPJFbr0PHkBEpHqa9f")',
                  }}
                ></div>
                <div>
                  <p className="text-lg font-bold text-white">Maria Garcia</p>
                  <p className="text-sm font-medium text-blue-500">
                    Co-Founder & CTO
                  </p>
                  <a
                    className="text-sm text-gray-400 hover:text-blue-500"
                    href="#"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className="aspect-square w-full max-w-[200px] rounded-full bg-cover bg-center"
                  aria-label="Headshot of David Chen, Lead AI Engineer."
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZ4Q5eF4Yi7koMZu48FkOTk4YpZw93jLGuqUgzN9c8_G1BHp2jfiVg_N1bfNW3iEK7WsajM66Z4xgvBEQdu7rwRURlkSL_aUrFWHOJpCdTJoB5HEGQTUiZ225xr9TyFAUq-Fo_pKfYlfqIG6_EVTk7p9_jrffpTelOMMlXsrRf1P5QUTqr07ejVtk0KPycUDhQBZ0NF0-n4W5fFDb7BviMt0eqTE4LlNE8-6m0UopuYWMDoj90RtdzpiwC7xxFzs_ZLI_jtZsQ28S-")',
                  }}
                ></div>
                <div>
                  <p className="text-lg font-bold text-white">David Chen</p>
                  <p className="text-sm font-medium text-blue-500">
                    Lead AI Engineer
                  </p>
                  <a
                    className="text-sm text-gray-400 hover:text-blue-500"
                    href="#"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className="aspect-square w-full max-w-[200px] rounded-full bg-cover bg-center"
                  aria-label="Headshot of Emily White, Head of Product Design."
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAETPMCs_51CgZnVbOmArIVJCV5Rt9pV6d4sZY2FZxZeJnITe3WghCHb79V2095weKpBIM7ly3DwEZO7TxpQcNYALs6aXa_4oQEzTleyITCB30xK6mcwQSamP7FHrJGXLqxWcMzviy_odYHPgY2lXRJA4SpSeEXbqHfnubkNeX0l-PjPnR2hSVS-bnL4WHSbD1G2FDvZXnv_c7j8FPm_1JM9T25tFB4USvW9ohxPRpQN7JpLLuDSS2fQPXkSHrkkVVRIYE9la4WL6P-")',
                  }}
                ></div>
                <div>
                  <p className="text-lg font-bold text-white">Emily White</p>
                  <p className="text-sm font-medium text-blue-500">
                    Head of Product Design
                  </p>
                  <a
                    className="text-sm text-gray-400 hover:text-blue-500"
                    href="#"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy & Trust Section */}
          <section className="mt-16 rounded-xl bg-gray-800 p-10 lg:p-16">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
              <span className="material-symbols-outlined text-4xl text-blue-500">
                verified_user
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
                Your Privacy is Our Priority
              </h2>
              <p className="text-gray-300">
                We are deeply committed to protecting your data and privacy.
                Your interview practices and personal information are encrypted
                and securely stored. We believe that trust is the foundation of
                our relationship with you, and we work tirelessly to uphold it.
              </p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-500 text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90">
                <span className="truncate">Read Our Privacy Policy</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
