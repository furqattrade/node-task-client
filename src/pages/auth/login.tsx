import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../components/form/input";
import { useState } from "react";
import { useContext } from "react";
import QueryHook from "../../utils/queryHook";
import useApiMutation from "../../hooks/useApiMutation";
import Button from "../../components/Button";
import { AxiosResponse } from "axios";
import GeneralInfoContext from "../../context/GeneralnfoContext";
interface FormData {
	email: string;
	password: string;
}

export const Login: React.FC = () => {
	const { navigate, QueryParams, AddQueryParams, MergeQueryParams } =
		QueryHook();
	const [general, setGeneral] = useContext<any>(GeneralInfoContext);
	const { page } = QueryParams;
	const [isRegisterPage, setIsRegisterPage] = useState<boolean>(
		Boolean(page === "register")
	);
	const { control, handleSubmit, formState } = useForm<FormData>({
		mode: "onChange",
		defaultValues: {
			email: undefined,
			password: undefined,
		},
	});

	const { errors } = formState;

	//Mutations
	const loginMutation = useApiMutation("/auth/login", "post");
	const registerMutation = useApiMutation("/auth/register", "post");

	//functions
	const onSubmit = (data: FormData) => {
		if (isRegisterPage) {
			registerMutation.mutate(data, {
				onSuccess: (data: AxiosResponse) => {
					if (data?.status === 201) {
						localStorage.setItem("token", data.data?.token);
						setGeneral({ ...general, user: data?.data?.user });
						navigate("/tasks");
					}
				},
				onError: () => {
					toast.error("Something went wrong");
				},
			});
		} else {
			loginMutation.mutate(data, {
				onSuccess: (data: AxiosResponse) => {
					if (data?.status === 200) {
						localStorage.setItem("token", data.data?.token);
						setGeneral({ ...general, user: data?.data?.user });
						navigate("/tasks");
					}
				},
				onError: () => {
					toast.error("Something went wrong");
				},
			});
		}
	};
	const switchToRegisterPage = () => {
		if (page === "register") {
			MergeQueryParams({ page: undefined });
			setIsRegisterPage(false);
		} else {
			AddQueryParams({ page: "register" });
			setIsRegisterPage(true);
		}
	};
	return (
		<>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							{isRegisterPage ? "Registration" : "Sign in to your account"}
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<Controller
									name="email"
									control={control}
									rules={{ required: "It is required field!" }}
									render={({ field }) => (
										<Input
											{...field}
											errorMessage={errors.email?.message}
											label="Your email"
											placeholder="name@gmail.com"
											type="email"
										/>
									)}
								/>
							</div>
							<div>
								<Controller
									name="password"
									control={control}
									rules={{ required: "It is required field!" }}
									render={({ field }) => (
										<Input
											{...field}
											errorMessage={errors.password?.message}
											label="Password"
											placeholder="••••••••"
											type="password"
										/>
									)}
								/>
							</div>
							<Button
								type="submit"
								disabled={
									isRegisterPage
										? registerMutation.isLoading
										: loginMutation.isLoading
								}
							>
								{isRegisterPage ? "Sign up" : "Sign in"}
							</Button>
							{!isRegisterPage && (
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<span
										onClick={switchToRegisterPage}
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Sign up
									</span>
								</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
