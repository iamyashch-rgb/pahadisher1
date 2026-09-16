export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  district: string;
  isValid: boolean;
}

// Major Indian PIN code mapping table for instant lookup
const pincodeDatabase: Record<string, { city: string; state: string; district: string }> = {
  // Uttarakhand
  '248001': { city: 'Dehradun', state: 'Uttarakhand', district: 'Dehradun' },
  '248002': { city: 'Dehradun', state: 'Uttarakhand', district: 'Dehradun' },
  '248006': { city: 'Dehradun', state: 'Uttarakhand', district: 'Dehradun' },
  '263001': { city: 'Nainital', state: 'Uttarakhand', district: 'Nainital' },
  '263601': { city: 'Almora', state: 'Uttarakhand', district: 'Almora' },
  '262501': { city: 'Pithoragarh', state: 'Uttarakhand', district: 'Pithoragarh' },
  '246443': { city: 'Gopeshwar', state: 'Uttarakhand', district: 'Chamoli' },
  '249193': { city: 'Rishikesh', state: 'Uttarakhand', district: 'Dehradun' },
  '249401': { city: 'Haridwar', state: 'Uttarakhand', district: 'Haridwar' },

  // Delhi NCR
  '110001': { city: 'New Delhi', state: 'Delhi', district: 'Central Delhi' },
  '110016': { city: 'Hauz Khas', state: 'Delhi', district: 'South Delhi' },
  '110091': { city: 'Mayur Vihar', state: 'Delhi', district: 'East Delhi' },
  '122001': { city: 'Gurugram', state: 'Haryana', district: 'Gurugram' },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', district: 'Gautam Buddha Nagar' },

  // Maharashtra
  '400001': { city: 'Mumbai', state: 'Maharashtra', district: 'Mumbai' },
  '400050': { city: 'Bandra', state: 'Maharashtra', district: 'Mumbai Suburban' },
  '411001': { city: 'Pune', state: 'Maharashtra', district: 'Pune' },
  '440001': { city: 'Nagpur', state: 'Maharashtra', district: 'Nagpur' },

  // Karnataka
  '560001': { city: 'Bengaluru', state: 'Karnataka', district: 'Bengaluru Urban' },
  '560034': { city: 'Koramangala', state: 'Karnataka', district: 'Bengaluru Urban' },
  '570001': { city: 'Mysuru', state: 'Karnataka', district: 'Mysuru' },

  // West Bengal
  '700001': { city: 'Kolkata', state: 'West Bengal', district: 'Kolkata' },
  '700091': { city: 'Salt Lake', state: 'West Bengal', district: 'North 24 Parganas' },

  // Tamil Nadu
  '600001': { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai' },
  '641001': { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore' },

  // Telangana & AP
  '500001': { city: 'Hyderabad', state: 'Telangana', district: 'Hyderabad' },
  '530001': { city: 'Visakhapatnam', state: 'Andhra Pradesh', district: 'Visakhapatnam' },

  // Gujarat
  '380001': { city: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad' },
  '395001': { city: 'Surat', state: 'Gujarat', district: 'Surat' },

  // Himachal Pradesh
  '171001': { city: 'Shimla', state: 'Himachal Pradesh', district: 'Shimla' },
  '176215': { city: 'Dharamshala', state: 'Himachal Pradesh', district: 'Kangra' },
  '175131': { city: 'Manali', state: 'Himachal Pradesh', district: 'Kullu' },

  // Punjab, Haryana & Chandigarh
  '160017': { city: 'Chandigarh', state: 'Chandigarh', district: 'Chandigarh' },
  '141001': { city: 'Ludhiana', state: 'Punjab', district: 'Ludhiana' },

  // Rajasthan
  '302001': { city: 'Jaipur', state: 'Rajasthan', district: 'Jaipur' },
  '342001': { city: 'Jodhpur', state: 'Rajasthan', district: 'Jodhpur' },

  // Uttar Pradesh & MP
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow' },
  '208001': { city: 'Kanpur', state: 'Uttar Pradesh', district: 'Kanpur' },
  '462001': { city: 'Bhopal', state: 'Madhya Pradesh', district: 'Bhopal' },
  '452001': { city: 'Indore', state: 'Madhya Pradesh', district: 'Indore' },

  // Bihar, Assam & others
  '800001': { city: 'Patna', state: 'Bihar', district: 'Patna' },
  '781001': { city: 'Guwahati', state: 'Assam', district: 'Kamrup Metropolitan' },
  '799001': { city: 'Agartala', state: 'Tripura', district: 'West Tripura' }
};

// Fallback state resolver based on Indian PIN code first digit pattern
function resolveStateFromPrefix(prefix: string): { city: string; state: string } {
  switch (prefix) {
    case '11':
      return { city: 'Delhi', state: 'Delhi' };
    case '12': case '13':
      return { city: 'Gurugram', state: 'Haryana' };
    case '14': case '15':
      return { city: 'Ludhiana', state: 'Punjab' };
    case '16':
      return { city: 'Chandigarh', state: 'Chandigarh' };
    case '17':
      return { city: 'Shimla', state: 'Himachal Pradesh' };
    case '18': case '19':
      return { city: 'Srinagar', state: 'Jammu & Kashmir' };
    case '20': case '21': case '22': case '23': case '25': case '27': case '28':
      return { city: 'Noida', state: 'Uttar Pradesh' };
    case '24': case '26':
      return { city: 'Dehradun', state: 'Uttarakhand' };
    case '30': case '31': case '32': case '33': case '34':
      return { city: 'Jaipur', state: 'Rajasthan' };
    case '36': case '37': case '38': case '39':
      return { city: 'Ahmedabad', state: 'Gujarat' };
    case '40': case '41': case '42': case '43': case '44':
      return { city: 'Mumbai', state: 'Maharashtra' };
    case '45': case '46': case '47': case '48':
      return { city: 'Indore', state: 'Madhya Pradesh' };
    case '49':
      return { city: 'Raipur', state: 'Chhattisgarh' };
    case '50': case '51': case '52': case '53':
      return { city: 'Hyderabad', state: 'Telangana' };
    case '56': case '57': case '58': case '59':
      return { city: 'Bengaluru', state: 'Karnataka' };
    case '60': case '61': case '62': case '63': case '64':
      return { city: 'Chennai', state: 'Tamil Nadu' };
    case '67': case '68': case '69':
      return { city: 'Kochi', state: 'Kerala' };
    case '70': case '71': case '72': case '73': case '74':
      return { city: 'Kolkata', state: 'West Bengal' };
    case '75': case '76': case '77':
      return { city: 'Bhubaneswar', state: 'Odisha' };
    case '78':
      return { city: 'Guwahati', state: 'Assam' };
    case '80': case '81': case '82': case '83': case '84': case '85':
      return { city: 'Patna', state: 'Bihar' };
    default:
      return { city: 'City', state: 'India' };
  }
}

export function validateAndLookupPincode(pincode: string): PincodeInfo {
  const clean = pincode.replace(/\D/g, '').trim();

  // Valid Indian PIN code format: 6 digits, first digit non-zero
  const isValidFormat = /^[1-9][0-9]{5}$/.test(clean);

  if (!isValidFormat) {
    return {
      pincode: clean,
      city: '',
      state: '',
      district: '',
      isValid: false
    };
  }

  // Exact lookup
  if (pincodeDatabase[clean]) {
    const data = pincodeDatabase[clean];
    return {
      pincode: clean,
      city: data.city,
      state: data.state,
      district: data.district,
      isValid: true
    };
  }

  // Fallback pattern resolution
  const prefix = clean.substring(0, 2);
  const resolved = resolveStateFromPrefix(prefix);

  return {
    pincode: clean,
    city: resolved.city,
    state: resolved.state,
    district: `${resolved.city} Region`,
    isValid: true
  };
}
