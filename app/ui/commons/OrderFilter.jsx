"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function OrderFilter({ sort }) {
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const params = new URLSearchParams(searchParams);

	return (
		<div className="flex flex-col">
			<label
				htmlFor="orderFilter"
				className="text-xs text-slate-500 font-semibold"
			>
				Ordenar por
			</label>
			<select
				id="orderFilter"
				value={sort}
				className="focus:outline-none py-1 px-2 border border-slate-300 rounded-sm max-w-[150px] text-sm"
				onChange={(e) => {
					params.set("sort", e.target.value); // Setea ASC o DESC
					params.set("page", 1); // Reinicia a la primera página
					replace(`${pathname}?${params.toString()}`);
				}}
			>
				<option value="ASC">Nombre (A-Z)</option>
				<option value="DESC">Nombre (Z-A)</option>
			</select>
		</div>
	);
}
