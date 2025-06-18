import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Facebook,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const handleMailSend = (e: any) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value
    const email = form.email.value
    const subject = form.subject.value
    const message = form.message.value
    console.log(name, email, subject, message);
  };
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Have questions or want to discuss a project? We'd love to hear from
          you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Mail className="w-6 h-6 text-purple-400 mr-3" />
            Contact Information
          </h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Email
                </h4>
                <a
                  href="mailto:akash203037@gmail.com"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  akash203037@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Phone
                </h4>
                <a
                  href="tel:+8801729414662"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  +8801729414662
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Location
                </h4>
                <p className="text-white">
                  Banwari-Nagar, Faridpur
                  <br />
                  Pabna, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-700/50">
            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Follow Me
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/mohammadakash20"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-700/50 hover:bg-purple-500/20 rounded-full transition-colors border border-slate-700/50 hover:border-purple-500/30"
              >
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/in/matikuzzaman"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-700/50 hover:bg-purple-500/20 rounded-full transition-colors border border-slate-700/50 hover:border-purple-500/30"
              >
                <Linkedin />
              </a>
              <a
                href="https://github.com/mohammad-atikuzzaman"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-700/50 hover:bg-purple-500/20 rounded-full transition-colors border border-slate-700/50 hover:border-purple-500/30"
              >
                <Github />
              </a>
              <a
                href="https://atikuzzaman.vercel.app"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-700/50 hover:bg-purple-500/20 rounded-full transition-colors border border-slate-700/50 hover:border-purple-500/30"
              >
                <Globe />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Send className="w-6 h-6 text-purple-400 mr-3" />
            Send Us a Message
          </h3>

          <form onSubmit={handleMailSend} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-slate-800/70 border border-slate-700/50 focus:border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-slate-800/70 border border-slate-700/50 focus:border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full bg-slate-800/70 border border-slate-700/50 focus:border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full bg-slate-800/70 border border-slate-700/50 focus:border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full text-md font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span>Send Message</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
