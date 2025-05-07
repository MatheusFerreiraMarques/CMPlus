import styles from './Header.module.css';
import CMPlus from '../../assets/logo.png';
import { useState } from 'react';

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.overlay)) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleSidebar}>
        &#9776; {/* Ícone de hambúrguer */}
      </button>
      <img src={CMPlus} alt="Logotipo do CMPlus" />

      {/* Overlay que fecha a sidebar quando clicado fora */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={handleOutsideClick}></div>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <a href="/sheets-imports">Tratamento de Planilhas</a>
          </li>
          {/* Adicione outros links conforme necessário */}
        </ul>
      </div>
    </header>
  );
}
