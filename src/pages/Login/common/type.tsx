export interface FormItem<T = HTMLDivElement> {
  children?:
    | JSX.Element
    | ((cb: React.MouseEventHandler<T>, signupCode: string) => JSX.Element);
}
export interface MyFormGroup<T = HTMLDivElement> {
  group: Array<FormItem>;
  cb?: React.MouseEventHandler<T>;
  inText?: string;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  currentValue: number;
}
export interface LoginParams {
  phone: FormDataEntryValue;
  password: FormDataEntryValue;
  code?: FormDataEntryValue;
}
