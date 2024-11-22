"use client";
import { useState } from "react";
import { PiStarFill } from "react-icons/pi";
import { notification } from "antd";
import { ModalEditHorses } from "./ModalEditHorses";
import { useSession } from "next-auth/react";
import { setRelevantes } from "@/app/lib/users.lib";

export const TableHorses = ({ data }) => {
	const { data: session } = useSession();
	const token = session?.token;
	const [horseData, setHorseData] = useState(data?.res?.results);
	const [selectedCount, setSelectedCount] = useState(0);

	const [openModal, setOpenModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	console.log(data, "data");

	const handleOpenModal = (item) => {
		setSelectedItem(item);
		setOpenModal(true);
	};

	const toggleRelevance = async (index) => {
		const updatedData = [...horseData];
		const currentRelevante = updatedData[index].relevante;

		if (currentRelevante === 0 && selectedCount >= 5) {
			notification.warning({
				message: "Límite alcanzado",
				description: "Solo puedes seleccionar hasta 5 caballos.",
				duration: 3,
			});
			return;
		}

		// Intentar actualizar el estado en el backend
		const newRelevante = currentRelevante === 0 ? true : false;
		const horseId = updatedData[index].id;

		const resp = await setRelevantes(
			{ id: horseId, relevante: newRelevante },
			token
		);
		if (resp.status === 200) {
			// Actualizar el estado de relevancia localmente
			updatedData[index].relevante = newRelevante ? 1 : 0;
			setHorseData(updatedData);

			// Actualizar el contador de seleccionados
			setSelectedCount((prev) => (newRelevante ? prev + 1 : prev - 1));
			notification.success({
				message: newRelevante
					? "El caballo ha sido establecido como relevante."
					: "El caballo ha sido quitado de los relevantes.",
			});
		} else {
			notification.error({
				message: "Error",
			});
		}
	};

	return (
		<>
			<table className="min-w-full bg-white border border-gray-200">
				{/* Cabecera */}
				<thead className="bg-[--primary-600] text-white">
					<tr>
						<th className="px-4 py-2 text-sm text-left font-bold">Nombre</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Raza</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Sexo</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Criadero</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Dueño</th>
						<th className="px-4 py-2 text-sm text-left font-bold">
							Código Registro
						</th>
						<th className="px-4 py-2 text-sm text-left font-bold">
							Código Federación
						</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Año</th>
						<th className="px-4 py-2 text-sm text-left font-bold">
							Correo Electronico
						</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Relevante</th>
						<th className="px-4 py-2 text-sm text-left font-bold">Acciones</th>
					</tr>
				</thead>
				{/* Cuerpo */}
				<tbody className="divide-y">
					{data?.res?.results.map((item, index) => (
						<tr key={index}>
							<td className="px-4 py-2">{item.nombre || "-"}</td>
							<td className="px-4 py-2">{item.raza || "-"}</td>
							<td className="px-4 py-2">{item.sexo || "-"}</td>
							<td className="px-4 py-2">{item.criadero || "-"}</td>
							<td className="px-4 py-2">{item.duenio || "-"}</td>
							<td className="px-4 py-2">{item.codRegisto || "-"}</td>
							<td className="px-4 py-2">{item.codFederacion || "-"}</td>
							<td className="px-4 py-2">{item.anio || "-"}</td>
							<td className="px-4 py-2">{item.email || "-"}</td>
							<td className="px-4 py-2 text-center">
								<button onClick={() => toggleRelevance(index)}>
									<PiStarFill
										className={`text-2xl ${
											item.relevante === 1 ? "text-yellow-400" : "text-gray-400"
										}`}
									/>
								</button>
							</td>
							<td className="px-4 py-2 text-center">
								<div className="flex justify-center">
									<button
										className="flex gap-1.5 items-center bg-blue-300 text-white py-1.5 px-2.5 rounded-lg shadow-md md:mt-0 mt-1.5"
										onClick={() => handleOpenModal(item)}
									>
										<span className="w-full text-xs font-semibold">Editar</span>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ModalEditHorses
				open={openModal}
				close={() => setOpenModal(false)}
				dataHorse={selectedItem}
			/>
		</>
	);
};
