import React from "react";
import { useFetchData } from "../hooks/useFetchData";

type InventoryItem = {
  id: number;
  productName: string;
  description: string;
  quantity: number;
  priceOfAcquisition: number;
  dateAdded: string;
  dateUpdated: string;
};

const BoardAdmin: React.FC = () => {
  const { data, loading, error } = useFetchData("inventory/items");

  if (loading) return <>Loading</>;
  if (error) return <> Shit went down -- {error}</>;
  if (!data) return <>Fucccc no data</>;

  const inventory = data as InventoryItem[];
  return (
    <div className="container">
      <h2 className="text-center">Inventory Items</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date Added</th>
              <th>Date Updated</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.priceOfAcquisition}</td>
                  <td>{item.dateAdded}</td>
                  <td>{item.dateUpdated}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No items in inventory.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardAdmin;
