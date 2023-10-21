import { useFetchData } from "../hooks/useFetchData";

const BoardUser = () => {
  const { data, loading, error } = useFetchData("test/user");

  if (loading) return <>Loading...</>;
  if (error) return <> Shit went down -- {error}</>;
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{data}</h3>
      </header>
    </div>
  );
};

export default BoardUser;
