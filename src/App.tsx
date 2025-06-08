// import Header from './components/Header';
import AppleFooter from './components/AppleFooter';
import ApplePromoGrid from './components/ApplePromoGrid';
import AppleTVDevices from './components/AppleTvDevices';
import AppleTVPlusLanding from './components/AppleTVPlusLanding';
import Navbar from './components/Navbar';
import Hero from './components/section/Hero';
import Usps from './components/section/Usps';
import VideoCarousel from './components/section/VideoCarousel';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className='bg-backgroundContrast relative z-10'>
          <Hero />
          <Usps />
        </div>
        <VideoCarousel />
        <AppleTVDevices />
        <AppleTVPlusLanding />
        <ApplePromoGrid />
        <AppleFooter />
      </main>
    </>
  );
}
