import { useState } from 'react';

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];

	const [points, setPoints] = useState({});

	const [selected, setSelected] = useState(0);

	const handleNextClick = (e) => {
		let newSelected = Math.floor(Math.random() * anecdotes.length);
		// avoid the same anectode being selected twice in a row
		while (selected === newSelected) {
			newSelected = Math.floor(Math.random() * anecdotes.length);
		}
		setSelected(newSelected);
	};

	const handleVoteClick = (e) => {
		const newPoints = { ...points };
		newPoints[selected] =
			newPoints[selected] === undefined
				? 1
				: (newPoints[selected] += 1);

		setPoints(newPoints);
	};

	const getHighestVoted = () => {
		const [mostVoted] = [...Object.entries(points)].sort(
			(a, b) => b[1] - a[1]
		);

		console.log(mostVoted);

		return {
			mostVoted: anecdotes[mostVoted[0]],
			votes: mostVoted[1],
		};
	};

	return (
		<>
			<div>
				<p>{anecdotes[selected]}</p>
				{points[selected] > 0 && <p>has {points[selected]} votes</p>}
			</div>
			<div>
				<button onClick={handleVoteClick}>vote</button>
				<button onClick={handleNextClick}>next anectdote</button>
			</div>
			{Object.entries(points).length ? (
				<div>
					<p>{getHighestVoted().mostVoted}</p>
					<p>has {getHighestVoted().votes} votes</p>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default App;
