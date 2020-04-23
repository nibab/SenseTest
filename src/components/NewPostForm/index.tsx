
	import React from 'react'

	const NewPostForm = () => {
		return (
			<div className="flex-auto h-full p-5 overflow-scroll border-2 bg-yellow-50">
				<form>
					<div>
					<div>
						<div>
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Profile
						</h3>
						<p className="mt-1 text-sm leading-5 text-gray-500">
							This information will be displayed publicly so be careful what you share.
						</p>
						</div>
						<div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
							<div className="sm:col-span-2">
								<label htmlFor="city" className="block text-sm font-medium leading-5 text-gray-700">
								Page Name
								</label>
								<div className="mt-1 rounded-md shadow-sm">
								<input id="city" className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
								</div>
							</div>
				
						<div className="sm:col-span-6">
							<label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">
							Repro Steps
							</label>
							<div className="mt-1 rounded-md shadow-sm">
							<textarea id="about" rows={3} className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"></textarea>
							</div>
							<p className="mt-2 text-sm text-gray-500">Help others reproduce the issue.</p>
						</div>
				
						
						<div className="sm:col-span-6">
							<label htmlFor="cover_photo" className="block text-sm font-medium leading-5 text-gray-700">
							Attachments
							</label>
							<div className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md">
							<div className="text-center">
								<svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
								<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<p className="mt-1 text-sm text-gray-600">
								<button type="button" className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
									Upload a file
								</button>
								or drag and drop
								</p>
								<p className="mt-1 text-xs text-gray-500">
								PNG, JPG, GIF up to 10MB
								</p>
							</div>
							</div>
						</div>
						</div>
					</div>
					
					<div className="mt-8 border-gray-200">
						<fieldset className="mt-6">
							<legend className="text-base font-medium text-gray-900">
							Blocking
							</legend>
							<p className="text-sm leading-5 text-gray-500">Does this issue block the release.</p>
							<div className="mt-4">
							<div className="flex items-center">
								<input id="push_everything" name="form-input push_notifications" type="radio" className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio" />
								<label htmlFor="push_everything" className="ml-3">
								<span className="block text-sm font-medium leading-5 text-gray-700">Yes</span>
								</label>
							</div>
							<div className="flex items-center mt-4">
								<input id="push_email" name="form-input push_notifications" type="radio" className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio" />
								<label htmlFor="push_email" className="ml-3">
								<span className="block text-sm font-medium leading-5 text-gray-700">No</span>
								</label>
							</div>
							
							</div>
						</fieldset>
					
						
					</div>
					</div>
					<div className="pt-5 mt-8 border-t border-gray-200">
					<div className="flex justify-end">
						<span className="inline-flex rounded-md shadow-sm">
						<button type="button" className="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
							Cancel
						</button>
						</span>
						<span className="inline-flex ml-3 rounded-md shadow-sm">
						<button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
							Save
						</button>
						</span>
					</div>
					</div>
				</form>
			</div>
		)
	}

	export default NewPostForm