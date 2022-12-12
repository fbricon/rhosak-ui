import { useQueryClient } from "react-query";
import { fetchKafkaKpiMetrics } from "./fetchKafkaKpiMetrics";
import { kafkaQueries } from "./queryKeys";
import { useKms } from "./useApi";

export function useKafkaInstanceKpiMetricsQuery() {
  const getKms = useKms();
  const queryClient = useQueryClient();

  return (id: string) => {
    const api = getKms();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.kpi({ id }),
      queryFn: async () => {
        return fetchKafkaKpiMetrics(
          (...args) => api.getMetricsByInstantQuery(...args),
          id
        );
      },
    });
  };
}
