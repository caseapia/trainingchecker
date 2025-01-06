let sendMetricInstance: (message: { action: string, error?: string, additionMessage?: string }) => void;

export const setMetricInstance = (instance: (message: { action: string, error?: string, additionMessage?: string }) => void) => {
  sendMetricInstance = instance;
};

export const metric = {
  send: ({ action, error, additionMessage }: { action: string, error?: string, additionMessage?: string }) => {
    if (sendMetricInstance) {
      sendMetricInstance({ action, error, additionMessage });
    } else {
      console.error('Metric cannot be sent without useEffect: sendMetricInstance');
    }
  }
};
