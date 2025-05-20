import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  UnicoThemeBuilder,
  DocumentCameraTypes,
  UnicoConfig,
  SDKEnvironmentTypes
} from 'unico-webframe';
import { Camera, FileText, Loader } from 'lucide-react';

import '../styles/CameraCapture.css';

const CameraCapture = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // SDK Unico-Webframe authentication keys
  const config = new UnicoConfig()
    .setHostname("<YOUR_HOSTNAME>")
    .setHostKey("<YOUR_SDKKEY");

  // Configuration of the callback for image capture events and error handling
  const callback = {
    on: {
      success: function(obj: any) {
        console.log("Success capturing image");
        navigate("/photo-result", {
          state: {
            base64: obj.base64,
            jwt: obj.encrypted
          }
        });
      },
      error: function(error: any) {
        console.error("unico-webframe error:", {
          code: error?.code,
          message: error?.message,
          fullError: error
        });
    
        setError(
          `Capture error: ${error?.message || 'Unknown error occurred'}. Check console for details.`
        );
        setTimeout(() => setError(null), 5000);
      },
      user_canceled: function() {
        console.log("Capture canceled by user.");
      }
    }
  };

  // SDK visual theme definition
  const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#0384fc")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#f3f8fb")
    .setColorText("#0384fc")
    .setBackgroundColorComponents("#0384fc")
    .setColorTextComponents("#f3f8fb")
    .setBackgroundColorButtons("#0384fc")
    .setColorTextButtons("#f3f8fb")
    .setBackgroundColorBoxMessage("#ffffff")
    .setColorTextBoxMessage("#333333")
    .setHtmlPopupLoading(`
      <div style="position: absolute; top: 45%; right: 50%; transform:
      translate(50%, -50%); z-index: 10; text-align: center;">
        <div class="unico-loader"></div>
        <p style="margin-top: 8px; color: #0384fc; font-family: sans-serif;">Loading...</p>
      </div>
    `)
    .build();

  // Main camera instance with theme
  const unicoCamera = new UnicoCheckBuilder()
    .setResourceDirectory("/resources")
    .setModelsPath("/models")
    .setEnvironment(SDKEnvironmentTypes.UAT)
    .setTheme(unicoTheme)
    .build();

  // Functions to open different camera modes
  const openSelfieCameraLiveness = async () => {
    const cameraPromised = unicoCamera
      .prepareSelfieCamera(config, SelfieCameraTypes.LIVENESS)
      .catch(() => console.error('Error initializing liveness camera'));

    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };

  const openDocumentCameraCNH = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.CNH)
      .catch(() => console.error('Error initializing CNH camera'));

    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };

  const openDocumentCameraCPF = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.CPF)
      .catch(() => console.error('Error initializing CPF camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };
  
  const openDocumentCameraCNHFrente = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.CNH_FRENTE)
      .catch(() => console.error('Error initializing CNH Frente camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };
  
  const openDocumentCameraCNHVerso = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.CNH_VERSO)
      .catch(() => console.error('Error initializing CNH Verso camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };
  
  const openDocumentCameraRGFrente = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.RG_FRENTE)
      .catch(() => console.error('Error initializing RG Frente camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };
  
  const openDocumentCameraRGVerso = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.RG_VERSO)
      .catch(() => console.error('Error initializing RG Verso camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };
  
  const openDocumentCameraRGFrenteNovo = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.RG_FRENTE_NOVO)
      .catch(() => console.error('Error initializing RG Frente Novo camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };
  
  const openDocumentCameraRGVersoNovo = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.RG_VERSO_NOVO)
      .catch(() => console.error('Error initializing RG Verso Novo camera'));
    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };

  const openDocumentCameraOutros = async () => {
    const cameraPromised = unicoCamera
      .prepareDocumentCamera(config, DocumentCameraTypes.OTHERS("Generic Document"))
      .catch(() => console.error('Error initializing other documents camera'));

    cameraPromised.then((cameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: any) => void; user_canceled: () => void; }; }) => any; }) => cameraOpener.open(callback));
  };

  // Maps camera types to their respective functions
  const cameraHandlers: Record<string, () => Promise<void>> = {
    liveness: openSelfieCameraLiveness,
    cnh: openDocumentCameraCNH,
    cpf: openDocumentCameraCPF,
    cnh_frente: openDocumentCameraCNHFrente,
    cnh_verso: openDocumentCameraCNHVerso,
    rg_frente: openDocumentCameraRGFrente,
    rg_verso: openDocumentCameraRGVerso,
    rg_frente_novo: openDocumentCameraRGFrenteNovo,
    rg_verso_novo: openDocumentCameraRGVersoNovo,
    others: openDocumentCameraOutros,
  };

  // Generic function to open any type of camera with error handling
  const openCamera = async (cameraType: string) => {
    console.log(`Attempting to open camera: ${cameraType}`);
    setLoading(true);
    setError(null);

    try {
      const handler = cameraHandlers[cameraType];
      if (!handler) throw new Error(`Invalid camera type specified: ${cameraType}`);

      await handler();
    } catch (errorCatch) {
      console.error(`Error PREPARING ${cameraType} camera:`, errorCatch);
      const errorMessage = errorCatch instanceof Error ? errorCatch.message : String(errorCatch);
      setError(`Failed to initialize camera (${cameraType}). ${errorMessage}. Please check permissions and try again.`);
      setTimeout(() => setError(null), 7000);
    } finally {
      console.log(`FINALLY block executed after trying to prepare ${cameraType} camera.`);
      setLoading(false);
    }
  };

  // List of options for biometric capture
  const features = [
    {
      title: 'Liveness Camera',
      description: 'Enhanced selfie capture with intelligent framing',
      type: 'liveness',
      icon: Camera
    }
  ];

  // List of options for document capture
  const documentFeatures = [
    {
      title: 'CNH Aberta',
      description: 'Capture Brazilian driver\'s license (CNH)',
      type: 'cnh',
      icon: FileText
    },
    {
      title: 'CNH Frente',
      description: 'Capture front side of CNH',
      type: 'cnh_frente',
      icon: FileText
    },
    {
      title: 'CNH Verso',
      description: 'Capture back side of CNH',
      type: 'cnh_verso',
      icon: FileText
    },
    {
      title: 'RG Frente',
      description: 'Capture front side of RG',
      type: 'rg_frente',
      icon: FileText
    },
    {
      title: 'RG Verso',
      description: 'Capture back side of RG',
      type: 'rg_verso',
      icon: FileText
    },
    {
      title: 'RG Frente Novo',
      description: 'Capture new RG front side',
      type: 'rg_frente_novo',
      icon: FileText
    },
    {
      title: 'RG Verso Novo',
      description: 'Capture new RG back side',
      type: 'rg_verso_novo',
      icon: FileText
    },
    {
      title: 'CPF',
      description: 'Capture CPF',
      type: 'cpf',
      icon: FileText
    },
    {
      title: 'Outros Documentos',
      description: 'Capture other types of identification documents',
      type: 'others',
      icon: FileText
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen px-4 pt-10 pb-[15.5rem]">
      <div className="w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Biometric Capture</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the type of capture you need to perform. Make sure you're in a well-lit environment
            and your camera is enabled.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center" role="alert">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error:</span>&nbsp;{error}
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" aria-label="Loading camera">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Loader className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-700">Initializing camera...</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-blue-600" />
            Selfie Capture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => openCamera(feature.type)}
                className="bg-white hover:bg-blue-50 border border-gray-200 rounded-lg p-6 text-center transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={loading}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Document Capture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentFeatures.map((feature, index) => (
              <button
                key={index}
                onClick={() => openCamera(feature.type)}
                className="bg-white hover:bg-blue-50 border border-gray-200 rounded-lg p-6 text-center transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={loading}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8" id="box-camera"></div>
      </div>
    </div>
  );
};

export default CameraCapture;