import useSWR from "swr";

export const Page: React.FC = () => {
  const { isValidating, mutate, data, error } = useSWR("/api/shows");

  return (
    <>
      <p>Wow</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};
