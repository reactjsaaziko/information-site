/**
 * Order Process Scenes Data - 12 Steps
 * 
 * Asset Pipeline:
 * 1. Generate your .webp images (recommended: 1200x900px)
 * 2. Place them in: public/order-storyboard/
 * 3. Set USE_WEBP_IMAGES = true below
 * 
 * Expected files:
 * - public/order-storyboard/inquiry.webp
 * - public/order-storyboard/quotation.webp
 * - public/order-storyboard/order-confirm.webp
 * - public/order-storyboard/payment.webp
 * - public/order-storyboard/order-contract.webp
 * - public/order-storyboard/manufacturing.webp
 * - public/order-storyboard/inspection.webp
 * - public/order-storyboard/full-payment.webp
 * - public/order-storyboard/logistic.webp
 * - public/order-storyboard/custom.webp
 * - public/order-storyboard/order-receive.webp
 * - public/order-storyboard/dispute.webp
 */

const USE_WEBP_IMAGES = false;
const getImagePath = (name) => `/order-storyboard/${name}.${USE_WEBP_IMAGES ? 'webp' : 'png'}`;

export const orderScenes = [
  {
    id: 'inquiry',
    label: 'Inquiry',
    imagePath: getImagePath('inquiry'),
    accent: '#2563EB', // Aaziko Blue (Primary)
    overlayType: 'inquiry',
  },
  {
    id: 'quotation',
    label: 'Quotation',
    imagePath: getImagePath('quotation'),
    accent: '#2563EB', // Aaziko Blue (Primary)
    overlayType: 'quote',
  },
  {
    id: 'sampling',
    label: 'Sampling',
    imagePath: getImagePath('sampling'),
    accent: '#8B5CF6', // Purple for sampling
    overlayType: 'sampling',
  },
  {
    id: 'order-confirm',
    label: 'Order Confirm',
    imagePath: getImagePath('order-confirm'),
    accent: '#0EA5E9', // Aaziko Info
    overlayType: 'confirm',
  },
  {
    id: 'payment',
    label: 'Order Confirmation Amount',
    imagePath: getImagePath('payment'),
    accent: '#16A34A', // Aaziko Success
    overlayType: 'pay',
  },
  {
    id: 'order-contract',
    label: 'Order Contract',
    imagePath: getImagePath('order-contract'),
    accent: '#2563EB', // Aaziko Blue (Primary)
    overlayType: 'contract',
  },
  {
    id: 'manufacturing',
    label: 'Daily Photos & Videos of Manufacture',
    imagePath: getImagePath('manufacturing'),
    accent: '#F59E0B', // Aaziko Warning
    overlayType: 'production',
  },
  {
    id: 'inspection',
    label: 'Daily Inspection Report',
    imagePath: getImagePath('inspection'),
    accent: '#0EA5E9', // Aaziko Info
    overlayType: 'inspection',
  },
  {
    id: 'full-payment',
    label: 'Full Payment',
    imagePath: getImagePath('full-payment'),
    accent: '#16A34A', // Aaziko Success
    overlayType: 'fullpay',
  },
  {
    id: 'logistic',
    label: 'Logistic',
    imagePath: getImagePath('logistic'),
    accent: '#EF4444', // Aaziko Error (for urgency)
    overlayType: 'shipping',
  },
  {
    id: 'custom',
    label: 'Custom',
    imagePath: getImagePath('custom'),
    accent: '#F59E0B', // Aaziko Warning
    overlayType: 'custom',
  },
  {
    id: 'order-receive',
    label: 'Order Receive',
    imagePath: getImagePath('order-receive'),
    accent: '#16A34A', // Aaziko Success
    overlayType: 'receive',
  },
];

export const getSceneById = (id) => orderScenes.find((scene) => scene.id === id);
export const getSceneByIndex = (index) => orderScenes[index] || null;
export const totalScenes = orderScenes.length;
