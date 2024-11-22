import Image from "next/image";
import { TiArrowRight } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LabelFloating from "../../commons/LabelFloating";

const FormLogin = ({
	email,
	setEmail,
	password,
	setPassword,
	isLoading,
	submit,
}) => {
	return (
		<form
			className="flex items-center justify-center flex-col h-full bg-white px-10"
			onSubmit={submit}
		>
			<Image
				src={"/imgs/logos/ACCDEC-logo.png"}
				alt="ACCDEC Logo"
				width={125}
				height={50}
				priority={true}
			/>

			<div className="w-full text-left">
				<h2 className="font-bold text-2xl">¡Bienvenido!</h2>
				<p className="text-gray-500 pt-1 text-sm">
					Inicia sesión en tu cuenta para continuar.
				</p>
			</div>

			<div className="w-full mt-4 space-y-3">
				<LabelFloating
					labelName="Correo Electrónico:"
					idName="email"
					type={"email"}
					placeholder={"example@example.com"}
					required
					// disabled={}
					value={email}
					handleChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<LabelFloating
					labelName="Contraseña"
					idName="password"
					type={"password"}
					placeholder={"********"}
					required
					// disabled={}
					value={password}
					handleChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<button
					type="submit"
					className="mt-4 text-white focus:ring-2 focus:outline-none font-medium rounded text-sm w-full px-5 py-2.5 bg-[--primary-600] hover:bg-[--primary-700] flex items-center justify-center"
					// disabled={isLoading}
				>
					{/* {isLoading ? (
						<>
							<AiOutlineLoading3Quarters className="animate-spin text-white text-xl mr-3" />
							<span>Iniciando Sesión...</span>
						</>
					) : ( */}
					{/* <> */}
					<span>Iniciar Sesión</span>
					<TiArrowRight className="text-white w-6 h-6" />
					{/* </>
					)} */}
				</button>
			</div>
		</form>
	);
};

export default FormLogin;
