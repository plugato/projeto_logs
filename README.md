# Aplicação de Exemplo em Node com OpenTelemetry

Este repositório contém uma aplicação de exemplo em Node.js que demonstra o uso do OpenTelemetry para rastreamento de dados. A aplicação está configurada para enviar dados para serviços de monitoramento, incluindo Datadog e Elasticsearch.

## Como Rodar

Para executar a aplicação, basta executar o comando abaixo:

```
docker-compose up
```

Este comando iniciará os serviços da aplicação (`app-node-app`) e do OpenTelemetry Collector (`opentelemetry-collector-contrib`) em contêineres Docker.

## Configuração de Destinos

A aplicação está configurada para enviar dados para os seguintes destinos:

- **Datadog**: [https://us5.datadoghq.com/](https://us5.datadoghq.com/)
- **Elasticsearch**: [https://ec0a60a95eaa4b32af1cd8f59de42b02.us-central1.gcp.cloud.es.io:9243/](https://ec0a60a95eaa4b32af1cd8f59de42b02.us-central1.gcp.cloud.es.io:9243/)

Certifique-se de configurar as credenciais adequadas para acessar esses serviços, conforme necessário.

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou correções, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
