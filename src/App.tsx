import React from 'react';

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

  function downloadURI(uri: any, name: any) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const callbacks: CallbackCamera = {
    on: {
      success: function (obj: SuccessPictureResponse) {
        let blob = new Blob([JSON.stringify(obj.encrypted)], {type:'application/json'});
        downloadURI(URL.createObjectURL(blob), "teste.json");
        console.log(obj);
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

  const openSelfieCamera = async (
    jsonPath: string,
    cameraType: SelfieCameraType
  ) => {
    const { open } = await unicoCamera.prepareSelfieCamera(
      jsonPath,
      cameraType
    );

    open(callbacks);
  }

  const openDocumentCamera = async (
    jsonPath: string,
    cameraType: DocumentCameraType
  ) => {
    const { open } = await unicoCamera.prepareDocumentCamera(
      jsonPath,
      cameraType
    );

    open(callbacks);
  }

  return (
    <main>
      <button
        type="button"
        onClick={() => openSelfieCamera('/services.json', SelfieCameraTypes.NORMAL)}
      >
        Open Camera Facetec
      </button>

      <button
        type="button"
        onClick={() => openSelfieCamera('/services-sem-facetec.json', SelfieCameraTypes.SMART)}
      >
        Open Camera Sem Facetec
      </button>

      <button
        type="button"
        onClick={() => openDocumentCamera('/services-sem-facetec.json', DocumentCameraTypes.CNH)}
      >
        Open Camera CNH
      </button>

      <button
        type="button"
        onClick={() => openDocumentCamera('/services-sem-facetec.json', DocumentCameraTypes.RG_FRENTE)}
      >
        Open Camera RG FRENTE
      </button>

      <button
        type="button"
        onClick={() => openDocumentCamera('/services-sem-facetec.json', DocumentCameraTypes.CPF)}
      >
        Open Camera RG VERSO
      </button>


      <div className="container">
        <div id="box-camera">
        </div>
      </div>

    </main>
  );
}

export default App;
