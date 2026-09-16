import { CartItem, ShippingConfig, PincodeZoneRule } from '@/types';
import { initialShippingConfig } from '@/data/shipping';

export interface ShippingCalculationResult {
  pincode: string;
  matchedZone: PincodeZoneRule | null;
  baseShippingFee: number;
  productSurcharges: number;
  finalShippingCost: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  estDeliveryDays: string;
  estDeliveryDateFormatted: string;
  isCodAvailable: boolean;
  codHandlingFee: number;
  codReason?: string;
  requiresColdChain: boolean;
  hasHeavyItem: boolean;
}

export function calculateShipping(
  pincode: string,
  cartItems: CartItem[],
  subtotal: number,
  config: ShippingConfig = initialShippingConfig,
  selectedMethod: 'standard' | 'air' | 'coldchain' = 'standard'
): ShippingCalculationResult {
  const cleanPincode = pincode.replace(/\D/g, '').trim();

  // 1. Resolve Zone Rule based on PIN code prefix
  let matchedZone: PincodeZoneRule | null = null;
  if (cleanPincode.length >= 2 && config.pincodeZones?.length) {
    matchedZone = config.pincodeZones.find(zone =>
      zone.pincodePrefixes.some(prefix => cleanPincode.startsWith(prefix))
    ) || null;
  }

  // Base shipping fee from matched zone or default flat fee
  const baseShippingFee = matchedZone ? matchedZone.shippingFee : config.flatShippingFee;
  const estDeliveryDays = matchedZone ? matchedZone.estDeliveryDays : '3 - 5 Business Days';

  // 2. Product-Specific Surcharges & Packaging Requirements
  let productSurcharges = 0;
  let requiresColdChain = false;
  let hasHeavyItem = false;

  cartItems.forEach(item => {
    const prodId = item.product.id;
    const rule = config.productRules?.find(r => r.productId === prodId);
    if (rule) {
      productSurcharges += (rule.extraShippingFee || 0) * item.quantity;
      if (rule.requiresColdChain) requiresColdChain = true;
      if (rule.isHeavyItem) hasHeavyItem = true;
    }
  });

  // Shipping Method Upgrades
  let methodAddon = 0;
  if (selectedMethod === 'air') methodAddon = 50;
  if (selectedMethod === 'coldchain') methodAddon = 99;

  // 3. Free Shipping Eligibility Check
  const isFreeShipping = subtotal >= config.freeShippingThreshold && subtotal > 0;
  const amountNeededForFreeShipping = Math.max(0, config.freeShippingThreshold - subtotal);

  // Final Shipping Cost calculation
  let finalShippingCost = 0;
  if (isFreeShipping && selectedMethod === 'standard') {
    finalShippingCost = 0;
  } else if (isFreeShipping) {
    // If user explicitly chooses Air Express or Cold Chain upgrade, apply addon fee
    finalShippingCost = methodAddon;
  } else {
    finalShippingCost = baseShippingFee + productSurcharges + methodAddon;
  }

  // 4. Calculate Estimated Delivery Dates
  const now = new Date();
  let minDays = 3;
  let maxDays = 5;

  if (estDeliveryDays.includes('1 - 2')) { minDays = 1; maxDays = 2; }
  else if (estDeliveryDays.includes('2 - 3')) { minDays = 2; maxDays = 3; }
  else if (estDeliveryDays.includes('3 - 4')) { minDays = 3; maxDays = 4; }
  else if (estDeliveryDays.includes('5 - 7')) { minDays = 5; maxDays = 7; }

  // Adjust for Express Air method
  if (selectedMethod === 'air') {
    minDays = Math.max(1, minDays - 1);
    maxDays = Math.max(2, maxDays - 1);
  }

  const deliveryDateStart = new Date(now);
  deliveryDateStart.setDate(now.getDate() + minDays);

  const deliveryDateEnd = new Date(now);
  deliveryDateEnd.setDate(now.getDate() + maxDays);

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const estDeliveryDateFormatted = `${formatDate(deliveryDateStart)} - ${formatDate(deliveryDateEnd)}`;

  // 5. COD (Cash on Delivery) Validation
  const codConfig = config.codConfig || { enabled: true, minOrderAmount: 399, maxOrderAmount: 15000, handlingFee: 40 };
  let isCodAvailable = true;
  let codReason = '';

  if (!codConfig.enabled) {
    isCodAvailable = false;
    codReason = 'Cash on Delivery is currently disabled by store administration.';
  } else if (subtotal < codConfig.minOrderAmount) {
    isCodAvailable = false;
    codReason = `COD requires a minimum subtotal of ₹${codConfig.minOrderAmount}.`;
  } else if (subtotal > codConfig.maxOrderAmount) {
    isCodAvailable = false;
    codReason = `COD is restricted for orders exceeding ₹${codConfig.maxOrderAmount}.`;
  } else if (matchedZone && matchedZone.codSupported === false) {
    isCodAvailable = false;
    codReason = `COD is not available for PIN code region (${matchedZone.name}).`;
  } else if (cleanPincode.length >= 2 && codConfig.disabledPincodePrefixes?.some(p => cleanPincode.startsWith(p))) {
    isCodAvailable = false;
    codReason = `COD courier service is unavailable for PIN code ${cleanPincode}.`;
  }

  return {
    pincode: cleanPincode,
    matchedZone,
    baseShippingFee,
    productSurcharges,
    finalShippingCost,
    isFreeShipping,
    amountNeededForFreeShipping,
    estDeliveryDays,
    estDeliveryDateFormatted,
    isCodAvailable,
    codHandlingFee: isCodAvailable ? codConfig.handlingFee : 0,
    codReason: isCodAvailable ? undefined : codReason,
    requiresColdChain,
    hasHeavyItem
  };
}
