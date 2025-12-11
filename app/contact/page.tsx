
import ContactForm from "../contact/ContactForm";

export const metadata = {
  title: "Contact Us - YOKO",
  description: "Get in touch with YOKO. We're here to help with your fashion design needs.",
};

export default function ContactPage() {
  return (
    <>
      
      <main className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <a href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              ← Back to home
            </a>
          </div>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-6 max-w-2xl mx-auto">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </main>
    </>
  );
}
