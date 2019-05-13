import React from 'react';
import {withRouter, Switch, HashRouter, BrowserRouter, Route, Redirect} from 'react-router-dom';
import App from '@/hooks/containers/App';
import routerConfig from '@/config/router.conf';
const RouterContainer = routerConfig.type == "hash" ? HashRouter : BrowserRouter;
const AppRouter = withRouter(App);

// import IndexPage from '@/hooks/containers/Index';
// import LoginPage from '@/hooks/containers/Login';
// import NotFoundPage from '@/hooks/containers/NotFoundPage';

import Loadable from 'react-loadable';
const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const IndexPage = Loadable({
    loader: () => import(/* webpackChunkName: "IndexPage" */'@/hooks/containers/Index'),
    loading: LoadingComponent
});

const LoginPage = Loadable({
    loader: () => import(/* webpackChunkName: "LoginPage" */'@/hooks/containers/Login'),
    loading: LoadingComponent
});
// const NotFoundPage = Loadable({
//   loader: () => import(/* webpackChunkName: "NotFoundPage" */'@/hooks/containers/NotFound'),
//   loading: LoadingComponent
// });

const ExamplePage = Loadable({
    loader: () => import(/* webpackChunkName: "ExamplePage" */'@/hooks/containers/Example'),
    loading: LoadingComponent
});

export  default (
    <RouterContainer>
      <Switch>
        <Route path="/admin">
          <Switch>
            <AppRouter>
              <Route exact path="/admin" component={IndexPage}></Route>
            </AppRouter>
          </Switch>
        </Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/example" component={ExamplePage}></Route>
        <Redirect to="/admin"></Redirect>
      </Switch>
    </RouterContainer>
);
