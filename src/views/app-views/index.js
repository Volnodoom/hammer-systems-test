import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { AppRoute, APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={AppRoute.clients} component={lazy(() => import(`./clients-info`))} />
        <Route path={AppRoute.setting} component={lazy(() => import(`./setting`))} />
        <Route path={AppRoute.secondTask} component={lazy(() => import(`./second-task`))} />
        <Route path={AppRoute.summer} component={lazy(() => import(`./summer`))} />
        <Route path={AppRoute.tree} component={lazy(() => import(`./tree`))} />
        <Route path={AppRoute.flat} component={lazy(() => import(`./empty-blank`))} />
        <Route path={AppRoute.oneBedroom} component={lazy(() => import(`./empty-blank`))} />
        <Route path={AppRoute.twoBedroom} component={lazy(() => import(`./empty-blank`))} />
        <Route path={AppRoute.studio} component={lazy(() => import(`./empty-blank`))} />
        <Route path={AppRoute.townhouse} component={lazy(() => import(`./empty-blank`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={AppRoute.secondTask} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);