import { getHorses } from "@/app/lib/users.lib";
import OrderFilter from "@/app/ui/commons/OrderFilter";
import Paginator from "@/app/ui/commons/Paginator";
import SearchField from "@/app/ui/commons/SearchField";
import { TableHorses } from "@/app/ui/horses/TableHorses";

export default async function page({ params, searchParams }) {
	const { page, limit, sortBy, searchTerm } = searchParams;

	const paginaParam = page || 1;
	const limiteParam = limit || 20;
	const ordenParam = sortBy || 1;
	const searchParam = searchTerm || "";

	const data = await getHorses(
		paginaParam,
		limiteParam,
		searchParam,
		ordenParam
	);
	// console.log(data, "data horses");

	return (
		<>
			<div className="flex items-center justify-between pb-4">
				<div>
					<SearchField search={searchParam} />
				</div>
				<OrderFilter sort={ordenParam} />
			</div>
			<div className="w-full overflow-x-auto">
				<TableHorses data={data} />
			</div>
			<div className="flex items-center justify-center mt-4">
				<Paginator
					totalProds={data?.res?.total}
					page={paginaParam}
					limit={limiteParam}
				/>
			</div>
		</>
	);
}
