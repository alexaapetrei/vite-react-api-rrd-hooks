import { useFetchData } from "../hooks/useFetchData";

const BoardAdmin = () => {
  const { data, loading, error } = useFetchData("test/mod");

  if (loading) return <>Loading</>;
  if (error) return <> Shit went down -- {error}</>;
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{data}</h3>
      </header>
    </div>
  );
};

export default BoardAdmin;
