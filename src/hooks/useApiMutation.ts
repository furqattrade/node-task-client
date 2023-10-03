import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { request } from "../services/api";

type QueryParams = Record<string, any>;

const useApiMutation = <Variables , Response, Error>(
	url: string,
	method: "post" | "get" | "put" | "patch" | "delete",
	options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {},
	params?: QueryParams
) =>
	useMutation<AxiosResponse<Response>, Error, Variables>(
		(variables) => {
			const response = request({ method, url, data: variables, params });
			return response;
		},
		{ ...options }
	);

export default useApiMutation;
