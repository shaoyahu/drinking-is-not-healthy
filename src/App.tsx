import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import BodyImpact from './components/BodyImpact';
import HarmTypes from './components/HarmTypes';
import BrainDamage from './components/BrainDamage';
import China from './components/China';
import SocialCost from './components/SocialCost';
import QnA from './components/QnA';
import BingeCulture from './components/BingeCulture';
import Sources from './components/Sources';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  // 锚点跳转由浏览器原生 + CSS scroll-behavior: smooth + scroll-margin-top 处理,
  // 不需要额外的 useEffect。
  return (
    <div className="app">
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Stats />
      <BodyImpact />
      <HarmTypes />
      <BrainDamage />
      <China />
      <SocialCost />
      <QnA />
      <BingeCulture />
      <Sources />
      <Footer />
    </div>
  );
}

export default App;
