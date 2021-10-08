import { Link } from 'react-router-dom';

export default function AudioFileCard({ title, _id }) {
	return (
		<>
        <ul className="list-group list-group-flush">

			<Link to={`/tones/${_id}`} className="list-nodes">
				<h3>{title}</h3>
			</Link>
        </ul>
		</>
	)
}
