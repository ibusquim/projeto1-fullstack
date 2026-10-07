# Noms Food Explorer

Aplicação web desenvolvida em **React.js** para pesquisa de alimentos utilizando a **Noms API**, com exibição dos resultados e visualização de informações relacionadas aos alimentos.

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

* React.js
* JavaScript
* Fetch API/AJAX
* Noms API
* Material UI
* `useMemo`
* Git
* GitHub

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
```

O arquivo `.env` não deve ser enviado ao GitHub.

Para facilitar a configuração do projeto, é disponibilizado o arquivo `.env.example`:

```env
VITE_NOMS_API_KEY=
```

Cada integrante deve configurar seu próprio arquivo `.env` localmente.

## Funcionalidades

O projeto possui a estrutura necessária para:

* pesquisa de alimentos;
* consulta à Noms API;
* recebimento e processamento de dados JSON;
* exibição dos resultados em cards;
* estado de carregamento;
* tratamento de erros;
* tratamento de pesquisa sem resultados;
* seleção de alimento;
* visualização de informações nutricionais;
* utilização do `useMemo` para processamento dos dados;
* interface responsiva;
* funcionamento como SPA.

## Arquitetura

O `App.jsx` funciona como principal coordenador entre a lógica da aplicação e os componentes visuais.

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

### Fluxo dos dados

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
                       foods
                         │
                         ▼
                      useMemo
                         │
                         ▼
                  processedFoods
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          FoodCard    Loading    ErrorMessage
              │
              ▼
        selectedFood
              │
              ▼
      FoodDetails / Dialog
```

### Processamento dos dados

Os resultados brutos retornados pela Noms são armazenados em `foods`.

A partir de `foods`, o `App.jsx` utiliza `useMemo` para gerar o valor derivado `processedFoods`.

Cada alimento processado possui a estrutura:

```javascript
{
  id,
  name,
  brand,
  nutrients,
  serving,
  imageUrl,
  barcode,
  basisUnit,
  description
}
```

A estrutura de `nutrients` é:

```javascript
{
  id,
  name,
  value,
  unit
}
```

O campo `serving` representa a porção padrão selecionada a partir das porções disponíveis:

```javascript
{
  unit,
  descriptor,
  quantity,
  grams,
  milliliters,
  is_default
}
```

Os componentes visuais recebem os dados já processados pelo `App.jsx` e não precisam acessar diretamente a estrutura bruta da resposta da Noms.

## Estados da aplicação

O `App.jsx` controla os seguintes estados:

```javascript
query
foods
loading
error
selectedFood
hasSearched
```

### `query`

Texto digitado pelo usuário para realizar a pesquisa.

### `foods`

Resultados brutos retornados pela função `searchFoods()`.

### `loading`

Indica que uma pesquisa está sendo realizada.

### `error`

Contém a mensagem de erro quando ocorre uma falha.

### `selectedFood`

Armazena o alimento selecionado pelo usuário.

Quando nenhum alimento está selecionado:

```javascript
selectedFood === null
```

### `hasSearched`

Indica se o usuário já realizou uma pesquisa e permite diferenciar o estado inicial de uma pesquisa que não retornou resultados.

### `processedFoods`

`processedFoods` não é um estado independente. É um valor derivado de `foods`, calculado utilizando `useMemo`.

## Contrato entre os integrantes

O `App.jsx` funciona como coordenador da integração entre a lógica e os componentes visuais.

### SearchBar

```jsx
<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
/>
```

Props:

* `value`: valor atual da pesquisa;
* `onChange`: função responsável por atualizar a pesquisa;
* `onSearch`: função responsável por iniciar a pesquisa.

A lógica da comunicação com a API permanece no `App.jsx`.

### FoodCard

```jsx
<FoodCard
  food={food}
  onSelect={handleSelectFood}
/>
```

Props:

* `food`: alimento processado a partir de `processedFoods`;
* `onSelect`: função responsável pela seleção do alimento.

O `FoodCard` não acessa diretamente a resposta bruta da Noms.

### Loading

```jsx
{loading && <Loading />}
```

O `Loading` é apresentado quando `loading` é `true`.

O componente visual não controla a requisição.

### ErrorMessage

```jsx
<ErrorMessage
  message={error}
/>
```

A lógica de tratamento do erro permanece no `App.jsx`.

### FoodDetails

O componente recebe o alimento selecionado e também participa do controle visual do Dialog:

```jsx
<FoodDetails
  open={Boolean(selectedFood)}
  food={selectedFood}
  onClose={handleCloseDetails}
/>
```

Props:

