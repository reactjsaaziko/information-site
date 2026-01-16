import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import TradeAnimation3D from './components/TradeAnimation3D';
import SectionD_PainPoints from './components/SectionD_PainPoints';
import SectionE_WinWin from './components/SectionE_WinWin';
import SectionF_CoreModules from './components/SectionF_CoreModules';
import SectionG_FinalCTA from './components/SectionG_FinalCTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { usePerformance } from './hooks/usePerformance';
import SeoHead from './seo/SeoHead';
import PrerenderReady from './seo/PrerenderReady';
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

// Guide Pages (Cluster A)
import ExportDocumentsFromIndia from './pages/guides/ExportDocumentsFromIndia';
import ImportDocumentsChecklist from './pages/guides/ImportDocumentsChecklist';
import IncotermsExplained from './pages/guides/IncotermsExplained';
import HowToFindHSCode from './pages/guides/HowToFindHSCode';
import ExportProcessStepByStep from './pages/guides/ExportProcessStepByStep';
import ImportProcessStepByStep from './pages/guides/ImportProcessStepByStep';
import RFQTemplate from './pages/guides/RFQTemplate';
import MOQLeadTimeSampling from './pages/guides/MOQLeadTimeSampling';

// Guide Pages (Cluster B)
import SeaVsAirFreight from './pages/guides/SeaVsAirFreight';
import ExportPackagingLabeling from './pages/guides/ExportPackagingLabeling';
import ShipmentTrackingMilestones from './pages/guides/ShipmentTrackingMilestones';
import CustomsClearanceBasics from './pages/guides/CustomsClearanceBasics';

// Guide Pages (Cluster C)
import InternationalPaymentTerms from './pages/guides/InternationalPaymentTerms';
import QualityInspectionChecklist from './pages/guides/QualityInspectionChecklist';
import SupplierVerificationChecklist from './pages/guides/SupplierVerificationChecklist';

