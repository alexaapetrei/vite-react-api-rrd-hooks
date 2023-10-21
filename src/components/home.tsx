import { useFetchData } from "../hooks/useFetchData";

function Home() {
  const { data, loading, error } = useFetchData("test/all");

  if (loading) return <>Loading</>;
  if (error) return <> Shit went down -- {error}</>;
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{data}</h3>
      </header>
    </div>
  );
}

export default Home;
