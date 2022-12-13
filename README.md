# unico-webframe-poc-react
POC de implementação do SDK web unico | check em React

Para instalar as dependências rodar o seguinte comando:
```
npm install
```

Para rodar a aplicação localmente rodar o seguinte comando:
```
npm start
```

Com o comando acima a aplicação pode ser acessada via browser no seguinte endereço: http://localhost:3000

## Importação do bundle
Faz-se necessário criar e preencher os arquivos abaixo com o bundle (arquivo JSON de credenciais) gerado pelo portal da Unico:
1. /public/services.json
2. /public/services-sem-facetec.json 

O arquivo 1 é para o uso do frame de captura com liveness com interação (Facetec).
O arquivo 2 é para o uso dos frames de captura manual, inteligente ou documentos.