* `open`: indica se o Dialog deve estar aberto;
* `food`: alimento selecionado;
* `onClose`: função responsável pelo fechamento.

## Fluxo de integração

O fluxo principal entre lógica e interface é:

```text
Usuário digita
      ↓
SearchBar
      ↓
query
      ↓
handleSearch()
      ↓
searchFoods()
      ↓
Noms API
      ↓
foods
      ↓
useMemo
      ↓
processedFoods
      ↓
FoodCard
      ↓
onSelect(food)
      ↓
handleSelectFood()
      ↓
selectedFood
      ↓
FoodDetails
      ↓
Dialog
```

## Estados visuais

A interface diferencia os principais estados da aplicação.

### Estado inicial

```text
hasSearched = false
loading = false
error = null
foods = []
```

Nesse estado, a aplicação apresenta uma mensagem orientando o usuário a realizar uma pesquisa.

### Carregando

```text
loading = true
```

A interface apresenta o componente `Loading`.

### Resultados

```text
loading = false
error = null
processedFoods.length > 0
```

Os resultados são apresentados utilizando `FoodCard`.

### Nenhum resultado

```text
hasSearched = true
loading = false
error = null
processedFoods.length === 0
```

A interface apresenta uma mensagem informando que nenhum alimento foi encontrado.

### Erro

```text
error !== null
loading = false
```

A interface apresenta o componente `ErrorMessage`.

## Divisão da equipe

### Integrantes

* Rafael Spitzer Cardoso da Silva — A2612534
* Igor Busquim de Moraes — A2565382

A divisão de responsabilidades foi organizada entre **dados e lógica** e **interface e componentes visuais**.

### Dados e lógica

Responsabilidades relacionadas a:

* Noms API;
* Fetch/AJAX;
* pesquisa;
* estados da aplicação;
* loading;
* tratamento de erros;
* processamento dos dados;
* `useMemo`;
* seleção do alimento.

### Interface

Responsabilidades relacionadas a:

* Material UI;
* layout;
* componentes React;
* campo de pesquisa;
* cards de alimentos;
* detalhes do alimento;
* Dialog;
* Loading;
* mensagens de erro;
* responsividade.

## Ferramentas de apoio

Durante o desenvolvimento foi utilizado **ChatGPT** como ferramenta de apoio para:

* planejamento da arquitetura;
* organização das etapas de desenvolvimento;
* análise da estrutura da API;
* apoio na implementação da lógica React;
* revisão de código;
* organização da documentação do projeto.

O desenvolvimento e versionamento do projeto também utilizam **Git e GitHub**.

## Testes realizados

Os testes realizados até o momento são testes manuais utilizando a aplicação, o navegador e o Console/Network do DevTools.

### Teste de pesquisa

Foi realizada uma pesquisa utilizando:

```text
apple
```

Durante esse teste, foi verificado o recebimento de uma resposta HTTP de sucesso:

```text
Status HTTP: 200
```

Também foi analisado o primeiro objeto retornado pela API para verificar a estrutura real dos dados utilizados pela aplicação.

### Teste de quantidade de resultados

Na execução do teste com a pesquisa `apple`, a API retornou:

```text
10 alimentos
```

Esse valor corresponde ao resultado obtido durante essa execução do teste.

### Teste de loading

Durante uma pesquisa, o estado é alterado para:

```text
loading = true
```

Após a conclusão da requisição:

```text
loading = false
```

### Teste de erro

Foi verificado o tratamento de respostas HTTP diferentes de sucesso.

Durante os testes, uma resposta:

```text
HTTP 403
```

foi identificada como erro pela aplicação.

### Teste de seleção

Após o recebimento dos resultados, um alimento pode ser selecionado e armazenado em:

```text
selectedFood
```

O estado inicial é:

```text
selectedFood = null
```

### Testes visuais

A interface também foi testada em diferentes tamanhos de tela:

```text
390 × 844
768 × 1024
1024 × 768
1440 × 900
```

Foram verificados:

* título;
* campo de pesquisa;
* cards;
* Dialog de detalhes;
* espaçamentos;
* comportamento responsivo.

## Git e GitHub

O projeto utiliza Git e GitHub para versionamento e acompanhamento do desenvolvimento.

As alterações são organizadas em branches e Pull Requests, permitindo registrar a participação individual de cada integrante.

Cada integrante é responsável por uma parte definida da aplicação, conforme a divisão apresentada neste documento.

## Estado do projeto

A aplicação possui a estrutura da API, lógica de processamento e componentes visuais definidos para a integração.

A integração entre os dados processados pela Noms e os componentes visuais é realizada através do `App.jsx`, mantendo a separação de responsabilidades entre os integrantes.
