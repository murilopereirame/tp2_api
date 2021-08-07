import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
interface elemInterface {
  photo: string;
  title: string;
  category_name: string;
  price: number;
  total: number;
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
  const [cart, setCart] = useState<elemInterface[]>([]);
  const history = useHistory();
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
    let found = cart.find((elem) => elem.title === e.title);
    if (found) {
      let total = found.total;
      e.total = total + 1;

      let tempCart = [...cart];
      tempCart[cart.indexOf(found)] = e;
      setCart(tempCart);
    } else {
      e.total = 1;
      setCart((cart) => [...cart, e]);
    }
  };

  const removeOne = (index: number) => {
    let tempCart = [...cart];
    tempCart[index].total -= 1;
    if (tempCart[index].total <= 0) tempCart.splice(index, 1);

    setCart(tempCart);
  };

  useEffect(() => {
    getProducts().then((result) => {
      if (result) setProducts(result);
    });
  }, [productFilter]);

  return (
    <div className="hm-container">
      {cart.length > 0 ? (
        <div className="carrinho">
          <ul>
            {cart.map((elem: any, index) => {
              return (
                <li>
                  {elem.total}x {elem.title}
                  &nbsp;
                  <button
                    type="button"
                    onClick={() => {
                      removeOne(index);
                    }}
                  >
                    -
                  </button>
                </li>
              );
            })}
          </ul>
          {cart.length > 0 ? (
            <span>
              R$
              {cart
                .map((p: any) => p.price * p.total)
                .reduce((a: number, b: number) => a + b)
                .toFixed(2)}
            </span>
          ) : null}
          <div
            onClick={() => {
              history.push("/detalhes", {
                products: cart,
              });
            }}
            className="checkout"
          >
            <span>Fechar Pedido</span>
          </div>
        </div>
      ) : null}
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
        <div className="ft-container">
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
        </div>
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
