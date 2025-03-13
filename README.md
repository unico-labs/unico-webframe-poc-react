<p align="center">
  <a href="https://unico.io">
    <img width="350" src="https://unico.io/wp-content/uploads/2024/05/idcloud-horizontal-color.svg">
  </a>
</p>

<h1 align="center">React</h1>

<div align="center">

### 📚 POC de implementação do SDK By Client React

</div>

---

## 💻 Compatibilidade

### 📌 Versões Mínimas

O componente de captura do SDK Web é compatível com as seguintes versões mínimas:

- **Android:** 5.0 (API 21);
- **iOS:** 11;
- **React:** Versão 16 ou superior (recomendado).

### 📱 Dispositivos Compatíveis

Confira os aparelhos testados em nossos laboratórios nesta [lista de dispositivos](https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/visao-geral#dispositivos-compativeis).

---

## ✨ Como Começar

Para utilizar os nossos SDKs, você deve importar as credenciais Unico (Client SDK Key) em seu projeto.

### 🔧 Instalação

O SDK Web está disponível via pacote NPM ou CDN. Siga os passos abaixo conforme sua preferência:

#### Via NPM

Para instalar o SDK em seu projeto com npm, execute:

```- npm install unico-webframe```

Ou, se preferir o Yarn:

```- yarn add unico-webframe```

---

## 📥 Importação

Após instalar o SDK, importe-o corretamente em seu projeto:

- **Se instalado via NPM:**

  ```javascript
  import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes, UnicoConfig, LocaleTypes } from 'unico-webframe'
  ```

- **Se instalado via CDN:**

  ```javascript
  import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes, UnicoConfig, LocaleTypes } from 'UnicoCheckBuilder.min.js'
  ```

---

## 🚀 Inicializando o SDK

Para iniciar, siga os 3 passos abaixo:

1. **Instancie um novo Builder:**

   ```javascript
   const unicoCameraBuilder = new UnicoCheckBuilder();
   ```

2. **Defina o caminho dos arquivos adicionais (se houver):**

   ```javascript
   unicoCameraBuilder.setResourceDirectory("/resources");
   ```

3. **Configure o caminho dos modelos de IA (caso use a funcionalidade de Câmera Inteligente):**

   ```javascript
   unicoCameraBuilder.setModelsPath("https://meusite.com.br/models");
   ```

---

## 🌐 Configuração de Ambientes

Por padrão, o SDK Web utiliza o ambiente de produção. Caso seja necessário, você pode alterar o ambiente utilizando o enumerado `SDKEnvironmentTypes`:

- ```SDKEnvironmentTypes.PROD:``` Ambiente de Produção;
- ```SDKEnvironmentTypes.UAT:``` Ambiente de Homologação.

Exemplo de implementação:

```javascript
import {
  ...
  UnicoCheckBuilder,
  SDKEnvironmentTypes
  ...
} from "unico-webframe"

unicoCameraBuilder.setEnvironment(SDKEnvironmentTypes.UAT);
```

---

## 🔄 Implementação das Funções de Callback

É necessário passar um objeto de callback ao método que renderiza o frame de captura. Esse objeto deve conter funções para tratar os casos de sucesso e erro, conforme o exemplo:

```javascript
  const callback = {
    on: {
      success: (obj) => {
        console.log(obj.base64);
        console.log(obj.encrypted);        
      },
      error: (error) => {
        console.error(error)
        // confira na aba "Referências" sobre os erros possíveis
      }
    }
  };
```

> **⚠️ Observação:** Esse objeto é obrigatório. Se não incluir os eventos `success` e `error`, uma exceção será gerada e, caso não tratada, exibida no console do usuário.

---

## ⚠️ Atenção

- O atributo `encrypted` é destinado **exclusivamente** ao envio da imagem através das APIs do By Client.  
- **Não abra ou serialize** esse atributo, pois suas características podem ser alteradas sem aviso prévio.  
- Seu uso deve ocorrer somente em interações com as APIs para garantir a integridade e a segurança dos dados.  
- A Unico não se responsabiliza por quaisquer danos decorrentes de práticas inadequadas, pois as modificações podem ocorrer de forma imprevista.

Além disso, os arquivos `base64/encrypted` podem variar de tamanho conforme a qualidade dos dispositivos, as fotos geradas e as regras de negócio da Unico. Para evitar problemas, não limite o tamanho da string gerada pela SDK em sua lógica de programação ou infraestrutura.

---

## 🎬 Configurar e Iniciar a Câmera

Para iniciar a câmera com as configurações realizadas, siga os passos abaixo:

1. **Crie uma instância do builder utilizando o método `build()`:**

   ```javascript
   const unicoCamera = unicoCameraBuilder.build();
   ```

2. **Configure o modo de captura da câmera:**

   Utilize o método `prepareSelfieCamera()`, que recebe dois parâmetros:
   
   - A instância da classe `UnicoConfig`.
   - O modo desejado:
     - ```SelfieCameraTypes.NORMAL``` para o modo normal;
     - ```SelfieCameraTypes.SMART``` para o modo inteligente.

   Esse método retorna uma _promise_ que, quando resolvida, fornece um objeto para abrir a câmera através do método `open()`, utilizando o callback definido anteriormente.

   **Dica:** Para otimizar, você pode separar as chamadas dos métodos `prepareSelfieCamera()` e `open()`.

   Caso deseje a captura automática, passe o parâmetro ```Unico.SelfieCameraTypes.SMART``` para o método `prepareSelfieCamera`.

   Para a captura inteligente, lembre-se de carregar os modelos de visão computacional com o método `setModelsPath`, conforme explicado anteriormente.

   Exemplo utilizando a classe `UnicoConfig`:

   ```javascript
   const config = new UnicoConfig()
     .setHostname("<YOUR_HOSTNAME>")
     .setHostKey("<YOUR_HOST_KEY>");

   unicoCamera.prepareSelfieCamera(
     config, 
     SelfieCameraTypes.SMART
   ).then(cameraOpener => {
     cameraOpener.open(callback);
   }).catch(error => {
     console.error(error);
     // confira na aba "Referências" sobre os erros possíveis
   });
   ```

---

Após finalizar a instalação e configuração do SDK, consulte o [Guia de Instalação](https://devcenter.unico.io/idcloud/integracao/sdk/integracao-sdks/sdk-web/guia-de-instalacao) para obter mais informações e detalhes complementares.
