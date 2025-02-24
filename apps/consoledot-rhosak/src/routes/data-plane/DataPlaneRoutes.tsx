import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  AclsRoute,
  ConsumerGroupDeleteRoute,
  ConsumerGroupResetOffsetRoute,
  ConsumerGroupsRoute,
  ConsumerGroupViewPartitionRoute,
  DashboardRoute,
  SettingsRoute,
  TopicConsumerGroupDeleteRoute,
  TopicConsumerGroupResetOffsetRoute,
  TopicConsumerGroupsRoute,
  TopicConsumerGroupViewPartitionRoute,
  TopicDeleteRoute,
  TopicEditPropertiesRoute,
  TopicMessagesGroupsRoute,
  TopicPropertiesRoute,
  TopicSchemasRoute,
  TopicsRoute,
} from "./routes";

import { DataPlaneRoutePath, DataPlaneTopicRoutePath } from "./routesConsts";

const instanceDetailsHref = (id: string) =>
  `${ControlPlaneRouteRoot}/${id}/details`;

const instanceTopicsHref = (id: string) =>
  `${ControlPlaneRouteRoot}/${id}/details/topics`;

const topicHref = (id: string, topic: string) =>
  `${instanceDetailsHref(id)}/topics/${topic}/properties`;

const updateTopicHref = (id: string, topic: string) =>
  `${topicHref(id, topic)}/edit`;

const deleteTopicHref = (id: string, topic: string) =>
  `${topicHref(id, topic)}/delete`;

const instanceConsumerGroupsHref = (id: string) =>
  `${instanceDetailsHref(id)}/consumer-groups`;

const viewPartitionConsumerGroupHref = (id: string, consumerGroupId: string) =>
  `${instanceDetailsHref(
    id
  )}/consumer-groups/${consumerGroupId}/view-partition`;

const instanceTopicConsumerGroupHref = (id: string, topic: string) =>
  `${instanceDetailsHref(id)}/topics/${topic}/consumer-groups`;

const viewTopicPartitionConsumerGroupHref = (
  id: string,
  topic: string,
  consumerGroupId: string
) =>
  `${instanceDetailsHref(
    id
  )}/topics/${topic}/consumer-groups/${consumerGroupId}/view-partition`;

