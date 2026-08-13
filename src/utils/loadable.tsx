import baseLoadable from '@loadable/component';
import AwesomeLoading from '@/stories/AwesomeLoading';

const loadable = <T extends unknown>(
  dynamicImport: () => Promise<{
    default: React.FunctionComponent<T>;
  }>,
  loading = <AwesomeLoading />,
) => baseLoadable(dynamicImport, { fallback: loading });

export default loadable;
