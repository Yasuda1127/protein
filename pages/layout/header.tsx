import Link from 'next/link';
import style from './header.module.css';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import React from 'react';

// const logOut = () => {
//   if (document.cookie !== '') {
//     var date = new Date('1999-12-31T23:59:59Z');
//     document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
//     alert('ログアウトしました');
//   }
//    else {
//     alert('ログインをしてください');
//   }
// };

const logOut = () => {
  if(document.cookie == ''){
   alert('ログインをしてください');
   router.push('/login');
  }else if(document.cookie.includes(`; id=`)){
   var date = new Date('1999-12-31T23:59:59Z');
   document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
   alert('ログアウトしました');
 }else if(document.cookie.includes('; __stripe_mid=')){
    var date = new Date('1999-12-31T23:59:59Z');
    document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
    alert('ログアウトしました');
  }else if(document.cookie.includes('__stripe_sid=')){
     alert('ログインをしてください');
     router.push('/login');
   }else if (document.cookie !== '') {
     var date = new Date('1999-12-31T23:59:59Z');
     document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
     alert('ログアウトしました');
   } else {
     alert('ログインをしてください');
     router.push('/login');
   }
  };

export default function Header() {
  const router = useRouter();

  const moveToCart = () => {
    router.push('/cart');
  };

  // const moveToFavorite = () => {
  //   if (document.cookie !== '' || '__stripe_mid=8d42a2c4-e701-4fb0-9f37-f5882dfcd61905a3a1' || '__stripe_sid=c618b71e-eb7a-46d5-9cf3-13bff7196043a017ec') {
  //     router.push('/users/favorite');
  //   }
  //   else {
  //     alert('ログインをしてください');
  //     router.push('/login');
  //   }
  // };

  const moveToFavorite = () => {
    if (document.cookie == '') {
      alert('ログインをしてください');
      router.push('/login');
    } else if(document.cookie.includes(`; id=`)){
      router.push('/users/favorite');
    }else if(document.cookie.includes('; __stripe_mid=')){
      router.push('/users/favorite');
    }else if(document.cookie.includes('__stripe_sid=')){
      alert('ログインをしてください');
      router.push('/login');
    } else if (document.cookie !== '') {
      router.push('/users/favorite');
    }else {
      alert('ログインをしてください');
      router.push('/login');
    }
}

  // const moveToUsers = () => {
  //   if (document.cookie !== '') {
  //     router.push('/users');
  //   } else {
  //     alert('ログインをしてください');
  //     router.push('/login');
  //   }
  // };

  const moveToUsers = () => {
    if (document.cookie == '') {
      alert('ログインをしてください');
      router.push('/login');
    }else if(document.cookie.includes(`; id=`)){
      router.push('/users');
    }else if(document.cookie.includes('; __stripe_mid=')){
      router.push('/users');
    } else if(document.cookie.includes('__stripe_sid=')){
      alert('ログインをしてください');
      router.push('/login');
    } else if (document.cookie !== '') {
      router.push('/users');
    }
  };

  return (
    <div className={style.all}>
      <div className={style.logo}>
        <Link href="/items">
          <Image
            priority
            src="/images/rakutein.jpg"
            width={140}
            height={90}
            alt="logout"
          />
        </Link>
      </div>

      <div className={style.iconlist}>
        <div className={style.icon} onClick={moveToFavorite}>
          <Image
            priority
            src="/images/fav.jpg"
            width={45}
            height={45}
            alt="favorite"
            className={style.iconHover}
          />
        </div>
        <div className={style.icon} onClick={moveToCart}>
          <Image
            priority
            src="/images/cart.jpg"
            width={45}
            height={45}
            alt="cart"
          />
        </div>
        <div className={style.icon} onClick={moveToUsers}>
          <Image
            priority
            src="/images/human.jpg"
            width={45}
            height={45}
            alt="user"
          />
        </div>
        <div className={style.icon} onClick={logOut}>
          <Link href="/login">
            <Image
              priority
              src="/images/logout.jpg"
              width={45}
              height={45}
              alt="logout"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
