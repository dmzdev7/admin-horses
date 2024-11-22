import React from "react";

export default function LabelFloating({
	labelName,
	value,
	idName,
	disabled,
	handleChange,
	type,
	placeholder,
	required,
}) {
	return (
		<div className="relative">
			<input
				required={required}
				value={value}
				type={type}
				id={idName}
				className="block px-4 py-3 w-full text-xs md:text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--primary-700] peer disabled:bg-slate-100 disabled:cursor-not-allowed"
				placeholder={placeholder}
				onChange={handleChange}
				disabled={disabled}
			/>
			<label
				htmlFor={idName}
				className="absolute text-xs md:text-sm text-gray-400 transform -translate-y-4 scale-90 top-2 left-2 z-[2] origin-[0] bg-white px-2 flex items-center peer-focus:text-[--primary-700]"
			>
				{labelName}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
		</div>
	);
}
