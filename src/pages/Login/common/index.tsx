import { MyFormGroup } from './type';

const MyForm = (props: MyFormGroup) => {
  const { group, cb, inText } = props;
  const arr = group.map(item => {
    let Com;
    if (cb && typeof item.children === 'function') {
      Com = item.children(cb, inText!);
    } else {
      Com = item.children;
    }
    return Com;
  });
  return <>{arr}</>;
};

export default MyForm;
