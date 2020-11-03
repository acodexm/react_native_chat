import perf from '@react-native-firebase/perf';

type MetaOption = { name: string; value: any };
type MetaOptions = MetaOption[];
interface PerformanceService {
  methodTracker(method: Function, methodName: string, meta?: MetaOptions): Promise<any>;
}

class PerformanceServiceImpl implements PerformanceService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new PerformanceServiceImpl();
    }
    return this.instance;
  }
  private static instance: PerformanceServiceImpl;

  methodTracker = async (
    method: Function,
    methodName: string,
    meta?: MetaOptions
  ): Promise<any> => {
    const trace = await perf().startTrace(`method_tracker${methodName}`);
    meta?.forEach((opt) => trace.putAttribute(opt.name, opt.value));
    const result = await method();
    await trace.stop();
    return result;
  };
}

const performanceService = PerformanceServiceImpl.getInstance();
export default performanceService;
