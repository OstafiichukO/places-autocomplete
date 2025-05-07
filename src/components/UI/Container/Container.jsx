import cl from "./Container.module.scss";

const Container = function ({ children }) {
  return <div className={cl.container}>{children}</div>;
};

export default Container;