export const DataPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={DataPlaneRoutePath}>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Switch>
          <Route path={`${DataPlaneRoutePath}/dashboard`} exact>
            <DashboardRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/topics`} exact>
            <TopicsRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/consumer-groups`} exact>
            <ConsumerGroupsRoute
              instancesHref={ControlPlaneRouteRoot}
              instanceDetailsHref={instanceDetailsHref}
              instanceTopicsHref={instanceTopicsHref}
              instanceConsumerGroupsHref={instanceConsumerGroupsHref}
            />
          </Route>
          <Route path={`${DataPlaneRoutePath}/acls`} exact>
            <AclsRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/settings`} exact>
            <SettingsRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>
          <Route
            path={`${DataPlaneRoutePath}/topics`}
            render={({ match }) => (
              <RedirectOnGateError
                redirectUrl={instanceTopicsHref(match.params.id)}
              >
                <Switch>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                  >
                    <RedirectOnGateError
                      redirectUrl={instanceTopicsHref(match.params.id)}
                    >
                      <Switch>
                        <Route
                          path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition`}
                        >
                          <Route
                            path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition/delete`}
                          >
                            <TopicConsumerGroupDeleteRoute
                              instancesHref={ControlPlaneRouteRoot}
                              instanceTopicConsumerGroupsHref={
                                instanceTopicConsumerGroupHref
                              }
                              viewTopicPartitionConsumerGroupHref={
                                viewTopicPartitionConsumerGroupHref
                              }
                              instanceDetailsHref={instanceDetailsHref}
                              instanceTopicsHref={instanceTopicsHref}
                              instanceConsumerGroupsHref={
                                instanceConsumerGroupsHref
                              }
                            />
                          </Route>
                          <Route
                            path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                          >
                            <TopicConsumerGroupResetOffsetRoute
                              instancesHref={ControlPlaneRouteRoot}
                              instanceTopicConsumerGroupsHref={
                                instanceTopicConsumerGroupHref
                              }
                              viewTopicPartitionConsumerGroupHref={
                                viewTopicPartitionConsumerGroupHref
                              }
                              instanceDetailsHref={instanceDetailsHref}
                              instanceTopicsHref={instanceTopicsHref}
                              instanceConsumerGroupsHref={
                                instanceConsumerGroupsHref
                              }
                            />
                          </Route>
                          <TopicConsumerGroupViewPartitionRoute
                            instancesHref={ControlPlaneRouteRoot}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                            instanceConsumerGroupsHref={
                              instanceConsumerGroupsHref
                            }
                          />
                        </Route>
                        <Route
                          path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/reset-offset`}
                        >
                          <TopicConsumerGroupResetOffsetRoute
                            instancesHref={ControlPlaneRouteRoot}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                            instanceConsumerGroupsHref={
                              instanceConsumerGroupsHref
                            }
                          />
                        </Route>
                        <Route
                          path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/delete`}
                        >
                          <TopicConsumerGroupDeleteRoute
                            instancesHref={ControlPlaneRouteRoot}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                            instanceConsumerGroupsHref={
                              instanceConsumerGroupsHref
                            }
                          />
                        </Route>
                      </Switch>
                    </RedirectOnGateError>
                    <TopicConsumerGroupsRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/messages`}
                    exact
                  >
                    <TopicMessagesGroupsRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>

                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/properties/edit`}
                    exact
                  >
                    <TopicEditPropertiesRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/properties`}
                  >
                    <Route
                      path={`${DataPlaneRoutePath}/topics/:topicName/properties/delete`}
                    >
                      <TopicDeleteRoute
                        instancesHref={ControlPlaneRouteRoot}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceTopicsHref={instanceTopicsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        topicHref={topicHref}
                        updateTopicHref={updateTopicHref}
                        deleteTopicHref={deleteTopicHref}
                      />
                    </Route>
                    <TopicPropertiesRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      topicHref={topicHref}
                      updateTopicHref={updateTopicHref}
                      deleteTopicHref={deleteTopicHref}
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/schemas`}
                    exact
                  >
                    <TopicSchemasRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>
                  <Redirect
                    from={`${DataPlaneRoutePath}/topics/:topicName/`}
                    to={`${DataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                    exact
                  />
                </Switch>
              </RedirectOnGateError>
            )}
          />
          <Route
            path={`${DataPlaneRoutePath}/consumer-groups`}
            render={({ match }) => (
              <RedirectOnGateError
                redirectUrl={instanceConsumerGroupsHref(match.params.id)}
              >
                <Switch>
                  <Route
                    path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition`}
                  >
                    <Route
                      path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition/delete`}
                    >
                      <ConsumerGroupDeleteRoute
                        instancesHref={ControlPlaneRouteRoot}
                        instanceTopicsHref={instanceTopicsHref}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        viewPartitionConsumerGroupHref={
                          viewPartitionConsumerGroupHref
                        }
                      />
                    </Route>
                    <Route
                      path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                    >
                      <ConsumerGroupResetOffsetRoute
                        instancesHref={ControlPlaneRouteRoot}
                        instanceTopicsHref={instanceTopicsHref}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        viewPartitionConsumerGroupHref={
                          viewPartitionConsumerGroupHref
                        }
                      />
                    </Route>
                    <ConsumerGroupViewPartitionRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/reset-offset`}
                  >
                    <ConsumerGroupResetOffsetRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/delete`}
                  >
                    <ConsumerGroupDeleteRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                </Switch>
              </RedirectOnGateError>
            )}
          />
          <Redirect
            from={`${DataPlaneRoutePath}`}
            to={`${DataPlaneRoutePath}/dashboard`}
            exact
          />

          <Route>
            <InvalidObject />
          </Route>
        </Switch>
      </RedirectOnGateError>
    </Route>
  );
};
