import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeHeroWrapper from './components/ThreeHeroWrapper';
import SectionD_PainPoints from './components/SectionD_PainPoints';
import SectionE_WinWin from './components/SectionE_WinWin';
import SectionF_CoreModules from './components/SectionF_CoreModules';
import SectionG_FinalCTA from './components/SectionG_FinalCTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import SectionTransition from './components/SectionTransition';
import { usePerformance } from './hooks/usePerformance';
import './index.css';
import './styles/sellerBuyerNetwork2D.css';

// Import all pages
import BuyersOverview from './pages/BuyersOverview';
import BuyerJourney from './pages/BuyerJourney';
import BuyerBenefits from './pages/BuyerBenefits';
import BuyerCostSavings from './pages/BuyerCostSavings';
import RFQ from './pages/RFQ';
import FindVerifiedIndianSuppliers from './pages/FindVerifiedIndianSuppliers';
import FindVerifiedSuppliers from './pages/FindVerifiedSuppliers';
import VerifiedSuppliers from './pages/VerifiedSuppliers';
import HowWeWork from './pages/HowWeWork';
import CustomsDocumentation from './pages/CustomsDocumentation';
import ShipmentTracking from './pages/ShipmentTracking';
import SuppliersOverview from './pages/SuppliersOverview';
import CreateCompanyProfile from './pages/CreateCompanyProfile';
import ListProducts from './pages/ListProducts';
import GetVerified from './pages/GetVerified';
import QuoteOrderMilestones from './pages/QuoteOrderMilestones';
import InspectionReadiness from './pages/InspectionReadiness';
import ExportDocumentation from './pages/ExportDocumentation';
import SupplierFAQs from './pages/SupplierFAQs';
import LogisticsPartner from './pages/LogisticsPartner';
import FreightForwarders from './pages/FreightForwarders';
import CustomHouseAgents from './pages/CustomHouseAgents';
import InspectionPartners from './pages/InspectionPartners';
import FinancePartners from './pages/FinancePartners';
import InsurancePartners from './pages/InsurancePartners';
import PartnerSupport from './pages/PartnerSupport';
import Marketplace from './pages/Marketplace';
import Inspection from './pages/Inspection';
import Finance from './pages/Finance';
import Logistics from './pages/Logistics';
import Planet1Market from './pages/Planet1Market';
import OrderProcess from './pages/OrderProcess';
import TerminationGuide from './pages/TerminationGuide';
import CompanyTerminated from './pages/CompanyTerminated';
import TradeSolutionsMarketplace from './pages/trade-solutions/TradeSolutionsMarketplace';
import TradeSolutionsTransport from './pages/trade-solutions/TradeSolutionsTransport';
import TradeSolutionsInspection from './pages/trade-solutions/TradeSolutionsInspection';
import TradeSolutionsOrderFinance from './pages/trade-solutions/TradeSolutionsOrderFinance';
import TradeSolutionsAPI from './pages/trade-solutions/TradeSolutionsAPI';
import BlogKnowledgeHub from './pages/BlogKnowledgeHub';
import ExportImportGuides from './pages/ExportImportGuides';
import WebinarsEvents from './pages/WebinarsEvents';
import CaseStudies from './pages/CaseStudies';
import PolicyPage from './pages/policy/PolicyPage';
import Contact from './pages/Contact';
import TradeAgreements from './pages/TradeAgreements';
import DisputeResolution from './pages/DisputeResolution';
import PartnerSOPOnboarding from './pages/PartnerSOPOnboarding';
import AboutPage from './pages/AboutPage';
import Newsroom from './pages/Newsroom';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Buyers Routes */}
      <Route path="/buyers" element={<BuyersOverview />} />
      <Route path="/buyers/overview" element={<BuyersOverview />} />
      <Route path="/buyers/journey" element={<BuyerJourney />} />
      <Route path="/buyers/benefits" element={<BuyerBenefits />} />
      <Route path="/buyers/cost-savings" element={<BuyerCostSavings />} />
      <Route path="/rfq" element={<RFQ />} />
      <Route path="/buyers/rfq" element={<RFQ />} />
      <Route path="/find-verified-indian-suppliers" element={<FindVerifiedIndianSuppliers />} />
      <Route path="/suppliers/indian" element={<FindVerifiedIndianSuppliers />} />
      <Route path="/find-verified-suppliers" element={<FindVerifiedSuppliers />} />
      <Route path="/suppliers/find" element={<FindVerifiedSuppliers />} />
      <Route path="/verified-suppliers" element={<VerifiedSuppliers />} />
      <Route path="/suppliers/verified" element={<VerifiedSuppliers />} />
      <Route path="/how-we-work" element={<HowWeWork />} />
      <Route path="/customs-documentation" element={<CustomsDocumentation />} />
      <Route path="/customs" element={<CustomsDocumentation />} />
      <Route path="/suppliers/customs" element={<CustomsDocumentation />} />
      <Route path="/shipment-tracking" element={<ShipmentTracking />} />
      <Route path="/buyers/shipment-tracking" element={<ShipmentTracking />} />
      <Route path="/tracking" element={<ShipmentTracking />} />

      {/* Suppliers Routes */}
      <Route path="/suppliers" element={<SuppliersOverview />} />
      <Route path="/suppliers/overview" element={<SuppliersOverview />} />
      <Route path="/suppliers/create-profile" element={<CreateCompanyProfile />} />
      <Route path="/create-company-profile" element={<CreateCompanyProfile />} />
      <Route path="/suppliers/list-products" element={<ListProducts />} />
      <Route path="/suppliers/products" element={<ListProducts />} />
      <Route path="/list-products" element={<ListProducts />} />
      <Route path="/suppliers/get-verified" element={<GetVerified />} />
      <Route path="/suppliers/verification" element={<GetVerified />} />
      <Route path="/get-verified" element={<GetVerified />} />
      <Route path="/suppliers/quote-milestones" element={<QuoteOrderMilestones />} />
      <Route path="/quote-order-milestones" element={<QuoteOrderMilestones />} />
      <Route path="/suppliers/inspection-readiness" element={<InspectionReadiness />} />
      <Route path="/inspection-readiness" element={<InspectionReadiness />} />
      <Route path="/suppliers/export-documentation" element={<ExportDocumentation />} />
      <Route path="/suppliers/export-docs" element={<ExportDocumentation />} />
      <Route path="/export-documentation" element={<ExportDocumentation />} />
      <Route path="/export-docs" element={<ExportDocumentation />} />
      <Route path="/suppliers/faqs" element={<SupplierFAQs />} />
      <Route path="/supplier-faqs" element={<SupplierFAQs />} />

      {/* Service Providers Routes */}
      <Route path="/logistics-partner" element={<LogisticsPartner />} />
      <Route path="/partners/logistics" element={<LogisticsPartner />} />
      <Route path="/freight-forwarders" element={<FreightForwarders />} />
      <Route path="/partners/freight" element={<FreightForwarders />} />
      <Route path="/custom-house-agents" element={<CustomHouseAgents />} />
      <Route path="/partners/cha" element={<CustomHouseAgents />} />
      <Route path="/inspection-partners" element={<InspectionPartners />} />
      <Route path="/partners/inspection" element={<InspectionPartners />} />
      <Route path="/finance-partners" element={<FinancePartners />} />
      <Route path="/partners/finance" element={<FinancePartners />} />
      <Route path="/insurance-partners" element={<InsurancePartners />} />
      <Route path="/partners/insurance" element={<InsurancePartners />} />
      <Route path="/partner-support" element={<PartnerSupport />} />
      <Route path="/partners/support" element={<PartnerSupport />} />

      {/* Trade Solutions Routes */}
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/trade-solutions/marketplace" element={<TradeSolutionsMarketplace />} />
      <Route path="/trade-solutions/transport" element={<TradeSolutionsTransport />} />
      <Route path="/trade-solutions/customs" element={<CustomsDocumentation />} />
      <Route path="/trade-solutions/inspection" element={<TradeSolutionsInspection />} />
      <Route path="/trade-solutions/order-finance" element={<TradeSolutionsOrderFinance />} />
      <Route path="/trade-solutions/api-integrations" element={<TradeSolutionsAPI />} />
      <Route path="/inspection" element={<Inspection />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/logistics" element={<Logistics />} />
      <Route path="/planet1-market" element={<Planet1Market />} />
      <Route path="/order-process" element={<OrderProcess />} />

      {/* Company Routes */}
      <Route path="/company/termination-guide" element={<TerminationGuide />} />
      <Route path="/company/terminated" element={<CompanyTerminated />} />
      <Route path="/company/status/terminated" element={<CompanyTerminated />} />

      {/* Learn Routes */}
      <Route path="/blog" element={<BlogKnowledgeHub />} />
      <Route path="/knowledge-hub" element={<BlogKnowledgeHub />} />
      <Route path="/learn/blog" element={<BlogKnowledgeHub />} />
      <Route path="/guides" element={<ExportImportGuides />} />
      <Route path="/export-import-guides" element={<ExportImportGuides />} />
      <Route path="/learn/guides" element={<ExportImportGuides />} />
      <Route path="/trade-agreements" element={<TradeAgreements />} />
      <Route path="/learn/trade-agreements" element={<TradeAgreements />} />
      <Route path="/webinars" element={<WebinarsEvents />} />
      <Route path="/events" element={<WebinarsEvents />} />
      <Route path="/learn/webinars" element={<WebinarsEvents />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/learn/case-studies" element={<CaseStudies />} />

      {/* Additional Routes */}
      <Route path="/how-buying-works" element={<HowWeWork />} />
      <Route path="/dispute-resolution" element={<DisputeResolution />} />
      <Route path="/buyers/dispute" element={<DisputeResolution />} />
      <Route path="/support/dispute" element={<DisputeResolution />} />
      <Route path="/logistics-companies" element={<LogisticsPartner />} />
      <Route path="/cha" element={<CustomHouseAgents />} />
      <Route path="/partner-sop" element={<PartnerSOPOnboarding />} />
      <Route path="/partner-onboarding" element={<PartnerSOPOnboarding />} />
      <Route path="/partners/sop" element={<PartnerSOPOnboarding />} />

      {/* Newsroom */}
      <Route path="/newsroom" element={<Newsroom />} />

      {/* Policy & Contact */}
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/legal/policy" element={<PolicyPage />} />
      <Route path="/contact" element={<Contact />} />

      {/* Coming Soon */}
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/service-provider" element={<ComingSoon />} />
      <Route path="/partners/join" element={<ComingSoon />} />
    </Routes>
  );
}

