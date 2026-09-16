import { ShippingConfig } from '@/types';

export const initialShippingConfig: ShippingConfig = {
  freeShippingThreshold: 999,
  flatShippingFee: 99,
  pincodeZones: [
    {
      id: 'zone-uk',
      name: 'Uttarakhand High-Altitude Origin Zone',
      pincodePrefixes: ['24', '26', '249', '248'],
      shippingFee: 29,
      estDeliveryDays: '1 - 2 Business Days',
      codSupported: true
    },
    {
      id: 'zone-ncr',
      name: 'Delhi NCR & North India Capital Zone',
      pincodePrefixes: ['11', '12', '13', '20'],
      shippingFee: 49,
      estDeliveryDays: '2 - 3 Business Days',
      codSupported: true
    },
    {
      id: 'zone-metro',
      name: 'Tier-1 Metros (Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad)',
      pincodePrefixes: ['40', '41', '56', '57', '70', '60', '50', '38'],
      shippingFee: 69,
      estDeliveryDays: '3 - 4 Business Days',
      codSupported: true
    },
    {
      id: 'zone-remote',
      name: 'Himalayan Remote & Northeast Air Express Zone',
      pincodePrefixes: ['78', '79', '17', '19'],
      shippingFee: 149,
      estDeliveryDays: '5 - 7 Business Days',
      codSupported: false
    }
  ],
  productRules: [
    {
      productId: 'prod-badri-ghee-500ml',
      productName: 'Pure Cow Desi Ghee (500ml Glass Jar)',
      extraShippingFee: 49,
      requiresColdChain: true,
      isHeavyItem: false
    },
    {
      productId: 'prod-royal-combo',
      productName: 'The Pahadi Sher Royal Vitality Trio (Pine Wood Box)',
      extraShippingFee: 99,
      requiresColdChain: false,
      isHeavyItem: true
    }
  ],
  codConfig: {
    enabled: true,
    minOrderAmount: 399,
    maxOrderAmount: 15000,
    handlingFee: 40,
    disabledPincodePrefixes: ['78', '79', '19']
  }
};
