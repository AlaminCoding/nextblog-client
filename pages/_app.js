import { store } from "store";
import { Provider } from "react-redux";
import MainLayout from "layouts/MainLayout";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        {Component.getLayout ? (
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
