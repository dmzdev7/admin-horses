"use client";
import { useState } from "react";
import { PiMagnifyingGlass, PiXBold } from "react-icons/pi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchField({ search }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();

	const [query, setQuery] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		params.set("searchTerm", query);
		params.set("page", 1);
		replace(`${pathname}?${params.toString()}`);
		setQuery("");
	};

	return (
		<>
			<form className="flex w-full" onSubmit={handleSubmit}>
				<div className="relative h-[30px] md:h-[40px] border border-slate-200 rounded-md overflow-hidden mr-2">
					<input
						type="text"
						className="h-full w-full pr-3 py-1 focus:outline-none pl-12 md:min-w-[500px]"
						placeholder="buscar"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
					/>
					<button className=" px-2 text-slate-400 absolute left-[5px] top-0 flex h-full items-center">
						<PiMagnifyingGlass className="size-[25px]" />
					</button>
				</div>
			</form>

			{search !== "" && (
				<button
					className="bg-[--primary-500] px-2 pr-5 rounded-md text-xs relative focus:outline-none border border-[--primary-700] inline-flex items-center text-white"
					onClick={() => {
						params.delete("searchTerm");
						setQuery("");
						replace(`${pathname}?${params.toString()}`);
					}}
				>
					{search}

					<PiXBold className="absolute top-[2px] right-[2px] text-[10px] text-[--primary-800]" />
				</button>
			)}
		</>
	);
}
