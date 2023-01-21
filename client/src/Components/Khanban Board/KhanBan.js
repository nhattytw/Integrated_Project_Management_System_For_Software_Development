import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { useState } from "react";
	
const initialBoard = {
    columns: [
      {
        id: 1,
        title: "To-Do",
        cards: [
          {
            id: 1,
            title: "Write post",
            description: "Write a new post for blog."
          },
          {
            id: 2,
            title: "Cook dinner",
            description: "Cook an awesome dinner."
          }
        ]
      },
      {
        id: 2,
        title: "Done",
        cards: [
          {
            id: 3,
            title: "Fix car",
            description: "Fix my car problem"
          }
        ]
      }
    ]
  };

  export function MyBoard() {
 
    const [board, setBoard] = useState(initialBoard);
   
    function onCardMove(card, source, destination) {
      const updatedBoard = moveCard(board, source, destination);
      setBoard(updatedBoard);
    }
   
    return (
      <Board 
        onCardDragEnd={onCardMove} 
    
    
      >
        {board}
      </Board>
    );
  }