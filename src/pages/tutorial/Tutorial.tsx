import React from 'react';
import './tutorial.css';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}
function Square(props: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: Array<string | null>;
  onClick: (arg0: number) => void;
}
class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number): JSX.Element {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render(): JSX.Element {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

type Squares = Array<string | null>;
interface TutorialState {
  history: Array<{squares: Squares}>;
  stepNumber: number;
  xIsNext: boolean;
}
class Tutorial extends React.Component<{}, TutorialState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i: number): void {
    const history: Array<{squares: Squares}> = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: {squares: Squares} = history[history.length -1];
    const squares: Squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat(
        [
          {
            squares: squares
          }
        ]
      ),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render(): JSX.Element {
    const history: Array<{squares: Squares}> = this.state.history;
    const current: {squares: Squares} = history[this.state.stepNumber];
    const winner: string | null = calculateWinner(current.squares);

    const moves: Array<JSX.Element> = history.map((step: {squares: Squares}, move: number): JSX.Element => {
      const desc: string = move
        ? 'Go to move #' + move
        : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: Squares): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c]: Array<number> = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Tutorial;
