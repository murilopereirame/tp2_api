import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Client } from "../../interfaces/Client";
import { Purchase } from "../../interfaces/Purchase";
import { PurchasepProducts } from "../../interfaces/PurchaseProducts";
import "./styles.css";

const Details = () => {
  const [users, setUsers] = useState<Client[]>([]);
  const [products, setProducts] = useState<PurchasepProducts[]>([]);

  const loadUsers = useCallback(() => {
    axios.get("http://c5c11e4aa7aa.ngrok.io/users/").then((result) => {
      let users = result.data.map((elem: any) => {
        let usr = {
          name: elem.name,
          email: elem.email,
          cpf: elem.CPF,
          phone: elem.phone,
          address: {
            zip: elem.CEP,
            address: elem.address,
            city: elem.city,
          },
        };

        return usr;
      });

      setUsers(users);
    });
  }, []);

  const [cpf, setCPF] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCEP] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showFields, setShowFields] = useState(false);
  const [hasData, setHasData] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    let prods = [];
    for (let dt of (location.state as any).products as any[]) {
      prods.push({
        qtde: dt.total,
        product: {
          title: dt.title,
          category_name: dt.category_name,
          price: dt.price,
          photo: dt.photo,
        },
      });
    }
    setProducts(prods);
  }, []);

  const handleUser = useCallback(
    (cpf: string) => {
      let usr = users.find((elem) => elem.cpf === cpf);
      if (usr) {
        setName(usr.name);
        setCEP(usr.address.zip);
        setAddr(usr.address.address);
        setCity(usr.address.city);
        setPhone(usr.phone);
        setHasData(true);
        setShowFields(true);
      } else {
        setShowFields(true);
      }

      console.log(name);
    },
    [users]
  );

  const resetFields = useCallback(() => {
    setName("");
    setCEP("");
    setAddr("");
    setCity("");
    setPhone("");
    setHasData(false);
    setShowFields(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = useCallback(() => {
    if (hasData) {
      history.push("/confirmacao", {
        client: {
          cpf,
          name,
          phone,
          address: {
            zip: cep,
            city,
            address: addr,
          },
        },
        products: products,
      } as Purchase);
    } else {
      axios
        .post("http://f7263ae9dd8f.ngrok.io/users/", {
          name,
          email,
          password,
          CPF: cpf,
          CEP: cep,
          city,
          phone,
          address: addr,
        })
        .then((result) => {
          history.push("/confirmacao", {
            client: {
              cpf,
              name,
              phone,
              address: {
                zip: cep,
                city,
                address: addr,
              },
            },
            products: products,
          } as Purchase);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [name, email, password, cpf, cep, city, phone, addr, products]);

  return (
    <div className="cft-container">
      <div className="cft-wrapper">
        <div className="cft-products">
          <p>Produtos:</p>
          <ul>
            {products.map((elem, index) => {
              return (
                <li key={elem.product.title}>
                  {elem.qtde}x {elem.product.title}
                </li>
              );
            })}
          </ul>
          {products.length > 0 ? (
            <span>
              Total:{" "}
              {products
                .map((p: any) => p.product.price * p.qtde)
                .reduce((a: number, b: number) => a + b)
                .toFixed(2)}
            </span>
          ) : null}
        </div>
        <div className="cft-shipping">
          <p>Informações de Entrega:</p>
          <div className="cft-address">
            <div className="cft-input">
              <label>CPF:</label>
              <input
                type="text"
                value={cpf}
                maxLength={11}
                onChange={(evt) => {
                  if (evt.target.value.length === 11)
                    handleUser(evt.target.value);
                  else if (showFields) resetFields();
                  setCPF(evt.target.value);
                }}
              />
            </div>
            {showFields ? (
              <div className="cft-hidden">
                <div className="cft-input">
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(evt) => {
                      setName(evt.target.value);
                    }}
                  />
                </div>
                <div className="cft-input">
                  <label>Telefone:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(evt) => {
                      setPhone(evt.target.value);
                    }}
                  />
                </div>
                <div className="cft-input">
                  <label>CEP:</label>
                  <input
                    type="text"
                    value={cep}
                    onChange={(evt) => {
                      setCEP(evt.target.value);
                    }}
                  />
                </div>
                <div className="cft-input">
                  <label>Endereço:</label>
                  <input
                    type="text"
                    value={addr}
                    onChange={(evt) => {
                      setAddr(evt.target.value);
                    }}
                  />
                </div>
                <div className="cft-input">
                  <label>Cidade:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(evt) => {
                      setCity(evt.target.value);
                    }}
                  />
                </div>
                {!hasData ? (
                  <>
                    <div className="cft-input">
                      <label>Email:</label>
                      <input
                        type="text"
                        value={email}
                        onChange={(evt) => {
                          setEmail(evt.target.value);
                        }}
                      />
                    </div>
                    <div className="cft-input">
                      <label>Senha:</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(evt) => {
                          setPassword(evt.target.value);
                        }}
                      />
                    </div>
                  </>
                ) : null}
                <div
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="cft-button"
                >
                  <span>Continuar</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
