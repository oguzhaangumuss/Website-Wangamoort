import Link from 'next/link'

type NotFoundProps = {
  title?: string
  message?: string
  buttonText?: string
  buttonHref?: string
}

export default function NotFound({
  title = "Not Found",
  message = "The item you are looking for doesn't exist or has been moved.",
  buttonText = "Back to Home",
  buttonHref = "/"
}: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center px-4 py-2 border border-transparent 
            text-sm font-medium rounded-md text-white bg-[#152e1b] 
            hover:bg-[#1f432a] focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-[#152e1b]"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
} 