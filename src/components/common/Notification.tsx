"use client";

import { useState, useRef, useEffect } from "react";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex items-center text-sm font-medium text-body hover:text-heading focus:outline-none"
      >
        <svg
          className="w-9 h-9"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
          />
        </svg>

        <div className="absolute block w-3 h-3 bg-danger border-2 border-buffer rounded-full top-2 start-5"></div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute 
            right-0            
            mt-2 
            z-50
            w-80            
            max-w-sm 
            bg-neutral-primary-soft 
            rounded-base 
            shadow 
            divide-y 
            divide-default-medium
          "
        >
          <div className="px-4 py-2 font-medium text-center text-body bg-neutral-secondary-medium rounded-t-base">
            Notifications
          </div>

          <div className="divide-y divide-default">

            <a className="flex px-4 py-3 hover:bg-neutral-secondary-medium cursor-pointer">
              <div className="shrink-0 relative">
                <img
                  className="rounded-full w-11 h-11"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Jese"
                />
                <div className="absolute flex items-center justify-center w-5 h-5 left-6 -top-1 bg-brand border border-buffer-medium rounded-full">
                  <svg
                    className="w-3 h-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Zm5-7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Z"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-full ps-3">
                <div className="text-body text-sm mb-1.5">
                  New message from{" "}
                  <span className="font-semibold text-heading">Jese Leos</span>:
                  Hey, whats up? All set for the presentation?
                </div>
                <div className="text-xs text-fg-brand">A few moments ago</div>
              </div>
            </a>

          </div>

          <a className="block py-2 font-medium text-center text-body bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium rounded-b-base cursor-pointer">
            <div className="inline-flex items-center ">
              <svg
                className="w-5 h-5 me-1.5 text-body"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              View all
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
