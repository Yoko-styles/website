"use client";

import { useState } from "react";

const countryCodes = [
  { code: "+1", country: "US/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+61", country: "Australia" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+7", country: "Russia" },
  { code: "+82", country: "South Korea" },
  { code: "+31", country: "Netherlands" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+41", country: "Switzerland" },
  { code: "+65", country: "Singapore" },
  { code: "+971", country: "UAE" },
  { code: "+27", country: "South Africa" },
  { code: "+64", country: "New Zealand" },
  { code: "+353", country: "Ireland" },
  { code: "+351", country: "Portugal" },
  { code: "+32", country: "Belgium" },
  { code: "+43", country: "Austria" },
  { code: "+45", country: "Denmark" },
  { code: "+358", country: "Finland" },
  { code: "+48", country: "Poland" },
  { code: "+30", country: "Greece" },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "sales", label: "Sales" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const hearAboutOptions = [
  "Social Media",
  "Search Engine",
  "Friend/Colleague",
  "Advertisement",
  "News Article",
  "Trade Show/Event",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phoneNumber: "",
    inquiryType: "",
    message: "",
    preferredContact: "email",
    hearAbout: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select a type of inquiry";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.hearAbout) {
      newErrors.hearAbout = "Please select an option";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitStatus({
            type: 'success',
            message: 'Thank you for your inquiry! We\'ll get back to you soon.',
          });
          
          // Reset form
          setFormData({
            name: "",
            email: "",
            countryCode: "+1",
            phoneNumber: "",
            inquiryType: "",
            message: "",
            preferredContact: "email",
            hearAbout: "",
            agreeToTerms: false,
          });

          // Clear success message after 5 seconds
          setTimeout(() => {
            setSubmitStatus({ type: null, message: '' });
          }, 5000);
        } else {
          setSubmitStatus({
            type: 'error',
            message: data.error || 'Failed to submit form. Please try again.',
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus({
          type: 'error',
          message: 'An unexpected error occurred. Please try again later.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center">
            {submitStatus.type === 'success' ? (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </div>
        </div>
      )}

      {/* Name */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Country Code and Phone Number */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Phone Number (Optional)
        </label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="w-full sm:w-32 px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            {countryCodes.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} {item.country}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="123-456-7890"
          />
        </div>
      </div>

      {/* Type of Inquiry */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="inquiryType" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Type of Inquiry <span className="text-red-500">*</span>
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border ${
            errors.inquiryType ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white`}
        >
          <option value="">Select an option</option>
          {inquiryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.inquiryType && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.inquiryType}</p>}
      </div>

      {/* Message */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none min-h-[100px] sm:min-h-[120px]`}
          placeholder="Please describe your inquiry in detail..."
        />
        {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Preferred Contact Method */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3">
          Preferred Contact Method
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === "email"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0"
            />
            <span className="ml-2 flex items-center text-sm sm:text-base text-gray-900">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === "phone"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0"
            />
            <span className="ml-2 flex items-center text-sm sm:text-base text-gray-900">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone
            </span>
          </label>
        </div>
      </div>

      {/* How Did You Hear About Us */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="hearAbout" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          How Did You Hear About Us?
        </label>
        <select
          id="hearAbout"
          name="hearAbout"
          value={formData.hearAbout}
          onChange={handleChange}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border ${
            errors.hearAbout ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white`}
        >
          <option value="">Select an option</option>
          {hearAboutOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.hearAbout && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.hearAbout}</p>}
      </div>

      {/* Terms and Conditions */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className={`w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0 ${
              errors.agreeToTerms ? "border-red-500" : ""
            }`}
          />
          <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-900">
            <span className="font-semibold">I agree to the terms and conditions</span>
            <br />
            <span className="text-gray-600">
              By submitting this form, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              .
            </span>
          </span>
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-6 sm:ml-8">{errors.agreeToTerms}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-2 sm:pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-200 flex items-center justify-center ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Submit Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}
