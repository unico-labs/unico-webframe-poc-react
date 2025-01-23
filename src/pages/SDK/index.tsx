import { useState } from 'react';
import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  UnicoThemeBuilder,
  DocumentCameraTypes,
  CallbackCamera,
  ErrorPictureResponse,
  SuccessPictureResponse,
  DocumentCameraType,
  UnicoConfig,
  SelfieCameraType,
  SDKEnvironmentTypes
} from "unico-webframe";

import '../../styles/global.css';
import './styles.css';

type OpenCameraState = {
  openCamera: (callback: CallbackCamera) => void;
  cameraName: string;
  isCameraReady: boolean;
  isUnicoCamera: boolean;
}


function SDK() {
  const [preparedCamera, setPreparedCamera] = useState<OpenCameraState>({} as OpenCameraState);
  const [showBoxCamera, setShowBoxCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetComponentStates() {
    //setPreparedCamera({} as OpenCameraState);
    setShowBoxCamera(false);
    setLoading(false);
  }

  const urlPathModels = `${window.location.protocol}//${window.location.host}/models`;

  const config = new UnicoConfig()
  
  .setHostname("your_hostname")
  
  .setHostKey("your_SDKKEY");


  const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#69c62f")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#e9e9e9")
    .setColorText("#1362ca")
    .setBackgroundColorComponents("#325ad4")
    .setColorTextComponents("#dff1f5")
    .setBackgroundColorButtons("#406ee2")
    .setColorTextButtons("#dff1f5")
    .setBackgroundColorBoxMessage("#fff")
    .setColorTextBoxMessage("#366fd8")
    .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregandooooo...</div>`)
    .build();
  const unicoCamera = new UnicoCheckBuilder()
    .setTheme(unicoTheme)
    .setModelsPath(urlPathModels)
    .setEnvironment(SDKEnvironmentTypes.UAT)
    .setResourceDirectory("/resources")
    .build();

  const sdkCallbacks: CallbackCamera = {
    on: {
      success: function (obj: SuccessPictureResponse) {
        console.log(obj);
        resetComponentStates();
      },
      error: function (error: ErrorPictureResponse) {
        window.console.log(error);
        window.alert(`
            Câmera fechada
            ------------------------------------
            Motivo: ${error.code} - ${error.message} ${JSON.stringify(error.stack)}
        `);
        resetComponentStates();
      },
      
    }
  };

  const prepareSelfieCamera = async (
    jsonPath: string | UnicoConfig,
    cameraType: SelfieCameraType,
    cameraName: string,
    isUnicoCamera: boolean,
  ) => {
    setLoading(true);

    const { open } = await unicoCamera.prepareSelfieCamera(
      jsonPath,
      cameraType
    );

    setPreparedCamera({
      openCamera: open,
      isCameraReady: true,
      cameraName,
      isUnicoCamera,
    });
    setLoading(false);
  }

  const prepareDocumentCamera = async (
    jsonPath: string | UnicoConfig,
    cameraType: DocumentCameraType,
    cameraName: string,
    isUnicoCamera: boolean,
  ) => {
    setLoading(true);

    const { open } = await unicoCamera.prepareDocumentCamera(
      jsonPath,
      cameraType
    );

    setPreparedCamera({
      openCamera: open,
      isCameraReady: true,
      cameraName,
      isUnicoCamera,
    });
    setLoading(false);
  }

  return (
    <>
      <div
        style={{
          display: showBoxCamera ? 'inline' : 'none'
        }}
      >
        <div id="box-camera">
        </div>
      </div>

      {!showBoxCamera && (
        <div className='main-container'>
          <main>
            <button
              type="button"
              onClick={() => {
                prepareSelfieCamera(
                  config,
                  SelfieCameraTypes.NORMAL,
                  'Facetec Liveness',
                  false
                )
              }}
            >
              PrepareCamera Facetec
            </button>

            <button
              type="button"
              onClick={() => {
                prepareSelfieCamera(
                  config,
                  SelfieCameraTypes.SMART,
                  'Unico Smart',
                  true
                )
              }}
            >
              PrepareCamera Smart
            </button>
            
            <button
              type="button"
              onClick={() => {
                prepareSelfieCamera(
                  config,
                  SelfieCameraTypes.NORMAL,
                  'Unico Normal',
                  true
                )
              }}
            >
              PrepareCamera Normal
            </button>

            <button
              type="button"
              onClick={() => {
                prepareSelfieCamera(
                  config,
                  SelfieCameraTypes.SMART,
                  'Unico Traseira Smart',
                  true
                )
              }}
            >
              PrepareCamera Traseira Smart
            </button>

            <button
              type="button"
              onClick={() => {
                prepareSelfieCamera(
                  config,
                  SelfieCameraTypes.NORMAL,
                  'Unico Traseira Normal',
                  true
                )
              }}
            >
              PrepareCamera Traseira Normal
            </button>

            <button
              type="button"
              onClick={() => {
                prepareDocumentCamera(
                  config,
                  DocumentCameraTypes.RG_FRENTE,
                  'RG Frente',
                  true
                )
              }}
            >
              PrepareDocumentCamera RG Frente
            </button>

            <button
              type="button"
              onClick={() => {
                prepareDocumentCamera(
                  config,
                  DocumentCameraTypes.RG_VERSO,
                  'RG Verso',
                  true
                )
              }}
            >
              PrepareDocumentCamera RG Verso
            </button>

            <button
              type="button"
              onClick={() => {
                if (preparedCamera.isUnicoCamera) {
                  setShowBoxCamera(true);
                }

                preparedCamera.openCamera(sdkCallbacks);
              }}
              disabled={!preparedCamera.isCameraReady || loading}
              style={{
                opacity: preparedCamera.isCameraReady && !loading ? 1 : 0.6,
                cursor: preparedCamera.isCameraReady && !loading ? 'pointer': 'no-drop',
              }}
            >
              {loading ? (
                '...'
              ) : (
                `OpenCamera ${preparedCamera.cameraName || ''}`
              )}
            </button>
          </main>
        </div>
      )}
    </>
  );
}

export default SDK;
