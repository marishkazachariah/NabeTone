import { Link } from 'react-router-dom';

export default function AudioFileCard({ title, _id }) {
	return (
		<div>
			<Link to={`/nodes/${_id}`}>
				<h3>{title}</h3>
			</Link>
		</div>
	)
}
