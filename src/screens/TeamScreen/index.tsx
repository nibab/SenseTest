import React from 'react';

type TeamMateRowProps = {
	active: boolean
}
const TeamMateRow = ({ active }: TeamMateRowProps) => {
	const renderActiveBadge = () => {
		return (
			<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
				Active
			</span>
		)
	}

	const renderInactiveBadge = () => {
		return (
			<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
				Inactive
			</span>
		)
	}

	return (
		<tr>
			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
				<div className="flex items-center">
					<div className="flex-shrink-0 h-10 w-10">
						<img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
					</div>
					<div className="ml-4">
						<div className="text-sm leading-5 font-medium text-gray-900">Bernard Lane</div>
						<div className="text-sm leading-5 text-gray-500">bernardlane@example.com</div>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
				<div className="text-sm leading-5 text-gray-900">Director</div>
				<div className="text-sm leading-5 text-gray-500">Human Resources</div>
			</td>
			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
				{ active ? renderActiveBadge(): renderInactiveBadge() }
			</td>
			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
			Owner
			</td>
			<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
				<a href="#" className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">Edit</a>
			</td>
		</tr>
	)
}

const TeamScreen = () => {
	return (
		<div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
			<div className="flex flex-col">
				<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
					<table className="min-w-full">
						<thead>
						<tr>
							<th className="px-6 py-3 border-b border-gray-200 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
							Name
							</th>
							<th className="px-6 py-3 border-b border-gray-200 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
							Title
							</th>
							<th className="px-6 py-3 border-b border-gray-200 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
							Status
							</th>
							<th className="px-6 py-3 border-b border-gray-200 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
							Role
							</th>
							<th className="px-6 py-3 border-b border-gray-200 bg-gray-400"></th>
						</tr>
						</thead>
						<tbody className="bg-white">
						<TeamMateRow active={true} />
						<TeamMateRow active={true} />
						<TeamMateRow active={false} />
						<TeamMateRow active={false} />
						</tbody>
					</table>
					</div>
				</div>
			</div>
		</div>
	)	
}

export default TeamScreen