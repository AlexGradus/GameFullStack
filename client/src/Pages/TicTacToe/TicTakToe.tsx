import { useEffect, useState } from 'react';
import './TicTacToe.css';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { pushStep } from '../../Api/api';
import { IMyProps } from '../../Interface/interface';

const TicTacToe = () => {
	const NewGameData = Array(9).fill('');
	const [turn, setTurn] = useState('X');
	const [cells, setCells] = useState(NewGameData);
	const squares = [...cells];
	const [winner, setWinner] = useState(null as null | string);
	const gameId = JSON.parse(localStorage.getItem("GameId") as string);

	const getSteps = async (id: string) => {
		try {
			await axios.post("http://localhost:5000/api/auth/getsteps", {
				id
			}).then(res => {
				setCells(res.data.result.steps);
				setTurn(res.data.result.currentStep)
			})
		} catch (e) {
			if (axios.isAxiosError(e)) {
				alert(e.response?.data.message);
			}
		}

	}
	useEffect(() => {
		setInterval(() => {
			getSteps(gameId)
		}, 1000);
	}, []);
	useEffect(() => {
		getSteps(gameId);
		checkWinner(squares);
	}, [turn]);

	const checkWinner = (squares: string[]) => {
		const variants: any = {
			horizontal: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			vertical: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagonal: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let variant in variants) {
			variants[variant].forEach((item: number[]) => {
				if (
					squares[item[0]] === '' ||
					squares[item[1]] === '' ||
					squares[item[2]] === ''
				) {
				} else if (
					squares[item[0]] === squares[item[1]] &&
					squares[item[1]] === squares[item[2]]
				) {
					setWinner(squares[item[0]]);
					pushStep(gameId, NewGameData, 'X')
					return;
				} else if (
					!squares.includes('')
				) {
					setWinner('No one');
					pushStep(gameId, NewGameData, 'X')
				}
			});
		}
	};

	const handleClick = (num: string | number) => {
		if (winner) {
			alert('too late');
			return;
		}
		if (cells[Number(num)] !== '') {
			alert('already done');
			return;
		}
		if (turn === 'X') {
			squares[Number(num)] = 'X';
			pushStep(gameId, squares, 'O')
		} else {
			squares[Number(num)] = 'O';
			pushStep(gameId, squares, 'X')
		}
	};
	const handleRestart = () => {
		const NewGameData = Array(9).fill('');
		setWinner(null);
		pushStep(gameId, NewGameData, 'X')
	};
	const Cell = (props: IMyProps) => {
		return <td align="center" onClick={() => handleClick(props.num)}>{cells[props.num]}</td>;
	};

	return (
		<><div className="button">
			<NavLink className="back_button_position" to="/">
				<Button color='error' variant="text">Back</Button>
			</NavLink>
		</div>
			<div className='container'>
				Turn: {turn}
				<table>
					<tbody>
						<tr>
							<Cell num={0} />
							<Cell num={1} />
							<Cell num={2} />
						</tr>
						<tr>
							<Cell num={3} />
							<Cell num={4} />
							<Cell num={5} />
						</tr>
						<tr>
							<Cell num={6} />
							<Cell num={7} />
							<Cell num={8} />
						</tr>
					</tbody>
				</table>
				{winner && (
					<>
						<p>{winner} is a winner!</p>
						<Button color='error' onClick={() => handleRestart()} variant="text">Play Again</Button>
					</>
				)}
			</div></>
	);
};
export default TicTacToe;