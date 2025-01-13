import React from 'react';
import Header from "./header";
import Content from "../pages/menu";
import Footer from './footer';
import { Layout } from 'antd';
import Router from "../router";



export default function index() {
    return (
        <Layout>
            <Header />
            <Router />
            <Footer />
        </Layout>
    )
}
