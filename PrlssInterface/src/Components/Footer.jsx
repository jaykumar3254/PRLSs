function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="text-lg font-semibold mb-4 md:mb-0">
          PRlss
        </div>

        {/* Center Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Services</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>

        {/* Right Section */}
        <div className="text-sm mt-4 md:mt-0 text-gray-400">
          © 2026 All rights reserved
        </div>

      </div>
    </footer>
  );
}

export default Footer;