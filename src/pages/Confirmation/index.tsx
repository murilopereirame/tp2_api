import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Purchase } from "../../interfaces/Purchase";
import "./styles.css";

const Confirmation = () => {
  const location = useLocation();
  const [purchase, setPurhchase] = useState<Purchase>();
  const [purchaseNumber, setPurhcaseNumber] = useState(0);

  useEffect(() => {
    setPurhchase(location.state as Purchase);
    const rand = 1000 + Math.random() * (98748 - 1000);
    setPurhcaseNumber(Math.floor(rand));
  }, []);

  return (
    <div className="cft-container">
      <p>Compra #{purchaseNumber}</p>
      <div className="cft-wrapper">
        <div className="cft-products">
          <p>Produtos:</p>
          {purchase ? (
            <ul>
              {purchase?.products.map((elem, index) => {
                return (
                  <li key={elem.product.title}>
                    {elem.qtde}x {elem.product.title}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {purchase && purchase.products.length > 0 ? (
            <span>
              Total:{" "}
              {purchase?.products
                .map((p: any) => p.product.price * p.qtde)
                .reduce((a: number, b: number) => a + b)
                .toFixed(2)}
            </span>
          ) : null}
        </div>
        <div className="cft-shipping">
          <p>Informações de Entrega:</p>
          <div className="cft-address">
            <span>{purchase?.client.name}</span>
            <div className="cft-time">
              <span>Estimativa de entrega:</span>
              <span> 1 a 2 dias úteis</span>
            </div>
            <span>
              {purchase?.client.address.address}, {purchase?.client.address.zip}{" "}
              - {purchase?.client.address.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
