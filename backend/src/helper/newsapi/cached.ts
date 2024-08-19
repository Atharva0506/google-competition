import NodeCache from "node-cache";

interface CacheValue<T> {
  value: T;
}

class TypedCache<T> {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  set(key: string, value: T): void {
    this.cache.set(key, { value });
  }

  get<T>(key: string): T | undefined {
    const cachedValue = this.cache.get(key);
    return cachedValue ? (cachedValue as CacheValue<T>).value : undefined;
  }
}

const cachedValue = new TypedCache<number>();
cachedValue.set("apiRequestsCount", 0);
cachedValue.set("currentApiKey", 1);

const MAX_REQUESTS_PER_API_KEY = 100;

const resetRequestsCount = function () {
  cachedValue.set("apiRequestsCount", 0);
  cachedValue.set("currentApiKey", 1);
  console.log("\n\n===================\n\n\t\nRESET API KEYS REQUEST COUNT AT UTC 00:00.\n\n===================\n\n");
}

const getRequestsCount = function (): number {
    const reqCount = cachedValue.get("apiRequestsCount");
    console.log("\nNUMBER OF REQUESTS made = " + reqCount);

    if (typeof reqCount === 'number') {
      return reqCount;
    } else {
      // Handling unexpected value, e.g., log an error, return a default value, etc.
      console.error('Unexpected value in cache for apiRequestsCount:', cachedValue);
      return 0; // Or any other default value
    }
  }

const incrementReqCount = async function () {
  try {
    const reqCount = cachedValue.get("apiRequestsCount") || 0;
    console.log("\n=================\tREQUESTS COUNT: "+reqCount +"\t=================\n");

    if(typeof reqCount === 'number'){
        const newReqCount = reqCount+1;
        cachedValue.set("apiRequestsCount", newReqCount);

        if(reqCount>=MAX_REQUESTS_PER_API_KEY * 3){
            cachedValue.set("currentApiKey", 3);
        } else if(reqCount>=MAX_REQUESTS_PER_API_KEY * 2){
            cachedValue.set("currentApiKey", 2);
        }

        return reqCount;
    } else {
        // Handling unexpected value, e.g., log an error, return a default value, etc.
        console.error('Unexpected value in cache for apiRequestsCount:', cachedValue);

        return 1;
    }
  } catch (error) {
    console.error("Error incrementing request count:", error);
  }
}

const getCurrentApiKey = async function () {
  const currentKey = await cachedValue.get("currentApiKey") || 0;

  console.log("currentKey: "+currentKey);

  if(typeof currentKey === 'number'){
    await incrementReqCount();
    return currentKey;
  } else {
    console.error('Unexpected value in cache for currentApiKey:', cachedValue);
    return 0;
  }
}

export {resetRequestsCount, getRequestsCount, incrementReqCount, getCurrentApiKey};