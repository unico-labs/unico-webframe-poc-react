import { useNavigate } from 'react-router-dom';
import { Camera, Fingerprint, Shield, UserCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          SDK Unico React.js
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Experience fast and secure biometric capture with advanced technology that ensures accurate identity verification.
        </p>
        <button 
          onClick={() => navigate('/capture')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          Start Capture
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Camera className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Face Recognition</h3>
          <p className="text-gray-600">Advanced camera technology for precise facial recognition and authentication.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Fingerprint className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Liveness Detection</h3>
          <p className="text-gray-600">Ensure the person is physically present with sophisticated liveness checks.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Shield className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
          <p className="text-gray-600">All data is encrypted and processed following the highest security standards.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <UserCheck className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">ID Verification</h3>
          <p className="text-gray-600">Capture and verify official documents with precision and accuracy.</p>
        </div>
      </section>

      <section className="bg-blue-50 p-8 md:p-12 rounded-2xl mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Solution?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our biometric capture technology provides industry-leading accuracy while maintaining the highest privacy standards.
            </p>
            <ul className="space-y-3">
              {[
                'Fast and accurate capture process',
                'Multiple verification methods',
                'Seamless integration options',
                'Enterprise-grade security'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full p-1 mr-2 mt-1">
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-5/12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6">
                <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Camera className="h-16 w-16 text-white opacity-75" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start in seconds</h3>
              <p className="text-gray-600 mb-4">Begin capturing biometric data with just a few clicks.</p>
              <button 
                onClick={() => navigate('/capture')} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;