import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center text-2xl text-gray-800 font-semibold">
        Welcome to Caterpillar
      </main>

      <Footer />
    </div>
  );
};

export default Home;
