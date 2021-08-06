import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

interface elemInterface {
  photo: string;
  title: string;
  category_name: string;
  price: number;
}

const Home = () => {
  const getProducts = async () => {
    const res = await axios.get("http://f7263ae9dd8f.ngrok.io/products");
    return res.data;
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result);
    });
  }, []);

  return (
    <div className="hm-container">
      <div className="navbar">
        <h2>Supermercado do Bosque</h2>
      </div>
      <div className="filter">
        <p>Deseja filtrar sua busca?</p>
        <button onClick={() => {}}>Todos</button>
        <button onClick={() => {}}>Higiene</button>
        <button onClick={() => {}}>Hortifruti</button>
        <button onClick={() => {}}>Pets</button>
        <button onClick={() => {}}>Bebidas</button>
        <button onClick={() => {}}>Congelados</button>
      </div>
      <span>Produtos por categoria:</span>
      <div className="productsContainer">
        <div className="products">
          {products.map((elem: elemInterface, index) => {
            return (
              <div className="product">
                <img src={elem.photo} alt={elem.title} />
                <p>{elem.title}</p>
                <p>{elem.category_name}</p>
                <span>{elem.price}</span>
                <button onClick={() => {}}>+</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
