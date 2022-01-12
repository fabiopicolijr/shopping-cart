import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.amount * product.price;
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    // updateProductAmount({product.id, product.amount});
  }

  function handleProductDecrement(product: Product) {
    // TODO
  }

  function handleRemoveProduct(productId: number) {
    // TODO
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map((product) => (
            <tr key={product.id} data-testid="product{product.id}">
              <td>
                <img
                  src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg"
                  alt="Tênis de Caminhada Leve Confortável"
                />
              </td>
              <td>
                <strong>Tênis de Caminhada Leve Confortável</strong>
                <span>R$ 179,90</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product{product.id}"
                    // disabled={product.amount <= 1}
                    // onClick={() => handleProductDecrement()}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount{product.id}"
                    readOnly
                    value={2}
                  />
                  <button
                    type="button"
                    data-testid="increment-product{product.id}"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.priceFormatted}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product{product.id}"
                  // onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
