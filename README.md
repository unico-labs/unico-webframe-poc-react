<p align='center'>
  <a href='https://unico.io'>
    <img width='350' src='https://unico.io/wp-content/uploads/2024/05/idcloud-horizontal-color.svg'></img>
  </a>
</p>

<h1 align='center'>React</h1>

<div align='center'>

### 📚 POC de implementação SDK By Client React

</div>

## 💻 Compatibilidade

### Versões mínimas

- O componente de captura disponibilizado por meio do SDK Web dá suporte às versões igual ou superiores para as tecnologias:

- Android: 5.0 (API 21);

- iOS: 11

- React recomendado versão 16 ou superior

### Dispositivos compatíveis

- Você pode conferior os aparelhos testados em nossos laboratórios <a href='https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/visao-geral#dispositivos-compativeis'>nesta</a> lista de dispositivos.

## ✨ Como começar

Para utilizar nossos SDKs, você deve importar as credenciais unico (Client SDK Key) em seu projeto.

### Instalação:

O SDK Web é disponibilizado através de um pacote npm ou cdn. Para a instalação, siga os passos abaixo de acordo com sua preferência:

Instalação através do pacote NPM​

Para instalar o SDK em seu projeto através do npm, basta executar o comando abaixo:

```- npm install unico-webframe```

Ou pelo yarn, com o comando abaixo:

```- yarn add unico-webframe```

## Importação

Após a instalação dO SDK, basta importa-lo da maneira correta em seu projeto.

Caso tenha instalado o pacote através do npm:

```import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes, UnicoConfig, LocaleTypes } from 'unico-webframe'```

Caso tenha instalado o pacote através do npm:

```import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes, UnicoConfig, LocaleTypes } from 'UnicoCheckBuilder.min.js'```

## Inicializar o SDK

Para começar, você deve efetuar 3 passos simples em seu projeto:

Instancie um novo Builder:

```const unicoCameraBuilder = new UnicoCheckBuilder();```

Especifique o caminho dos arquivos adicionais (caso adicionados em seu projeto):

```unicoCameraBuilder.setResourceDirectory("/resources");```

Especifique o caminho dos arquivos dos modelos de IA, caso utilize a funcionalidade de Câmera Inteligente

```unicoCameraBuilder.setModelsPath("https://meusite.com.br/models");```

## Configuração de ambientes

Caso não seja configurado, por padrão o SDK Web utiliza o ambiente de produção.

É possível configurar o ambiente que será utilizado na execução da SDK. Utilize o enumerado SDKEnvironmentTypes que contém os seguintes enumerados:

```SDKEnvironmentTypes.PROD:``` para ambiente de Produção;

```SDKEnvironmentTypes.UAT:``` para ambiente de Homologação.

Veja como implementar no exemplo abaixo:

```
import {
  ...
  UnicoCheckBuilder,
  SDKEnvironmentTypes
  ...
} from "unico-webframe"

unicoCameraBuilder.setEnvironment(SDKEnvironmentTypes.UAT);
```

## Implementar as funções de callback

Um dos objetos que deve ser passado como parâmetro ao método responsável por renderizar o frame de captura é o de callback. Este objeto deverá conter funções de callback para casos de sucesso e erro, como exemplificados abaixo.

```
  const callback = {
    on: {
      success: (obj) => {
        console.log(obj.base64);
        console.log(obj.encrypted);        
      },
      error: (error) => {
        console.error(error)
        //confira na aba "Referências" sobre os erros possíveis
      }
    }
  };
```

Este objeto é obrigatório e caso não seja corretamente implementado (contemplando todos os eventos de ```success``` ou ```error```) gera uma exceção, que caso não tratada, é exibida no console do usuário.

##

### ![Atenção](https://img.shields.io/badge/⚠️%20Atenção-red)

O atributo encrypted é destinado estritamente ao envio da imagem através das APIs do by Client. Não se deve abrir e serializar esse atributo, pois suas características podem ser alteradas sem aviso prévio. Seu uso deve ser exclusivo nas interações com as APIs para garantir a integridade e segurança dos dados. A Unico não se responsabiliza por quaisquer danos decorrentes dessa prática, uma vez que as modificações podem ocorrer de maneira imprevista.

Os arquivos base64/encrypted podem sofrer variações de tamanho de acordo com diversas variáveis, dentre elas, a qualidade dos aparelhos e das fotos geradas pelos mesmos e regras de negócio da Unico. Para não encontrar problemas em sua aplicação, não limite em sua lógica de programação ou sua infraestrutura o tamanho da string gerada pela SDK para os arquivos.

## Configurar e iniciar

Para iniciar a câmera com as configurações feitas até aqui, é preciso criar uma instância do builder através do método ```build()```.

```const unicoCamera = unicoCameraBuilder.build();```

Em seguida, com a câmera "montada", deve-se configurar o modo de captura da câmera.

A preparação da câmera será efetuada a partir do método ```prepareSelfieCamera()```, disponibilizado a partir do builder. Este método recebe 2 parâmetros:

A classe UnicoConfig obtida neste passo;

Modo de câmera desejado, sendo eles:

```SelfieCameraTypes.NORMAL``` para o modo de câmera normal;

```SelfieCameraTypes.SMART``` para o modo de câmera inteligente.

Este método gera uma promise que ao ser resolvida, devolve um objeto que é utilizado para efetivamente abrir a câmera através do método ```open```, que recebe como parâmetro as funções de ```callback``` configuradas no passo acima.

**Observação:** Para otimizar a abertura da câmera é possível separar as chamadas dos métodos prepareSelfieCamera() e open().

Caso deseje utilizar a captura automática, passe o parâmetro ```Unico.SelfieCameraTypes.SMART``` para o método ```prepareSelfieCamera```.

Para a captura inteligente, os modelos de visão computacional também devem ser carregados através do método ```setModelsPath```, conforme explicado no primeiro passo deste guia.

Usando a classe UnicoConfig:

```
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

Finalizada a instalação do SDK, siga para a implementação lendo o material: <a href='https://devcenter.unico.io/idcloud/integracao/sdk/integracao-sdks/sdk-web/guia-de-instalacao'>Guia de instalação</a>
