import React from 'react';

import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  SuccessPictureResponse,
  ErrorPictureResponse,
  SupportPictureResponse,
  MainView,
  UnicoThemeBuilder,
  SelfieCameraType,
  DocumentCameraType,
} from "unico-webframe";

function App() {
  const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#0384fc")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#dff1f5")
    .setColorText("#0384fc")
    .setBackgroundColorComponents("#0384fc")
    .setColorTextComponents("#dff1f5")
    .setBackgroundColorButtons("#0384fc")
    .setColorTextButtons("#dff1f5")
    .setBackgroundColorBoxMessage("#fff")
    .setColorTextBoxMessage("#000")
    .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregandooooo...</div>`)
    .build();

  const urlPathModels = `${window.location.protocol}//${window.location.host}/models`;

  const unicoCamera = new UnicoCheckBuilder()
    .setTheme(unicoTheme)
    .setModelsPath(urlPathModels)
    .setResourceDirectory("/resources")
    .build();

  const callbacks = {
    on: {
      success: function (obj: SuccessPictureResponse) {
        window.alert(JSON.stringify(obj));
      },
      error: function (error: ErrorPictureResponse) {
        window.console.log(error);
        window.alert(`
            Câmera fechada
            ------------------------------------
            Motivo: ${error.code} - ${error.message} ${JSON.stringify(error.stack)}
          `);
      },
      support: function (error: SupportPictureResponse) {
        console.log(error);
        window.alert(`
            Browser não suportado
            ------------------------------------
            iOS: Safari
            Android/Windows: Chrome, Firefox
          `);
      }
    }
  };

  const openCamera = async (
    unicoCamera: MainView,
    jsonPath: string, type: SelfieCameraType | DocumentCameraType
  ) => {
    const { open } = await unicoCamera.prepareSelfieCamera(
      jsonPath,
      type
    );

    open(callbacks);
  }

  const prepareCameraFacetec = () => {
    openCamera(unicoCamera, '/services.json', SelfieCameraTypes.SMART);
  }

  const prepareCameraWithoutFacetec = () => {
    openCamera(unicoCamera, '/services-sem-facetec.json', SelfieCameraTypes.SMART);
  }

  return (
    <div id="box-camera">
      <button type="button" onClick={prepareCameraFacetec}>
        Open Camera Facetec
      </button>

      <button type="button" onClick={prepareCameraWithoutFacetec}>
        Open Camera Sem Facetec
      </button>
    </div>
  );
}

export default App;
