import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download } from 'lucide-react';

interface LocationState {
  base64?: string;
  jwt?: string;
}

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state || !state.base64) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Image Available</h2>
          <p className="text-gray-600 mb-6">
            There is no capture data available. Please return to the capture page and try again.
          </p>
          <button
            onClick={() => navigate('/capture')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md inline-flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Capture
          </button>
        </div>
      </div>
    );
  }

  const downloadImage = () => {
    if (!state.base64) return;

    // Create a proper data URL if it doesn't already have one
    const dataUrl = state.base64.startsWith('data:') 
      ? state.base64 
      : `data:image/png;base64,${state.base64}`;

    // Create a blob from the base64 data
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'biometric-capture.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  // Ensure the base64 string has the proper data URL prefix
  const imageUrl = state.base64.startsWith('data:') 
    ? state.base64 
    : `data:image/png;base64,${state.base64}`;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Capture Successful</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your biometric data has been successfully captured. You can review the image below.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col items-center">
            <div className="mb-6 p-2 border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Captured biometric" 
                className="max-w-full h-auto max-h-[400px] rounded" 
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={downloadImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md inline-flex items-center transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </button>
              <button
                onClick={() => navigate('/capture')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md inline-flex items-center transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Capture
              </button>
            </div>
          </div>
        </div>

        {state.jwt && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Encrypted Data</h3>
            <p className="text-gray-600 text-sm mb-3">
              The following is the encrypted JWT token containing secure biometric data:
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <code className="text-xs text-gray-800 break-all">
                {state.jwt}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoResult;