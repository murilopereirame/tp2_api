import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import cartSVG from "../../assets/img/cart.svg";
interface elemInterface {
  photo: string;
  title: string;
  category_name: string;
  price: number;
}

interface filterInterface {
  op: string;
  value: string;
  order: string;
  cat: string | undefined;
}

const Home = () => {
  const endpoint = "http://c5c11e4aa7aa.ngrok.io";
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([{}]);
  const [productFilter, setProductFilter] = useState<filterInterface>({
    op: "",
    value: "",
    order: "",
    cat: "",
  });

  const getProducts = async () => {
    let url = `${endpoint}/products/?`;
    let first = false;
    if (productFilter.op !== "") {
      if (first === false) first = true;
      else url = `${url}&`;
      url = `${url}op=${productFilter.op}`;
    }
    if (productFilter.value !== "") {
      if (first === false) first = true;
      else url = `${url}&`;
      url = `${url}value=${productFilter.value}`;
    }
    if (productFilter.order !== "") {
      if (first === false) first = true;
      else url = `${url}&`;
      url = `${url}order=${productFilter.order}`;
    }
    if (productFilter.cat !== "") {
      if (first === false) first = true;
      else url = `${url}&`;
      url = `${url}cat=${productFilter.cat}`;
    }
    const res = await axios.get(url);
    return res.data;
  };

  const addToCArt = (e: elemInterface) => {
    setCart((cart) => [...cart, e]);
  };

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result);
    });
  }, [productFilter]);

  return (
    <div className="hm-container">
      <div className="navbar">
        <h2>Supermercado do Bosque</h2>
      </div>
      <div className="filter">
        <p>Deseja filtrar sua busca?</p>
        <button
          onClick={() => {
            setProductFilter((old) => {
              return { ...old, cat: "" };
            });
          }}
        >
          Todos
        </button>
        <button
          onClick={() => {
            setProductFilter((old) => {
              return { ...old, cat: "1" };
            });
          }}
        >
          Higiene
        </button>
        <button
          onClick={() => {
            setProductFilter((old) => {
              return { ...old, cat: "2" };
            });
          }}
        >
          Hortifruti
        </button>
        <button
          onClick={() => {
            setProductFilter((old) => {
              return { ...old, cat: "3" };
            });
          }}
        >
          Pets
        </button>
        <button
          onClick={() => {
            setProductFilter((old) => {
              return { ...old, cat: "4" };
            });
          }}
        >
          Bebidas
        </button>
        <button
          onClick={() => {
            setProductFilter((old) => {
              return { ...old, cat: "5" };
            });
          }}
        >
          Congelados
        </button>
        <span>Preço:</span>
        <input
          type="text"
          onChange={(evt) => {
            setProductFilter((old) => {
              return { ...old, value: evt.target.value };
            });
          }}
        />
        <select
          onChange={(evt) => {
            setProductFilter((old) => {
              return { ...old, order: evt.target.value };
            });
          }}
        >
          <option value="ASC">Crescente</option>
          <option value="DESC">Decrescente</option>
        </select>
        <select
          onChange={(evt) => {
            setProductFilter((old) => {
              return { ...old, op: evt.target.value };
            });
          }}
        >
          <option value="GT">Maior</option>
          <option value="LT">Menor</option>
        </select>
        <img
          src={cartSVG}
          alt="cart"
          onClick={() => {
            console.log(cart);
          }}
        />
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
                <button onClick={() => addToCArt(elem)}>+</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
