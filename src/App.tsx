import './global.css'; // <- CSS global aqui
import { Header } from './components/Header/Header';
import { SheetsImports } from './components/SheetsImports/SheetsImports';

export function App() {
  return (
    <main>
      <Header />
      <SheetsImports />
    </main>
  );
}
