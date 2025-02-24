import {
  ActionGroup,
  Button,
  Divider,
  Form,
  PageGroup,
  PageSection,
  Sidebar,
  SidebarContent,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";
import { useState } from "react";
import type { Topic } from "ui-models/src/models/topic";
import { Cleanup } from "./Cleanup";
import { CoreConfiguration } from "./CoreConfiguration";
import { Flush } from "./Flush";
import { Log } from "./Log";
import { Message } from "./Message";
import { Replication } from "./Replication";
import { TopicAdvanceIndex } from "./TopicAdvanceIndex";
import { TopicAdvanceJumpLinks } from "./TopicAdvanceJumpLinks";

export type TopicAdvancePageProps = {
  isCreate: boolean;
  onConfirm: () => void;
  handleCancel?: () => void;
  topicData: Topic;
  setTopicData: (val: Topic) => void;
  checkTopicName: (value: string) => Promise<boolean>;
  availablePartitionLimit: number;
};

export const TopicAdvancePage: React.FunctionComponent<
  TopicAdvancePageProps
> = ({
  isCreate,
  onConfirm,
  handleCancel,
  topicData,
  setTopicData,
  checkTopicName,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);
  const actionText = isCreate ? t("create_topic") : t("common:save");

  //states

  const [topicValidated, setTopicValidated] = useState<ValidatedOptions>(
    ValidatedOptions.default
  );
  const [invalidText, setInvalidText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const onValidateTopic = () => {
    if (topicData?.name.length < 1) {
      setInvalidText(t("common:required"));
      setTopicValidated(ValidatedOptions.error);
    } else {
      setIsLoading(true);

      checkTopicName(topicData?.name)
        .then((value) =>
          value == false
            ? (setInvalidText(t("already_exists", { name: topicData?.name })),
              setTopicValidated(ValidatedOptions.error))
            : onConfirm()
        )
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <PageSection padding={{ default: "noPadding" }}>
      <Sidebar hasGutter>
        <TopicAdvanceJumpLinks />
        <SidebarContent>
          <PageGroup
            hasOverflowScroll={true}
            id="topic-detail-view"
            aria-label={"TODO"}
          >
            <PageSection padding={{ default: "noPadding" }}>
              <Form>
                <CoreConfiguration
                  isCreate={isCreate}
                  topicData={topicData}
                  setTopicData={setTopicData}
                  checkTopicName={checkTopicName}
                  availablePartitionLimit={availablePartitionLimit}
                  invalidText={invalidText}
                  setInvalidText={setInvalidText}
                  setTopicValidated={setTopicValidated}
                  topicValidated={topicValidated}
                  setWarning={setWarning}
                  warning={warning}
                />
                <Message
                  defaultMaximumMessageBytes={
                    topicData["max.message.bytes"].value
                  }
                  defaultMessageTimestampType={
                    topicData["message.timestamp.type"]
                  }
                  defaultMaxMessageTimestampDiff={
                    topicData["message.timestamp.difference.max.ms"].value
                  }
                />
                <Log
                  topicData={topicData}
                  setTopicData={setTopicData}
                  defaultDeleteRetentionTime={topicData["retention.ms"].value}
                  defaultMinCleanbleRatio={
                    topicData["min.cleanable.dirty.ratio"]
                  }
                  defaultMinimumCompactionLagTime={
                    topicData["min.compaction.lag.ms"].value
                  }
                />
                <Replication />
                <Cleanup
                  defaultLogSegmentSize={topicData["segment.bytes"].value}
                  defaultSegmentTime={topicData["segment.ms"].value}
                  defaultSegmentJitterTime={
                    topicData["segment.jitter.ms"].value
                  }
                  defaultFileDeleteDelay={
                    topicData["file.delete.delay.ms"].value
                  }
                />
                <TopicAdvanceIndex
                  defaultIndexIntervalSize={
                    topicData["index.interval.bytes"].value
                  }
                  defaultSegmentIndexSize={
                    topicData["segment.index.bytes"].value
                  }
                />
                <Flush
                  defaultFlushIntervalMessages={
                    topicData["flush.messages"].value
                  }
                  defaultFlushIntervalTime={topicData["flush.ms"].value}
                />
              </Form>

              <ActionGroup className="kafka-ui--sticky-footer">
                <Divider className="kafka-ui--divider--FlexShrink" />
                <Button
                  isLoading={isLoading}
                  onClick={onValidateTopic}
                  variant="primary"
                  data-testid={
                    isCreate
                      ? "topicAdvanceCreate-actionCreate"
                      : "tabProperties-actionSave"
                  }
                  isDisabled={topicValidated !== "default"}
                >
                  {actionText}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="link"
                  data-testid={
                    isCreate
                      ? "topicAdvanceCreate-actionCancel"
                      : "tabProperties-actionCancel"
                  }
                >
                  {t("common:cancel")}
                </Button>
              </ActionGroup>
            </PageSection>
          </PageGroup>
        </SidebarContent>
      </Sidebar>
    </PageSection>
  );
};
