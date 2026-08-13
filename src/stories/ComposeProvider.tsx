interface ComposeProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  R = React.JSXElementConstructor<React.PropsWithChildren<T>>,
> {
  components: Array<[R, T] | [R]>;
  children: React.ReactNode;
}

const Compose = ({ components, children }: ComposeProps) => (
  <>
    {components.reduceRight(
      (acc, [Comp, props]) => (
        <Comp {...props}>{acc}</Comp>
      ),
      children,
    )}
  </>
);

export default Compose;
