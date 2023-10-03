import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { request } from "../services/api";

type QueryParams = Record<string, any>;
const useGeneralAPIQuery = <Data=any, Error=any>(
	url: string,
	params: QueryParams  = {},
	options: UseQueryOptions<AxiosResponse<Data>, Error> = {}
) =>
	useQuery(
		[url],
		() => request.get<Data>(url, { params }),
		// @ts-ignore
		{
			...options,
		}
	);

export default useGeneralAPIQuery;
