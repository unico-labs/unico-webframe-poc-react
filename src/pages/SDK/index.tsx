import React, { useState } from 'react';
import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  UnicoThemeBuilder,
  DocumentCameraTypes,
  CallbackCamera,
  ErrorPictureResponse,
  SuccessPictureResponse,
  SupportPictureResponse,
  DocumentCameraType,
  SelfieCameraType
} from "unico-webframe"

import '../../styles/global.css'
import './styles.css'

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
    setPreparedCamera({} as OpenCameraState);
    setShowBoxCamera(false);
    setLoading(false);
  }

  const urlPathModels = `${window.location.protocol}//${window.location.host}/models`;

  const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#d98888")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#e9e9e9")
    .setColorText("#df5959")
    .setBackgroundColorComponents("#e16060")
    .setColorTextComponents("#dff1f5")
    .setBackgroundColorButtons("#e55d5d")
    .setColorTextButtons("#dff1f5")
    .setBackgroundColorBoxMessage("#fff")
    .setColorTextBoxMessage("#ea7474")
    .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregandooooo...</div>`)
    .build();
  const unicoCamera = new UnicoCheckBuilder()
    .setTheme(unicoTheme)
    .setModelsPath(urlPathModels)
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
      support: function (error: SupportPictureResponse) {
        console.log(error);
        resetComponentStates();
      }
    }
  };

  const prepareSelfieCamera = async (
    jsonPath: string,
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
    jsonPath: string,
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
                  '/services.json',
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
                  '/services-sem-facetec.json',
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
                  '/services-sem-facetec.json',
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
                prepareDocumentCamera(
                  '/services-sem-facetec.json',
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
                  '/services-sem-facetec.json',
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
              disabled={!preparedCamera.isCameraReady}
              style={{
                opacity: preparedCamera.isCameraReady ? 1 : 0.6,
                cursor: preparedCamera.isCameraReady ? 'pointer': 'no-drop',
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
