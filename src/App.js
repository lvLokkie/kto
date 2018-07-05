import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer, inject } from 'mobx-react';
import {
  Route,
  Switch,
  NavLink,
  withRouter,
} from 'react-router-dom';
import {
  Layout,
  AppBar,
  Navigation,
  Panel,
} from 'react-toolbox';

// app pages
import Home from 'Scenes/Home';
import HallEditor from 'Scenes/HallEditor';

/**
 * @author Ryazanov I.A
 * Application routing
 * TODO: remove devtools on prod
 */
@withRouter
@inject('appStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.appStore;
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate(e) {
    if (e) e.preventDefault();
    this.store.authenticate();
  }

  render() {
    return (
      <Layout className="cta-layout">
        <AppBar className="cta-appBar">
          <Navigation className="cta-nav" type="horizontal">
            <NavLink className="cta-navLink" to="/">Главная</NavLink>
            <NavLink className="cta-navLink" to="/hall-editor">Редактор зала</NavLink>
          </Navigation>
        </AppBar>
        <Panel className="cta-layout__panel">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/hall-editor" component={HallEditor} />
          </Switch>
        </Panel>
        <DevTools />
      </Layout>
    );
  }
}

