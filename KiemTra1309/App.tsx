import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function App() {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Cam',
      price: 199,
    },
    {
      id: '2',
      name: 'Áo',
      price: 200,
    },
  ]);
  const [cart, setCart] = useState<any>([]);

  const addToCart = (product: Product) => {
    setCart((prev: any) => {
      const exist = prev.findIndex((item: any) => item.id === product.id);
      if (exist != -1) {
        const updateCart = [...prev];
        updateCart[exist].quantity += 1;
        return updateCart;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProduct = (id: string) => {
    setCart((prev: any) => {
      const updateCart = prev.map((item: any) => {
        if (item.id == id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updateCart.filter((item: any) => item.quantity > 0);
    });
  };

  const renderItem = (item: Product) => (
    <View style={styles.productItem}>
      <Text style={styles.textItem}>{item.name}</Text>
      <Text style={styles.textItem}>{item.price} đ</Text>
      <TouchableOpacity onPress={() => addToCart(item)}>
        Thêm vào giỏ
      </TouchableOpacity>
    </View>
  );

  const caculateTotal = () => {
    return cart.reduce((total : number, item : any) => total + item.price * item.quantity, 0);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Danh sách sản phẩm</Text>
      {products.map((item) => renderItem(item))}

      <Text style={styles.paragraph}>
        Giỏ hàng của tôi ({cart.length} sản phẩm)
      </Text>
      {cart.length > 0 && (
        <>
          {cart.map((item: any) => (
            <View style={styles.productItem}>
              <Text style={{ color: 'red' }}>{item.name}</Text>
              <Text style={{ color: 'red' }}>{item.quantity}</Text>
              <Text style={{ color: 'red' }}>{item.price}</Text>
              <TouchableOpacity onPress={() => removeProduct(item.id)}>
                Xóa khỏi giỏ hàng
              </TouchableOpacity>
            </View>
          ))}
          <Text style={{marginTop: 2, fontWeight: 600}}>Tổng tiền: {caculateTotal()} đ </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
  },
  paragraph: {
    margin: 18,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3c3c',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
  },
  textItem: {
    color: 'blue',
  },
});
