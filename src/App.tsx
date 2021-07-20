import React, { useState } from 'react';


import './App.css';
import { Button, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import CakeList from './components/cake-list/cake-list';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import NewCake from './components/new-cake/new-cake';
import { UpdateCakeContext } from './context/cake.context';
import { ICakeInterface } from './interfaces/cake.interface';
import UpdateCake from './components/update-cake/update-cake';

function App() {
  const [cakeToUpdate, setCakeToUpdate] = useState<ICakeInterface | null>(null);
  return (
    <UpdateCakeContext.Provider value={{ cakeToUpdate, setCakeToUpdate }}>
      <Layout className="app-layout">
        <Header className="app-header">
          <NavLink to="/"><span className="logo">Cake Inventory</span></NavLink>
          <NavLink to="/add-new-cake"><Button type="primary">Add new cake</Button></NavLink>
        </Header>
        <Content className="app-content">
          <Switch>
            <Route path="/" exact component={CakeList} />
            <Route path="/add-new-cake" component={NewCake} />
            <Route path="/update-cake" component={UpdateCake} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer className="app-footer"><i>&copy; Subhash Walunj</i></Footer>
      </Layout>
    </UpdateCakeContext.Provider>
  );
}

export default App;
