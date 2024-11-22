export default function SelectFloating({
	labelName,
	options,
	idName,
	valueInit,
	onChange,
	disabled,
	empty,
	required,
}) {
	return (
		<div className="relative mb-3">
			<select
				id={idName}
				className="block px-2.5 py-3 w-full text-xs md:text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--primary-700] peer disabled:bg-slate-100 disabled:cursor-not-allowed"
				value={valueInit}
				onChange={onChange}
				disabled={disabled}
				required={required}
			>
				<option value="" hidden>
					{empty}
				</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<label
				htmlFor={idName}
				className="absolute text-xs md:text-sm text-gray-400 transform -translate-y-4 scale-90 top-2 left-2 z-[2] origin-[0] bg-white px-2 flex items-center peer-focus:text-[--primary-700]"
			>
				{labelName}
			</label>
		</div>
	);
}
