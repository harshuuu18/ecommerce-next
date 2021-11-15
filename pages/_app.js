import '../styles/globals.css'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress';
import Router from 'next/router'
import Layout from '../components/Layout';
import { useEffect } from 'react';

Router.events.on('routeChangeStart',()=>nProgress.start())
Router.events.on('routeChangeComplete',()=>nProgress.done())
Router.events.on('routeChangeError',()=>nProgress.done())


function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    if(!localStorage.getItem('items')){
      localStorage.setItem('items',JSON.stringify([]))
    }
  },[])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
