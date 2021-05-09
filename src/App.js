import { GlobalStyle } from "./globalStyles";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import ScrollToTop from "./components/ScrollToTop/index";

import Home from "./Pages/Home";

function App() {
  return (
    <>
      <GlobalStyle />
      {/* Hi There! */}
      <ScrollToTop />
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
