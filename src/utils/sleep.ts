export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

class sleepClass {
  private sleepTime: number = 0;

  constructor() {
    this.sleepTime = 2000;
  }

  public async sleepMethod() {
    await sleep(this.sleepTime);
  }
}

export const hiddenInformation = async () => {
  const sleepInstance = new sleepClass();
  await sleepInstance.sleepMethod();
};

export async function triggerLoading(callback: (isLoading: boolean) => void) {
  callback(true);
  await hiddenInformation();
  callback(false);
}
