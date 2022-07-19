export const routeApiShows = (ids: string[]) => {
  const url = new URL(
    "/api/shows",
    import.meta.env.VITE_ENABLE_MSW === "true"
      ? import.meta.url
      : import.meta.env.VITE_API_ENDPOINT,
  );
  url.searchParams.append("users", ids.join(","));
  return url.toString();
};
