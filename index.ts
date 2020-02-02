import { promisify } from 'util';
import lockfile from 'lockfile';

type LockFn = (path: string, opts: lockfile.Options, callback: (err: Error | null) => void) => void;

const lock = promisify(lockfile.lock as LockFn);
const unlock = promisify(lockfile.unlock);

interface ReturnType {
  isMaster: boolean;
  cleanup: Function;
}

export default async (
  name: string, options: {wait: number}
): Promise<ReturnType> => {
  await lock(name, options);
  const concurrentName = name + 'concurrent'
  let ret: ReturnType;
  try {
    await lock(concurrentName, {});
    ret = {
      isMaster: true,
      cleanup: async () => {
        await unlock(concurrentName);
      }
    };
  } catch(e) {
    ret = {
      isMaster: false,
      cleanup: () => {},
    }
  }
  await unlock(name);
  return ret
};
