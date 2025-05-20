const Footer = () => {
  return (
    <footer className="py-12 bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p>© {new Date().getFullYear()} HOSMAC. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Use</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
