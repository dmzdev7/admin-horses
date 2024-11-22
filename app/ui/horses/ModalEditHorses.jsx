"use client";
import { useState, useEffect } from "react";
import { Modal, notification } from "antd";
import LabelFloating from "../commons/LabelFloating";
import SelectFloating from "../commons/SelectFloating";
import { useSession } from "next-auth/react";
import { editHorseById } from "@/app/lib/users.lib";

export const ModalEditHorses = ({ open, close, dataHorse }) => {
	const { data: session } = useSession();
	const token = session?.token;

	// Estado único para todos los campos
	const [formData, setFormData] = useState({
		id: "",
		nombre: "",
		raza: "",
		sexo: "",
		criadero: "",
		duenio: "",
		padre: "",
		madre: "",
		abueloMaterno: "",
		abueloPaterno: "",
		codFederacion: "",
		codRegisto: "",
		email: "",
		anio: "",
	});

	// Sincronizar datos iniciales con dataHorse
	useEffect(() => {
		if (dataHorse) {
			setFormData({
				id: dataHorse.id || "",
				nombre: dataHorse.nombre || "",
				raza: dataHorse.raza || "",
				sexo: dataHorse.sexo || "",
				criadero: dataHorse.criadero || "",
				duenio: dataHorse.duenio || "",
				padre: dataHorse.padre || "",
				madre: dataHorse.madre || "",
				abueloMaterno: dataHorse.abueloMaterno || "",
				abueloPaterno: dataHorse.abueloPaterno || "",
				codFederacion: dataHorse.codFederacion || "",
				codRegisto: dataHorse.codRegisto || "",
				email: dataHorse.email,
				anio: dataHorse.anio || "",
			});
		}
	}, [dataHorse]);

	// Manejar cambios en los campos
	const handleFieldChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value, // Actualiza el campo específico en formData
		}));
	};

	const handleEditHorse = async (e) => {
		e.preventDefault();
		// console.log(formData, "formData");
		const result = await editHorseById(formData, token);
		console.log(result, "result");

		if (result.status === 200) {
			notification.success({
				message: result.res.message,
			});
			close();
		} else {
			notification.error({
				message: result.res.message,
			});
		}
	};

	if (!session) return null;

	return (
		<Modal
			title={`INFORMACIÓN DEL CABALLO #${dataHorse?.nombre.toUpperCase()}`}
			centered
			open={open}
			onCancel={close}
			width={1000}
			footer={null}
		>
			<form className="w-full mt-8" onSubmit={handleEditHorse}>
				{/* Campos */}
				<LabelFloating
					labelName={"Nombre"}
					idName={"nombre"}
					type={"text"}
					placeholder={"Ingresar"}
					value={formData.nombre}
					handleChange={(e) =>
						handleFieldChange("nombre", e.target.value.toUpperCase())
					}
				/>
				<div className="flex items-center gap-4 mt-4">
					<div className="w-full">
						<LabelFloating
							labelName={"Raza"}
							idName={"raza"}
							type={"text"}
							placeholder={"Ingresar"}
							value={formData.raza}
							handleChange={(e) => handleFieldChange("raza", e.target.value)}
						/>
					</div>
					<div className="w-full mt-3">
						<SelectFloating
							labelName={"Sexo"}
							idName={"sexo"}
							options={[
								{ value: "macho", label: "Macho" },
								{ value: "hembra", label: "Hembra" },
							]}
							valueInit={formData.sexo}
							onChange={(e) => handleFieldChange("sexo", e.target.value)}
							empty="Seleccionar"
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 mt-4">
					<div className="w-full">
						<LabelFloating
							labelName={"Criadero"}
							idName={"criadero"}
							type={"text"}
							placeholder={"Ingresar"}
							value={formData.criadero}
							handleChange={(e) =>
								handleFieldChange("criadero", e.target.value)
							}
						/>
					</div>
					<div className="w-full">
						<LabelFloating
							labelName={"Dueño"}
							idName={"duenio"}
							type={"text"}
							placeholder={"Ingresar"}
							value={formData.duenio}
							handleChange={(e) => handleFieldChange("duenio", e.target.value)}
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 mt-6">
					<div className="w-full flex items-center gap-4">
						<div className="w-full">
							<LabelFloating
								labelName={"Padre"}
								idName={"padre"}
								type={"text"}
								placeholder={"Ingresar"}
								value={formData.padre}
								handleChange={(e) => handleFieldChange("padre", e.target.value)}
							/>
						</div>
						<div className="w-full">
							<LabelFloating
								labelName={"Madre"}
								idName={"madre"}
								type={"text"}
								placeholder={"Ingresar"}
								value={formData.madre}
								handleChange={(e) => handleFieldChange("madre", e.target.value)}
							/>
						</div>
					</div>
					<div className="w-full flex items-center gap-4">
						<div className="w-full">
							<LabelFloating
								labelName={"Abuelo Materno"}
								idName={"abueloMaterno"}
								type={"text"}
								placeholder={"Ingresar"}
								value={formData.abueloMaterno}
								handleChange={(e) =>
									handleFieldChange("abueloMaterno", e.target.value)
								}
							/>
						</div>
						<div className="w-full">
							<LabelFloating
								labelName={"Abuelo Paterno"}
								idName={"abueloPaterno"}
								type={"text"}
								placeholder={"Ingresar"}
								value={formData.abueloPaterno}
								handleChange={(e) =>
									handleFieldChange("abueloPaterno", e.target.value)
								}
							/>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-4 mt-4">
					<div className="w-full">
						<LabelFloating
							labelName={"FEI #"}
							idName={"codFederacion"}
							type={"text"}
							placeholder={"Ingresar"}
							value={formData.codFederacion}
							handleChange={(e) =>
								handleFieldChange("codFederacion", e.target.value)
							}
						/>
					</div>
					<div className="w-full">
						<LabelFloating
							labelName={"Solicitud de creación de registro ACCDEC"}
							idName={"codRegisto"}
							type={"text"}
							placeholder={"Ingresar"}
							value={formData.codRegisto}
							handleChange={(e) =>
								handleFieldChange("codRegisto", e.target.value)
							}
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 mt-4">
					<div className="w-full">
						<LabelFloating
							labelName={"Año"}
							idName={"anio"}
							type={"text"}
							placeholder={"Ingresar"}
							value={formData.anio}
							handleChange={(e) => handleFieldChange("anio", e.target.value)}
						/>
					</div>
					<div className="w-full">
						<LabelFloating
							labelName={"Correo electrónico"}
							idName={"email"}
							type={"email"}
							placeholder={"Ingresar"}
							value={formData.email}
							handleChange={(e) => handleFieldChange("email", e.target.value)}
						/>
					</div>
				</div>
				{/* Botones */}
				<div className="flex gap-6 items-center justify-end mt-8 mb-4">
					<button
						className="px-6 py-1.5 border border-slate-300 text-gray-900 rounded-full inline-flex items-center"
						onClick={close}
					>
						<span className="text-lg">Cancelar</span>
					</button>
					<button
						type="submit"
						className="px-6 py-1.5 bg-[--primary-600] hover:bg-[--primary-700] text-white rounded-full inline-flex items-center"
					>
						<span className="text-lg">Editar</span>
					</button>
				</div>
			</form>
		</Modal>
	);
};
