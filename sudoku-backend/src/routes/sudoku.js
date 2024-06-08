const express = require('express');
const router = express.Router();
const banco = require("../../db/banco");
const authenticateToken = require('../middlewares/auth')

function gerarSudokuPuzzle(tabela, dificuldade) {

  let puzzle = tabela.map(row => row.slice());

  let numZeros;
  if (dificuldade === 'facil') {
    numZeros = 20;
  } else if (dificuldade === 'medio') {
    numZeros = 35;
  } else if (dificuldade === 'dificil') {
    numZeros = 50;
  } else {
    return puzzle;
  }

  const positions = [];
  while (positions.length < numZeros) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const pos = `${row}-${col}`;
    if (!positions.includes(pos)) {
      positions.push(pos);
      puzzle[row][col] = 0;
    }
  }

  return puzzle;
}

function verificarTabela(gabarito, tabelaUsuario) {
  let tabelaCorreta = true;
  for (let i = 0; i < gabarito.length; i++) {
    for (let j = 0; j < gabarito[i].length; j++) {
      if (gabarito[i][j] !== tabelaUsuario[i][j]) {
        tabelaCorreta = false;
        break;
      }
    }
    if (!tabelaCorreta) break;
  }
  return tabelaCorreta;
}

router.post('/', async (req, res) => {
  const { tabelaUsuario, idSudoku } = req.body;

  const sudokuGabarito = await banco.validaSudoku(idSudoku);

  if (!sudokuGabarito) {
    return res.status(404).send({ message: "Sudoku não encontrado" });
  }

  const gabarito = sudokuGabarito.tabela;
  const tabelaCorreta = verificarTabela(gabarito, tabelaUsuario);

  if (tabelaCorreta) {
    res.status(200).send({ message: "Sudoku resolvido corretamente!" });
  } else {
    res.status(400).send({ message: "Solução incorreta. Tente novamente." });
  }
});

router.post('/gerar', authenticateToken, async (req, res) => {
  try {
    const { dificuldade } = req.body;

    const [id, tabela] = await banco.getNewSudoku();
    const puzzle = gerarSudokuPuzzle(tabela, dificuldade);

    res.status(200).send({ id: id, puzzle });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao gerar Sudoku' });
  }
});

module.exports = router;
