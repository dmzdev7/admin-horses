"use client"

export const TableUsers = ({data}) => {
  return (
		<table className="min-w-full bg-white border border-gray-200">
			{/* Cabecera */}
			<thead className="bg-gray-100 text-gray-800">
				<tr>
					<th className="px-4 py-2 text-left font-bold">Nombre</th>
					<th className="px-4 py-2 text-left font-bold">Correo Electrónico</th>
					<th className="px-4 py-2 text-left font-bold">Tipo de Usuario</th>
					<th className="px-4 py-2 text-left font-bold">Rol</th>
					<th className="px-4 py-2 text-left font-bold">Estado</th>
				</tr>
			</thead>
			{/* Cuerpo */}
			<tbody className="divide-y">
				{data?.res?.results.map((user) => (
					<tr key={user.id}>
						<td className="px-4 py-2">{user.nombre}</td>
						<td className="px-4 py-2">{user.email}</td>
						<td className="px-4 py-2">{user.tipo}</td>
						<td className="px-4 py-2">{user.role}</td>
						<td
							className={`px-4 py-2 ${
								user.estado === "C" ? "text-green-600" : "text-red-600"
							}`}
						>
							{user.estado === "C" ? "Activo" : "Inactivo"}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}