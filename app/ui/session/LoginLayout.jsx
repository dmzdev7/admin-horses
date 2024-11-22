"use client";
import { useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import FormLogin from "./login/FormLogin";
import FormResetPwd from "./FormRecovery/FormResetPwd";
import { signIn } from "next-auth/react";

const LoginLayout = () => {
	const [isSignUpActive, setIsSignUpActive] = useState(false);
	const [emailLogin, setEmailLogin] = useState("");
	// const [emailUpdate, setEmailUpdate] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleUpdateClick = () => {
		setIsSignUpActive(true);
	};

	const handleLoginClick = () => {
		setIsSignUpActive(false);
	};

	const validateFields = () => {
		// if (isSignUpActive && !emailUpdate) {
		// 	// Validar emailUpdate si estamos en el formulario de recuperación
		// 	notification.error({
		// 		message: "El campo de correo electrónico está vacío.",
		// 	});
		// 	return false;
		// }
		if (!emailLogin && !isSignUpActive) {
			// Validar emailLogin en el formulario de inicio de sesión
			notification.error({
				message: "El campo de correo electrónico está vacío.",
			});
			return false;
		}
		if (!password && !isSignUpActive) {
			notification.error({ message: "El campo de contraseña está vacío." });
			return false;
		}
		// Validar formato de email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// if (isSignUpActive && !emailRegex.test(emailUpdate)) {
		// 	// Validar formato de emailUpdate si estamos en el formulario de recuperación
		// 	notification.error({
		// 		message: "El formato del correo electrónico es inválido.",
		// 	});
		// 	return false;
		// }
		if (!isSignUpActive && !emailRegex.test(emailLogin)) {
			// Validar formato de emailLogin en el formulario de inicio de sesión
			notification.error({
				message: "El formato del correo electrónico es inválido.",
			});
			return false;
		}
		return true;
	};

	const submitLogin = async (e) => {
		e.preventDefault();
		if (!validateFields()) return;

		const result = await signIn("credentials", {
			redirect: false,
			usuario: emailLogin,
			password,
		});

		// console.log(result, "res-login-layout");

		if (result?.status === 200) {
			notification.success({ message: "Inicio de sesión exitoso." });
			router.push("/dashboard");
		} else {
			notification.error({ message: result.error });
		}
	};

	return (
		<div
			className={`container-login bg-white rounded-3xl relative overflow-hidden max-w-full ${
				isSignUpActive ? "active" : ""
			}`}
		>
			{/* Formulario de actualización de contraseña */}
			<div className="form-container-login absolute top-0 h-full sign-up left-0 w-1/2 opacity-0 z-[1]">
				<FormResetPwd
				// isLoading={loading}
				// email={emailUpdate}
				// setEmail={setEmailUpdate}
				// submit={submitUpdate}
				/>
			</div>

			{/* Formulario de inicio de sesión */}
			<div className="form-container-login absolute top-0 h-full sign-in left-0 w-1/2 z-[2]">
				<FormLogin
					email={emailLogin}
					setEmail={setEmailLogin}
					password={password}
					setPassword={setPassword}
					submit={submitLogin}
				/>
			</div>

			{/* Toggle para cambiar entre Sign In y Sign Up */}
			<div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[1000]">
				<div className="toggle relative h-full text-white bg-[--primary-500] bg-gradient-to-r from-[--primary-600] to-[--primary-700] transform translate-x-0 transition-all duration-600 ease-in-out">
					{/* Panel izquierdo para Sign In */}
					<div
						className={`toggle-panel absolute w-1/2 h-full flex items-center flex-col justify-center px-7 text-center top-0 toggle-left ${
							isSignUpActive ? "translate-x-0" : "translate-x-full"
						}`}
					>
						<h3 className="text-xl font-bold">¿Ya tienes una cuenta?</h3>
						<p className="text-sm py-2">Inicia sesión para acceder al sitio.</p>
						<button
							className={`mt-4 py-2 px-6 rounded font-semibold bg-[--primary-800] ${
								isSignUpActive ? "opacity-100" : "opacity-0"
							}`}
							onClick={handleLoginClick}
						>
							Iniciar Sesión
						</button>
					</div>
					{/* Panel derecho para Sign Up */}
					<div
						className={`toggle-panel absolute w-1/2 h-full flex items-center flex-col justify-center px-7 text-center top-0 right-0 toggle-right ${
							isSignUpActive ? "-translate-x-full" : "translate-x-0"
						}`}
					>
						<h3 className="text-xl font-bold">¿Olvidaste tu contraseña?</h3>
						<p className="text-sm py-2">
							Tranquilo, ¡haz clic aquí para actualizarla!
						</p>
						<button
							className={`mt-4 py-2 px-6 rounded font-semibold bg-[--primary-800] ${
								isSignUpActive ? "opacity-0" : "opacity-100"
							}`}
							onClick={handleUpdateClick}
						>
							Actualizar Contraseña
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginLayout;