function HomePage() {
  const { quality, isDetecting } = usePerformance();
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [showStaticContent, setShowStaticContent] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [bgTransitionProgress, setBgTransitionProgress] = useState(0);
  const bgRef = useRef(null);
  const threeHeroRef = useRef(null);
  
  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle completion of Three.js sections
  const handleThreeHeroComplete = useCallback(() => {
    setShowStaticContent(true);
    setIsInHeroSection(false);
  }, []);

  // Smooth background color transition based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Only transition background when static content is visible
      if (!showStaticContent) {
        setBgTransitionProgress(0);
        return;
      }

      // Calculate background transition progress
      const transitionStart = 0;
      const transitionEnd = window.innerHeight * 0.5;
      
      let progress = 0;
      if (scrollY > transitionStart) {
        progress = Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart));
      }
      setBgTransitionProgress(progress);
      
      // Update header mode based on scroll position
      setIsInHeroSection(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showStaticContent]);

  // Header is dark when in hero section or when static content hasn't loaded
  const headerDarkMode = !showStaticContent || isInHeroSection;

  // Interpolate background color from dark to light
  const interpolateColor = (progress) => {
    const darkR = 8, darkG = 12, darkB = 20;
    const lightR = 247, lightG = 250, lightB = 255;
    const r = Math.round(darkR + (lightR - darkR) * progress);
    const g = Math.round(darkG + (lightG - darkG) * progress);
    const b = Math.round(darkB + (lightB - darkB) * progress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      {/* Smooth Background Transition Layer */}
      <div
        ref={bgRef}
        className="smooth-bg-transition"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: interpolateColor(bgTransitionProgress),
          zIndex: -2,
          pointerEvents: 'none',
          transition: 'background 0.05s linear',
        }}
      />

      {/* Gradient overlay for smoother blending */}
      <div
        className="smooth-gradient-blend"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at center top, 
            rgba(247, 250, 255, ${bgTransitionProgress * 0.4}) 0%,
            transparent 70%
          )`,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: bgTransitionProgress,
        }}
      />

      {/* Navigation */}
      <Navbar darkMode={headerDarkMode} />

      {/* Loading */}
      {isDetecting && (
        <div className="detecting-overlay">
          <div className="detecting-spinner" />
        </div>
      )}

      <ErrorBoundary>
        {/* Three.js Hero Sections (Section 1 + Section 2) with scroll lock */}
        <ThreeHeroWrapper
          ref={threeHeroRef}
          quality={quality}
          onThemeChange={setIsLightTheme}
          onComplete={handleThreeHeroComplete}
          reducedMotion={reducedMotion}
        />

        {/* Static content sections - appear after Three.js animations complete */}
        <AnimatePresence mode="wait">
          {showStaticContent && (
            <motion.div
              className="static-sections-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Light sections with smooth scroll transitions */}
              <div className="light-sections visible">
                <SectionTransition direction="up" duration={0.8} threshold={0.1}>
                  <SectionD_PainPoints />
                </SectionTransition>
                
                <SectionTransition direction="up" duration={0.8} delay={0.1} threshold={0.1}>
                  <SectionE_WinWin />
                </SectionTransition>
                
                <SectionTransition direction="slideScale" duration={0.8} delay={0.1} threshold={0.1}>
                  <SectionF_CoreModules />
                </SectionTransition>
                
                <SectionTransition direction="scale" duration={0.7} threshold={0.15}>
                  <SectionG_FinalCTA />
                </SectionTransition>
                
                <SectionTransition direction="fade" duration={0.6} threshold={0.2}>
                  <Footer />
                </SectionTransition>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}

export default App;
