const Footer: React.FC = () => {
  return (
    <footer className="bg-yellow-100 text-center text-sm text-gray-700 py-3 mt-auto shadow-inner">
      © {new Date().getFullYear()} Caterpillar Hackathon. All rights reserved.
    </footer>
  );
};

export default Footer;
