# Noms Food Explorer

Aplicação web desenvolvida em **React.js** para pesquisa de alimentos utilizando a **Noms API**, com exibição dos resultados e preparação dos dados para consulta de informações nutricionais.

O projeto funciona como uma **Single Page Application (SPA)**, sem redirecionamento entre páginas durante o uso.

## Descrição

O Noms Food Explorer permite ao usuário pesquisar alimentos e consultar os resultados retornados pela Noms API.

O fluxo principal da aplicação é:

```text
Pesquisar alimento
        ↓
Consultar Noms API
        ↓
Receber dados JSON
        ↓
Processar os dados
        ↓
Exibir resultados
        ↓
Selecionar alimento
        ↓
Visualizar informações
```

A comunicação com a API é realizada de forma assíncrona utilizando **Fetch API/AJAX**.

## Tecnologias

- React.js
- JavaScript
- Fetch API/AJAX
- Noms API
- Material UI
- `useMemo`
- Git
- GitHub

## Como executar

Clone o repositório e, dentro da pasta do projeto, execute:

```bash
npm install
npm run dev
```

Depois, abra no navegador o endereço fornecido pelo Vite.

## Configuração da API

A aplicação utiliza uma chave da Noms API.

1. Acesse a documentação/dashboard da Noms em https://noms.sh/.
2. Crie uma chave em **API Keys → Create key**.
3. Configure o mercado da conta gratuita, caso ainda não esteja selecionado.
4. Crie um arquivo `.env` na raiz do projeto.
5. Adicione:

```env
VITE_NOMS_API_KEY=sua_chave

## Funcionalidades

Atualmente, o projeto possui ou está estruturado para:

- pesquisa de alimentos;
- consulta à Noms API;
- recebimento e processamento de dados JSON;
- exibição dos resultados da pesquisa;
- estado de carregamento;
- tratamento de erros;
- tratamento de pesquisa sem resultados;
- seleção de alimento;
- preparação dos dados para exibição de informações nutricionais;
- utilização do `useMemo` para processamento de dados;
- interface em uma única página (SPA).

## Arquitetura

A aplicação possui o `App.jsx` como principal coordenador da lógica da interface.

Estrutura principal:

```text
src/
├── components/
│   ├── SearchBar.jsx
│   ├── FoodCard.jsx
│   ├── FoodDetails.jsx
│   ├── Loading.jsx
│   └── ErrorMessage.jsx
│
├── services/
│   └── nomsApi.js
│
├── App.jsx
├── main.jsx
└── index.css
```

Fluxo dos dados:

```text
                 ┌───────────────┐
                 │    App.jsx    │
                 │               │
                 │ estados       │
                 │ pesquisa      │
                 │ seleção       │
                 │ useMemo       │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ nomsApi.js    │
                 │               │
                 │ Fetch/AJAX    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │   Noms API    │
                 └───────┬───────┘
                         │
                         ▼
                    dados JSON
                         │
                         ▼
                    processamento
                         │
                         ▼
              componentes visuais
```

O `useMemo` é utilizado para gerar dados processados a partir dos resultados recebidos da API.

## Divisão da equipe

### Integrantes

- Rafael Spitzer Cardoso da Silva — A2612534
- Igor Busquim de Moraes — A2565382

A divisão de responsabilidades do projeto foi organizada entre **dados e lógica** e **interface e componentes visuais**.

### Dados e lógica

Responsabilidades relacionadas a:

- Noms API;
- Fetch/AJAX;
- pesquisa;
- estados da aplicação;
- loading;
- tratamento de erros;
- processamento dos dados;
- `useMemo`;
- seleção de alimento.

### Interface

Responsabilidades relacionadas a:

- Material UI;
- layout;
- componentes React;
- campo de pesquisa;
- cards de alimentos;
- detalhes do alimento;
- Dialog;
- Loading;
- mensagens de erro;
- responsividade.

## Contrato entre os integrantes

O `App.jsx` funciona como coordenador da integração entre a lógica e os componentes visuais.

Os principais dados controlados são:

```text
query
foods
processedFoods
loading
error
selectedFood
```

Os principais componentes foram planejados para receber:

```text
SearchBar
├── value
├── onChange
└── onSearch

FoodCard
├── food
└── onSelect

Loading
└── estado de loading

ErrorMessage
└── message

FoodDetails
└── food
```

A lógica de comunicação com a Noms permanece separada dos componentes visuais.

## Ferramentas de apoio

Durante o desenvolvimento foi utilizado **ChatGPT** como ferramenta de apoio para:

- planejamento da arquitetura;
- organização das etapas de desenvolvimento;
- análise da estrutura da API;
- apoio na implementação da lógica React;
- revisão de código;
- organização da documentação do projeto.

O desenvolvimento e versionamento do projeto também utilizam **Git e GitHub**.

## Como executar os testes

Os testes realizados até o momento são testes manuais utilizando a aplicação, o navegador e o Console do DevTools.

### Teste de pesquisa

Realizar uma pesquisa utilizando:

```text
apple
```

Resultado esperado:

```text
Status HTTP: 200
```

A API retornou resultados e foi possível verificar a quantidade de alimentos recebidos.

### Teste de quantidade de resultados

Na pesquisa realizada com `apple`, a API retornou:

```text
10 alimentos
```

Também foi verificado o primeiro objeto retornado pela API para identificar sua estrutura real.

### Teste de loading

Ao realizar uma pesquisa:

```text
loading = true
```

Durante o processamento da requisição.

Após a resposta:

```text
loading = false
```

### Teste de erro

Foi verificado o tratamento de respostas HTTP diferentes de sucesso.

Durante a integração, uma resposta:

```text
HTTP 403
```

foi corretamente identificada como erro pela aplicação.

### Teste de seleção

Após o recebimento dos resultados, um alimento pode ser selecionado e armazenado em:

```javascript
selectedFood
```

O estado inicial é:

```javascript
selectedFood = null
```

## Integrantes

**Rafael Spitzer Cardoso da Silva**  
RA: A2612534

**Igor Busquim de Moraes**  
RA: A2565382