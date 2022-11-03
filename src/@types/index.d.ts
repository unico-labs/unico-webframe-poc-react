declare module 'unico-webframe' {
  export class UnicoCheckBuilder {
    setTheme(theme: UnicoTheme): UnicoCheckBuilder;

    setModelsPath(path: string): UnicoCheckBuilder;

    setResourceDirectory(path: string): UnicoCheckBuilder;

    build(): MainView;
  }

  export interface UnicoTheme {
    colorSilhouetteNeutral: string;
    colorSilhouetteSuccess: string;
    colorSilhouetteError: string;
    backgroundColor: string;
    colorText: string;
    backgroundColorComponents: string;
    colorTextComponents: string;
    backgroundColorBoxMessage: string;
    colorTextBoxMessage: string;
    backgroundColorButtons: string;
    colorTextButtons: string;
    htmlPopupLoading: string;
  }

  export class UnicoThemeBuilder {
    setColorSilhouetteSuccess(color: string): UnicoThemeBuilder;

    setColorSilhouetteError(color: string): UnicoThemeBuilder;

    setColorSilhouetteNeutral(color: string): UnicoThemeBuilder;

    setBackgroundColor(color: string): UnicoThemeBuilder;

    setColorText(color: string): UnicoThemeBuilder;

    setBackgroundColorComponents(color: string): UnicoThemeBuilder;

    setColorTextComponents(color: string): UnicoThemeBuilder

    setBackgroundColorButtons(color: string): UnicoThemeBuilder

    setColorTextButtons(color: string): UnicoThemeBuilder

    setBackgroundColorBoxMessage(color: string): UnicoThemeBuilder

    setColorTextBoxMessage(color: string): UnicoThemeBuilder

    setHtmlPopupLoading(content: string): UnicoThemeBuilder;

    build(): UnicoTheme;
  }

  export class SelfieCameraType {
    name: string;
    code: number;

    constructor(name: string, code: number)
  }

  export class DocumentCameraType {
    name: string;
    code: number;
    description: string;

    constructor(name: string, code: number, description?: string)
  }

  export const SelfieCameraTypes: {
    NORMAL: SelfieCameraType,
    SMART: SelfieCameraType,
  };

  export const DocumentCameraTypes: {
    CNH: DocumentCameraType;
    CNH_FRENTE: DocumentCameraType;
    CNH_VERSO: DocumentCameraType;
    CPF: DocumentCameraType;
    OTHERS: (description: string) => DocumentCameraType;
    RG_FRENTE: DocumentCameraType;
    RG_VERSO: DocumentCameraType;
    RG_FRENTE_NOVO: DocumentCameraType;
    RG_VERSO_NOVO: DocumentCameraType;
  };

  export interface MainView {
    prepareSelfieCamera: (jsonPath: string, cameraType: SelfieCameraType) => Promise<CameraOpener>;
    prepareDocumentCamera: (
      jsonPath: string,
      cameraType: DocumentCameraType
    ) => Promise<CameraOpener>;
  }

  export type SuccessPictureResponse = {
    encrypted: string;
    base64: string;
  }

  export type ErrorPictureResponse = {
    code: number;
    message: string;
    type: string;
    stack: object;
  }

  export type SupportPictureResponse = {
    code: number;
    message: string;
    type: string;
    stack: any[];
  }

  export type CallbackCamera = {
    on: {
      success: (obj: SuccessPictureResponse) => void;
      error: (error: ErrorPictureResponse) => void;
      support: (error: SupportPictureResponse) => void;
    }
  }

  interface CameraOpener {
    open: (callback: CallbackCamera) => void;
  }
}
