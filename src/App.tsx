import './App.scss';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import Popup from './components/popup/popup';

function App() {
  // alert('Привет. шахматы в процессе производства ещё. прошу не проверять работу пару дней, хочу хоть какой то функционал доделать. спасибо!');
  return (
    <>
      <Popup />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
