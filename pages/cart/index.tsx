import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/cart.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../layout/header';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts?userId=${cookies.id}`
  );
  const carts = await res.json();

  return {
    props: { carts },
  };
};

const data = {};

const Cart = ({ carts }: any) => {
  const router = useRouter();

  // 削除
  function deleteItem(cart: any) {
    fetch(`${process.env.NEXT_PUBLIC_PROTEIN}/api/carts/${cart.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.reload();
  }

  // 小計・合計
  const priceArray: any[] = [];

  carts.forEach((element: any) => {
    const multiPrice = element.price * element.countity;
    priceArray.push(multiPrice);
  });

  const initialValue = 0;
  const sumPrice = priceArray.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValue
  );

  const routerHandler = () => {
    if (carts[0]) {
      router.push('/purchase');
    } else {
      alert('商品一覧から商品を選んでカートに入れてください');
      router.push('/items');
    }
  };

  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <div className={styles.item_list}>
        <h4 className={styles.cart_title}>カート</h4>
        <section className={styles.cart_content}>
          {carts.map((cart: any) => (
            <div key={cart.id} className={styles.cart_content2}>
              <Image
                className={styles.cart_img}
                src={cart.imageUrl}
                alt="商品画像"
                width={260}
                height={260}
              />
              <div className={styles.text_content}>
                <p>{cart.name}</p>
                <p>
                  <span className={styles.quantity}>数量</span>
                  {cart.countity}個
                </p>
                <p>
                  <span>価格(税込)</span>¥
                  {(cart.price * cart.countity).toLocaleString()}
                </p>
                <button className={styles.delete_button} onClick={() => deleteItem(cart)}>削除</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section>
        <div className={styles.cart_total}>
          <p>合計金額:</p>
          <p className={styles.total}>
            ¥&ensp;{sumPrice.toLocaleString()}
          </p>
        </div>
        <div className={styles.buttons}>
          <Link href="/items">
            <button className={styles.shopping}>
              買い物を続ける
            </button>
          </Link>
          {/* <Link href="/purchase"> */}
          <button className={styles.purchase} onClick={routerHandler}>購入する</button>
          {/* </Link> */}
        </div>
      </section>
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
};

export default Cart;
