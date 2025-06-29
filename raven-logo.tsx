"use client"

export default function RavenLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C10.5 2 9.2 2.8 8.5 4C7.8 4.2 7.2 4.6 6.8 5.2C6.4 5.8 6.2 6.5 6.2 7.2C6.2 7.9 6.4 8.6 6.8 9.2L8 10.5V12C8 13.1 8.9 14 10 14H14C15.1 14 16 13.1 16 12V10.5L17.2 9.2C17.6 8.6 17.8 7.9 17.8 7.2C17.8 6.5 17.6 5.8 17.2 5.2C16.8 4.6 16.2 4.2 15.5 4C14.8 2.8 13.5 2 12 2Z"
        fill="currentColor"
      />
      <circle cx="10" cy="8" r="1" fill="#dc2626" />
      <path
        d="M12 16C11.4 16 11 16.4 11 17V20C11 20.6 11.4 21 12 21C12.6 21 13 20.6 13 20V17C13 16.4 12.6 16 12 16Z"
        fill="currentColor"
      />
    </svg>
  )
}
