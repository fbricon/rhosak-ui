import { useMessagesFetchQuery } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { KafkaMessageBrowserProps } from "ui";
import { KafkaMessageBrowser } from "ui";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicMessagesGroupsRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instancesHref }) => {
  const { instance, topic } = useTopicGate(instancesHref, instanceDetailsHref);
  const kafkaTopicMessagesFetchQuery = useMessagesFetchQuery();

  const getMessages = useCallback<KafkaMessageBrowserProps["getMessages"]>(
    async (params) => {
      const messages = await kafkaTopicMessagesFetchQuery({
        ...params,
        id: instance.id,
        adminUrl: instance.adminUrl!,
        topicName: topic.name,
      });
      return {
        messages,
        partitions: topic.partitionsCount,
      };
    },
    [
      instance.adminUrl,
      instance.id,
      kafkaTopicMessagesFetchQuery,
      topic.name,
      topic.partitionsCount,
    ]
  );

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        activeSection={"messages"}
      />
      <KafkaMessageBrowser getMessages={getMessages} />
    </>
  );
};