function App() {
  return (
    <>
      {/* Global SEO - runs on every route */}
      <SeoHead />
      <PrerenderReady />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* ===== BUYERS ROUTES ===== */}
        {/* Canonical redirect: /buyers -> /buyers/overview */}
        <Route path="/buyers" element={<Navigate to="/buyers/overview" replace />} />
        <Route path="/buyers/overview" element={<BuyersOverview />} />
        <Route path="/buyers/journey" element={<BuyerJourney />} />
        <Route path="/buyers/benefits" element={<BuyerBenefits />} />
        <Route path="/buyers/cost-savings" element={<BuyerCostSavings />} />
        
        {/* RFQ - canonical is /rfq */}
        <Route path="/rfq" element={<RFQ />} />
        <Route path="/buyers/rfq" element={<Navigate to="/rfq" replace />} />
        
        {/* Verified Suppliers */}
        <Route path="/find-verified-indian-suppliers" element={<FindVerifiedIndianSuppliers />} />
        <Route path="/suppliers/indian" element={<Navigate to="/find-verified-indian-suppliers" replace />} />
        <Route path="/find-verified-suppliers" element={<FindVerifiedSuppliers />} />
        <Route path="/suppliers/find" element={<Navigate to="/find-verified-suppliers" replace />} />
        <Route path="/verified-suppliers" element={<VerifiedSuppliers />} />
        <Route path="/suppliers/verified" element={<Navigate to="/verified-suppliers" replace />} />
        
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/how-buying-works" element={<Navigate to="/how-we-work" replace />} />
        
        {/* Customs - canonical is /customs-documentation */}
        <Route path="/customs-documentation" element={<CustomsDocumentation />} />
        <Route path="/customs" element={<Navigate to="/customs-documentation" replace />} />
        <Route path="/suppliers/customs" element={<Navigate to="/customs-documentation" replace />} />
        
        {/* Tracking - canonical is /shipment-tracking */}
        <Route path="/shipment-tracking" element={<ShipmentTracking />} />
        <Route path="/tracking" element={<Navigate to="/shipment-tracking" replace />} />
        <Route path="/buyers/shipment-tracking" element={<Navigate to="/shipment-tracking" replace />} />
        
        {/* ===== SUPPLIERS ROUTES ===== */}
        {/* Canonical redirect: /suppliers -> /suppliers/overview */}
        <Route path="/suppliers" element={<Navigate to="/suppliers/overview" replace />} />
        <Route path="/suppliers/overview" element={<SuppliersOverview />} />
        
        {/* Create Profile - canonical is /create-company-profile */}
        <Route path="/create-company-profile" element={<CreateCompanyProfile />} />
        <Route path="/suppliers/create-profile" element={<Navigate to="/create-company-profile" replace />} />
        
        {/* List Products - canonical is /list-products */}
        <Route path="/list-products" element={<ListProducts />} />
        <Route path="/suppliers/list-products" element={<Navigate to="/list-products" replace />} />
        <Route path="/suppliers/products" element={<Navigate to="/list-products" replace />} />
        
        {/* Get Verified - canonical is /get-verified */}
        <Route path="/get-verified" element={<GetVerified />} />
        <Route path="/suppliers/get-verified" element={<Navigate to="/get-verified" replace />} />
        <Route path="/suppliers/verification" element={<Navigate to="/get-verified" replace />} />
        
        {/* Quote Milestones - canonical is /quote-order-milestones */}
        <Route path="/quote-order-milestones" element={<QuoteOrderMilestones />} />
        <Route path="/suppliers/quote-milestones" element={<Navigate to="/quote-order-milestones" replace />} />
        
        {/* Inspection Readiness - canonical is /inspection-readiness */}
        <Route path="/inspection-readiness" element={<InspectionReadiness />} />
        <Route path="/suppliers/inspection-readiness" element={<Navigate to="/inspection-readiness" replace />} />
        
        {/* Export Documentation - canonical is /export-documentation */}
        <Route path="/export-documentation" element={<ExportDocumentation />} />
        <Route path="/export-docs" element={<Navigate to="/export-documentation" replace />} />
        <Route path="/suppliers/export-documentation" element={<Navigate to="/export-documentation" replace />} />
        <Route path="/suppliers/export-docs" element={<Navigate to="/export-documentation" replace />} />
        
        {/* Supplier FAQs - canonical is /supplier-faqs */}
        <Route path="/supplier-faqs" element={<SupplierFAQs />} />
        <Route path="/suppliers/faqs" element={<Navigate to="/supplier-faqs" replace />} />
        
        {/* ===== SERVICE PROVIDERS ROUTES ===== */}
        <Route path="/logistics-partner" element={<LogisticsPartner />} />
        <Route path="/partners/logistics" element={<Navigate to="/logistics-partner" replace />} />
        <Route path="/logistics-companies" element={<Navigate to="/logistics-partner" replace />} />
        
        <Route path="/freight-forwarders" element={<FreightForwarders />} />
        <Route path="/partners/freight" element={<Navigate to="/freight-forwarders" replace />} />
        
        <Route path="/custom-house-agents" element={<CustomHouseAgents />} />
        <Route path="/partners/cha" element={<Navigate to="/custom-house-agents" replace />} />
        <Route path="/cha" element={<Navigate to="/custom-house-agents" replace />} />
        
        <Route path="/inspection-partners" element={<InspectionPartners />} />
        <Route path="/partners/inspection" element={<Navigate to="/inspection-partners" replace />} />
        
        <Route path="/finance-partners" element={<FinancePartners />} />
        <Route path="/partners/finance" element={<Navigate to="/finance-partners" replace />} />
        
        <Route path="/insurance-partners" element={<InsurancePartners />} />
        <Route path="/partners/insurance" element={<Navigate to="/insurance-partners" replace />} />
        
        <Route path="/partner-support" element={<PartnerSupport />} />
        <Route path="/partners/support" element={<Navigate to="/partner-support" replace />} />
        
        {/* ===== TRADE SOLUTIONS ROUTES ===== */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/trade-solutions/marketplace" element={<TradeSolutionsMarketplace />} />
        <Route path="/trade-solutions/transport" element={<TradeSolutionsTransport />} />
        <Route path="/trade-solutions/customs" element={<Navigate to="/customs-documentation" replace />} />
        <Route path="/trade-solutions/inspection" element={<TradeSolutionsInspection />} />
        <Route path="/trade-solutions/order-finance" element={<TradeSolutionsOrderFinance />} />
        <Route path="/trade-solutions/api-integrations" element={<TradeSolutionsAPI />} />
        <Route path="/inspection" element={<Inspection />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/planet1-market" element={<Planet1Market />} />
        <Route path="/order-process" element={<OrderProcess />} />
          
        {/* ===== COMPANY ROUTES ===== */}
        <Route path="/company/termination-guide" element={<TerminationGuide />} />
        <Route path="/company/terminated" element={<CompanyTerminated />} />
        <Route path="/company/status/terminated" element={<Navigate to="/company/terminated" replace />} />
        
        {/* ===== LEARN ROUTES ===== */}
        {/* Blog - canonical is /blog */}
        <Route path="/blog" element={<BlogKnowledgeHub />} />
        <Route path="/knowledge-hub" element={<Navigate to="/blog" replace />} />
        <Route path="/learn/blog" element={<Navigate to="/blog" replace />} />
        
        {/* Guides - canonical is /guides */}
        <Route path="/guides" element={<ExportImportGuides />} />
        <Route path="/export-import-guides" element={<Navigate to="/guides" replace />} />
        <Route path="/learn/guides" element={<Navigate to="/guides" replace />} />
        
        {/* Guide Pages - Cluster A */}
        <Route path="/guides/export-documents-from-india" element={<ExportDocumentsFromIndia />} />
        <Route path="/guides/import-documents-checklist" element={<ImportDocumentsChecklist />} />
        <Route path="/guides/incoterms-explained" element={<IncotermsExplained />} />
        <Route path="/guides/how-to-find-hs-code" element={<HowToFindHSCode />} />
        <Route path="/guides/export-process-step-by-step" element={<ExportProcessStepByStep />} />
        <Route path="/guides/import-process-step-by-step" element={<ImportProcessStepByStep />} />
        <Route path="/guides/rfq-template" element={<RFQTemplate />} />
        <Route path="/guides/moq-lead-time-sampling" element={<MOQLeadTimeSampling />} />
        
        {/* Guide Pages - Cluster B */}
        <Route path="/guides/sea-vs-air-freight" element={<SeaVsAirFreight />} />
        <Route path="/guides/export-packaging-labeling" element={<ExportPackagingLabeling />} />
        <Route path="/guides/shipment-tracking-milestones" element={<ShipmentTrackingMilestones />} />
        <Route path="/guides/customs-clearance-basics" element={<CustomsClearanceBasics />} />
        
        {/* Guide Pages - Cluster C */}
        <Route path="/guides/international-payment-terms" element={<InternationalPaymentTerms />} />
        <Route path="/guides/quality-inspection-checklist" element={<QualityInspectionChecklist />} />
        <Route path="/guides/supplier-verification-checklist" element={<SupplierVerificationChecklist />} />
        
        {/* Trade Agreements */}
        <Route path="/trade-agreements" element={<TradeAgreements />} />
        <Route path="/learn/trade-agreements" element={<Navigate to="/trade-agreements" replace />} />
        
        {/* Webinars - canonical is /webinars */}
        <Route path="/webinars" element={<WebinarsEvents />} />
        <Route path="/events" element={<Navigate to="/webinars" replace />} />
        <Route path="/learn/webinars" element={<Navigate to="/webinars" replace />} />
        
        {/* Case Studies - canonical is /case-studies */}
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/learn/case-studies" element={<Navigate to="/case-studies" replace />} />
        
        {/* ===== ADDITIONAL ROUTES ===== */}
        <Route path="/dispute-resolution" element={<DisputeResolution />} />
        <Route path="/buyers/dispute" element={<Navigate to="/dispute-resolution" replace />} />
        <Route path="/support/dispute" element={<Navigate to="/dispute-resolution" replace />} />
        
        {/* Partner SOP - canonical is /partner-sop */}
        <Route path="/partner-sop" element={<PartnerSOPOnboarding />} />
        <Route path="/partner-onboarding" element={<Navigate to="/partner-sop" replace />} />
        <Route path="/partners/sop" element={<Navigate to="/partner-sop" replace />} />
        
        {/* Newsroom */}
        <Route path="/newsroom" element={<Newsroom />} />
        
        {/* Policy & Contact */}
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/legal/policy" element={<Navigate to="/policy" replace />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

function HomePage() {
  const { quality, isDetecting } = usePerformance();
  const [showStaticContent, setShowStaticContent] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [tradeAnimationComplete, setTradeAnimationComplete] = useState(false);

  // Track scroll position to detect if user is in hero section or trade animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const tradeAnimHeight = window.innerHeight;
      
      // Dark header for hero and trade animation sections
      setIsInHeroSection(scrollY < heroHeight + tradeAnimHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header is dark (transparent) when in hero section OR when static content hasn't loaded yet
  const headerDarkMode = !showStaticContent || isInHeroSection;

  return (
    <>
      {/* Navigation - Dark mode when in hero section, light mode when scrolled past */}
      <Navbar darkMode={headerDarkMode} />

      {/* Loading */}
      {isDetecting && (
        <div className="detecting-overlay">
          <div className="detecting-spinner" />
        </div>
      )}

      <ErrorBoundary>
        {/* Hero with Globe - scroll animated */}
        <HeroSection 
          quality={quality} 
          onGlobeComplete={() => setShowStaticContent(true)}
        />
        
        {/* Static content sections - appear after globe animation completes */}
        <AnimatePresence>
          {showStaticContent && (
            <motion.div 
              className="static-sections-wrapper"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
            >
              {/* Trade Animation - Dark section with scroll lock */}
              <TradeAnimation3D onAnimationComplete={() => setTradeAnimationComplete(true)} />
              
              {/* Light sections - only visible after trade animation completes */}
              <div className={`light-sections ${tradeAnimationComplete ? 'visible' : 'hidden'}`}>
                <SectionD_PainPoints />
                <SectionE_WinWin />
                <SectionF_CoreModules />
                <SectionG_FinalCTA />
                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}

export default App;
