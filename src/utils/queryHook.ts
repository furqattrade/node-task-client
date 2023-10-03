import {  useLocation, useNavigate } from "react-router-dom";

type QueryParamsType = Record<string, string | undefined>;

interface QueryHookReturnType {
  QueryParams: QueryParamsType;
  AddQueryParams: (params: QueryParamsType) => void;
  MergeQueryParams: (params: QueryParamsType, replace?: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
  location: ReturnType<typeof useLocation>;
}

const QueryHook = (): QueryHookReturnType => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Get query parameters as an object
  const QueryParams: QueryParamsType = {};
  for (const [key, value] of searchParams.entries()) {
    QueryParams[key] = value;
  }

 

  // Add query parameters to the current URL
  const AddQueryParams = (params: QueryParamsType = {}): void => {
    const newSearchParams = new URLSearchParams(location.search);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        newSearchParams.set(key, params[key] || "");
      }
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  // Merge query parameters with existing ones and optionally replace the history state
  const MergeQueryParams = (params: QueryParamsType = {}, replace = false): void => {
    const mergedParams = { ...QueryParams, ...params };
    navigate(mergedParams, { replace });
  };

  return { QueryParams, AddQueryParams, MergeQueryParams, navigate, location };
};

export default QueryHook;