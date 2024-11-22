import Image from "next/image";
import { MdOutlineUpdate } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LabelFloating from "../../commons/LabelFloating";

const FormResetPwd = () => {
	return (
		<form
			// onSubmit={submit}
			className="flex items-center justify-center flex-col h-full bg-white px-10"
		>
			<Image
				src={"/imgs/logos/ACCDEC-logo.png"}
				alt="ACCDEC Logo"
				width={125}
				height={50}
				priority={true}
			/>
			<div className="w-full text-left">
				<h2 className="font-bold text-xl">Actualiza Tu Contraseña</h2>
				<p className="text-gray-500 pt-1 text-sm">
					Ingresa tu correo electrónico para continuar.
				</p>
			</div>

			<div className="w-full mt-4">
				<LabelFloating
					labelName="Correo Electrónico:"
					idName="email"
					type={"email"}
					placeholder={"example@example.com"}
					required
					// disabled={}
					// value=""
					// handleChange={}
				/>

				<button
					type="submit"
					className="mt-4 text-white focus:ring-2 focus:outline-none font-medium rounded text-sm w-full px-5 py-2.5 bg-[--primary-600] hover:bg-[--primary-700] flex items-center justify-center"
					// disabled={isLoading}
				>
					{/* {isLoading ? (
						<>
							<AiOutlineLoading3Quarters className="animate-spin text-white text-xl mr-3" />
						<span>Actualizando Contraseña...</span>
						</>
					) : ( */}
					{/* <> */}
					<MdOutlineUpdate className="text-white w-6 h-6 mr-1" />
					<span>Actualizar Contraseña</span>
					{/* </>
					)} */}
				</button>
			</div>
		</form>
	);
};

export default FormResetPwd;
