"use client"

import { useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import { Star, Send } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function ClientSatisfaction() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const sidebarLinks = [{ label: "Feedback", path: "/client/satisfaction", icon: <Star size={20} /> }]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    setSubmitting(true)
    try {
      await mockApi.submitSatisfaction("project-id", rating, comment)
      setSubmitted(true)
      setRating(0)
      setComment("")
      toast.success("Thank you for your feedback!")
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      toast.error("Failed to submit feedback")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Satisfaction</h1>

        <div className="card-base">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your feedback helps us improve our services. Please rate your satisfaction with this project.
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-400">Thank you! Your feedback has been recorded.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-4 text-gray-900 dark:text-white">
                How satisfied are you with this project?
              </label>
              <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {rating > 0 && `You rated: ${rating} out of 5 stars`}
              </p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Additional Comments (Optional)
              </label>
              <textarea
                placeholder="Share your thoughts about the project..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-base h-32"
              />
            </div>

            {/* Note */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Anonymous:</strong> Your feedback is completely anonymous and helps us improve our services.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
