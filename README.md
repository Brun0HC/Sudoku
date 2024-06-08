# Manual do jogador

## Setup inicial
- Inicie o banco de dados MySql contendo as seguintes propriedades:
  - host: localhost
  - port: 3306
  - database: sudoku
  - user: root
  - password: root
    
- No diretório **sudoku-backend/src** execute pelo terminal o comando `node index.js`.
- No diretório **sudoku-frontend** execute pelo terminal o comando `npm start`.

## 1 - Registrar

Para efetuar o registro de um perfil é necessário ir até a rota **http://localhost:3000/register**.

## 2 - Login

Depois de criada uma conta, o jogador será redirecionado para a página de login, porém ela é acessível utilizando a rota **http://localhost:3000/login**.
Nela será criado um Token JWT para fazer as requisições do jogo.

## 3 - Gerando uma tabela Sudoku

Depois de efetuado o login, o jogador será redirecionado para a página de sudoku, onde deverá escolher uma dentre as 3 dificuldades
- **facil**
- **medio**
- **dificil**

## 4 - Validando sua tabela

Depois de preenchida a tabela basta clicar no botão **verificar** para saber se sua resposta está correta.
