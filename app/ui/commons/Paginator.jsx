"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfigProvider, Pagination } from "antd";
import es_ES from "antd/lib/locale/es_ES";

export default function Paginator({ totalProds, page, limit }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();

	const handlePage = (pagina, pageSize) => {
		if (pagina !== page) {
			params.set("page", pagina);
		}

		if (pageSize !== limit) {
			params.set("page", 1);

			params.set("limit", pageSize);
		}

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<ConfigProvider locale={es_ES}>
			<Pagination
				current={page}
				pageSize={limit}
				total={totalProds}
				onChange={handlePage}
				showSizeChanger={20}
			/>
		</ConfigProvider>
	);
}
