import React, { useEffect, useState } from 'react';
import Board from './Board';
import './css/Sudoku.css'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const Sudoku = () => {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));
  const token = localStorage.getItem('token')
  const [boardBCK, setBoardBck] = useState(Array(9).fill(Array(9).fill(0)));
  const [difficulty, setDifficulty] = useState('');
  const [idSudoku, setIdSudoku] = useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      return navigate('/login')
    }
    const tokenDecoded=jwtDecode(token)
    console.log(token, tokenDecoded)
    if (!tokenDecoded.exp || tokenDecoded.exp*1000 < new Date())
      {
        localStorage.removeItem('token')
      }
  },[token])

  const fetchSudoku = (difficulty) => {
    const validDifficulties = ["facil", "medio", "dificil"];
    if (!validDifficulties.includes(difficulty)) {
      setBoard([]);
      return;
    }
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/sudoku/gerar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ dificuldade: difficulty }),
    })
      .then(response => response.json())
      .then(data => {
        setBoardBck(data.puzzle);
        setBoard(data.puzzle);
        setIdSudoku(data.id);
      });
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    fetchSudoku(event.target.value);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setBoard(newBoard);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/sudoku', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ tabelaUsuario: board, idSudoku }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json().then(data => {
            alert('Solução válida!');
          });
        } else {
          return response.json().then(data => {
            alert('Solução inválida.');
          });
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };
  

  return (
    <div className="sudoku-container">
      <div className="difficulty-select">
        <label htmlFor="difficulty">Escolha a dificuldade:</label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="">Selecione</option>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>
      <BoardContainer>
        <Board board={board} onCellChange={handleCellChange} boardBCK={boardBCK}/>
      </BoardContainer>
      <div className="verify-button">
        <button onClick={handleSubmit}>Verificar</button>
      </div>
    </div>
  );
};

const BoardContainer = ({ children }) => {
  return (
    <div className="board-container">
      {children}
    </div>
  );
};

export default Sudoku;
