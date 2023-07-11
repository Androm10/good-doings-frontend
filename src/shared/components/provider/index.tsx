import { store } from "@/shared/store";
import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";

const StoreProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
