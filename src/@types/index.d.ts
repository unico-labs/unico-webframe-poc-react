declare module 'unico-webframe' {
  export interface UnicoTheme {
    colorSilhouetteNeutral: string
    colorSilhouetteSuccess: string
    colorSilhouetteError: string
    backgroundColor: string
    colorText: string
    backgroundColorComponents: string
    colorTextComponents: string
    backgroundColorBoxMessage: string
    colorTextBoxMessage: string
    backgroundColorButtons: string
    colorTextButtons: string
    htmlPopupLoading: string
    colorCancelButton: string
    colorProgressBar: string
  }
  export class UnicoConfig {
    setProjectNumber(projectNumber: string): UnicoConfig

    setProjectId(projectId: string): UnicoConfig

    setMobileSdkAppId(mobileSdkAppId: string): UnicoConfig

    setHostname(hostname: string): UnicoConfig

    setHostInfo(hostInfo: string): UnicoConfig

    setHostKey(hostKey: string): UnicoConfig
  }
  export class UnicoThemeBuilder {
    setColorSilhouetteSuccess(color: string): UnicoThemeBuilder

    setColorSilhouetteError(color: string): UnicoThemeBuilder

    setColorSilhouetteNeutral(color: string): UnicoThemeBuilder

    setBackgroundColor(color: string): UnicoThemeBuilder

    setColorText(color: string): UnicoThemeBuilder

    setBackgroundColorComponents(color: string): UnicoThemeBuilder

    setColorTextComponents(color: string): UnicoThemeBuilder

    setBackgroundColorButtons(color: string): UnicoThemeBuilder

    setColorTextButtons(color: string): UnicoThemeBuilder

    setBackgroundColorBoxMessage(color: string): UnicoThemeBuilder

    setColorTextBoxMessage(color: string): UnicoThemeBuilder

    setHtmlPopupLoading(content: string): UnicoThemeBuilder

    setColorCancelButton(color: string): UnicoThemeBuilder

    setColorProgressBar(color: string): UnicoThemeBuilder

    build(): UnicoTheme
  }
  export class SelfieCameraType {
    name: string

    code: number

    constructor(name: string, code: number)
  }
  export class DocumentCameraType {
    name: string

    code: number

    description: string

    constructor(name: string, code: number, description?: string)
  }
  export class SDKEnvironmentType {
    name: string

    constructor(name: string)
  }
  export const SelfieCameraTypes: {
    NORMAL: SelfieCameraType
    SMART: SelfieCameraType
  }
  export const DocumentCameraTypes: {
    CNH: DocumentCameraType
    CNH_FRENTE: DocumentCameraType
    CNH_VERSO: DocumentCameraType
    CPF: DocumentCameraType
    OTHERS: (description: string) => DocumentCameraType
    RG_FRENTE: DocumentCameraType
    RG_VERSO: DocumentCameraType
    RG_FRENTE_NOVO: DocumentCameraType
    RG_VERSO_NOVO: DocumentCameraType
  }
  export const SDKEnvironmentTypes: {
    PROD: SDKEnvironmentType
    UAT: SDKEnvironmentType
  }
  export class LocaleType {
    name: string

    constructor(name: string)
  }
  export const LocaleTypes: {
    PT_BR: LocaleType
    EN_US: LocaleType
    ES_MX: LocaleType
    ES_ES: LocaleType
  }
  export type SuccessPictureResponse = {
    encrypted: string
    base64: string
  }
  export type ErrorPictureResponse = {
    code: number
    message: string
    type: string
    stack: any[]
  }
  export type CallbackCamera = {
    on: {
      success: (obj: SuccessPictureResponse) => void
      error: (error: ErrorPictureResponse) => void
    }
  }
  interface CameraOpener {
    open: (callback: CallbackCamera) => void
  }
  export interface MainView {
    prepareSelfieCamera: (
      config: UnicoConfig | string,
      cameraType: SelfieCameraType,
    ) => Promise<CameraOpener>
    prepareSelfieCameraForIFrame: (
      config: UnicoConfig | string,
      cameraType: SelfieCameraType,
    ) => Promise<CameraOpener>
    prepareDocumentCamera: (
      config: UnicoConfig | string,
      cameraType: DocumentCameraType,
    ) => Promise<CameraOpener>
  }
  export class UnicoCheckBuilder {
    setTheme(theme: UnicoTheme): UnicoCheckBuilder

    setModelsPath(path: string): UnicoCheckBuilder

    setResourceDirectory(path: string): UnicoCheckBuilder

    setEnvironment(environmentType: SDKEnvironmentType): UnicoCheckBuilder

    setCustomFooterLogoDirectory(path: string): UnicoCheckBuilder

    setLocale(localeType: LocaleType): UnicoCheckBuilder

    build(): MainView
  }

  export class UnicoException extends Error {
    constructor(message: string, public code?: number) {
      super(message)
      this.name = 'UnicoException'
    }
  }
}
