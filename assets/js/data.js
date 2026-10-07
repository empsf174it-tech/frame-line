const DEMO_CAMERAS = [
  {
    id: 'lumia-r9',
    name: 'Lumia R9 Cinema',
    brand: 'Lumia',
    type: 'Cinema',
    price: 3499,
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1522054361367-64c3824dcebc?q=80&w=800&auto=format&fit=crop',
    specs: {
      sensorSize: 'Full Frame',
      resolution: '45MP',
      maxVideo: '8K / 60fps',
      codecs: 'ProRes RAW, 12-bit',
      logProfile: 'L-Log3',
      stabilizationType: 'IBIS',
      ratedStops: '8.0 stops',
      afSystem: 'Phase Detect AF',
      subjectDetection: 'Human, Animal, Vehicle',
      viewfinder: '9.44M dot OLED',
      screen: '3.2" Articulating',
      cardSlots: 'CFexpress Type B (x2)',
      ports: 'Full HDMI, USB-C, Mic, Headphone',
      batteryLife: 'CIPA 420 shots',
      weight: '738g'
    },
    scores: {
      imageQuality: 9.5,
      video: 9.8,
      autofocus: 9.0,
      handling: 8.5,
      value: 8.0
    },
    pros: [
      'Class-leading 8K internal recording',
      'Exceptional dynamic range in L-Log3',
      'Dual CFexpress Type B slots'
    ],
    cons: [
      'Heavy and bulky for travel',
      'High price point for hobbyists'
    ],
    verdict: 'Best for: Professional filmmakers and hybrid shooters demanding the absolute highest resolution. Skip if: You are a casual shooter on a tight budget.',
    useCases: ['film', 'portrait']
  },
  {
    id: 'aero-x5',
    name: 'Aero X5 Mirrorless',
    brand: 'Aero',
    type: 'Mirrorless',
    price: 1899,
    rating: 4.6,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=800&auto=format&fit=crop',
    specs: {
      sensorSize: 'APS-C',
      resolution: '26MP',
      maxVideo: '4K / 120fps',
      codecs: '10-bit 4:2:2 All-I',
      logProfile: 'A-Log',
      stabilizationType: 'IBIS',
      ratedStops: '7.0 stops',
      afSystem: 'Hybrid AF',
      subjectDetection: 'Human, Animal',
      viewfinder: '3.69M dot OLED',
      screen: '3.0" Tilting',
      cardSlots: 'SD UHS-II (x2)',
      ports: 'Micro HDMI, USB-C, Mic, Headphone',
      batteryLife: 'CIPA 580 shots',
      weight: '590g'
    },
    scores: {
      imageQuality: 9.0,
      video: 9.2,
      autofocus: 9.5,
      handling: 9.0,
      value: 9.5
    },
    pros: [
      'Unbeatable value for hybrid shooters',
      'Lightning-fast autofocus tracking',
      'Compact and lightweight body'
    ],
    cons: [
      'APS-C sensor limits ultra-low light',
      'Menu system is slightly convoluted'
    ],
    verdict: 'Best for: Enthusiasts, vloggers, and travel photographers seeking a powerful, compact hybrid. Skip if: You require a full-frame sensor for ultimate low-light performance.',
    useCases: ['travel', 'vlog']
  },
  {
    id: 'vertex-d8',
    name: 'Vertex D8 Pro',
    brand: 'Vertex',
    type: 'DSLR',
    price: 2499,
    rating: 4.7,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?q=80&w=800&auto=format&fit=crop',
    specs: {
      sensorSize: 'Full Frame',
      resolution: '36MP',
      maxVideo: '4K / 30fps',
      codecs: '8-bit 4:2:0',
      logProfile: 'None',
      stabilizationType: 'Optical',
      ratedStops: 'Depends on lens',
      afSystem: 'Phase Detect (Optical VF)',
      subjectDetection: 'Human (Face only)',
      viewfinder: 'Optical Pentaprism',
      screen: '3.2" Fixed',
      cardSlots: 'CF (x1), SD UHS-I (x1)',
      ports: 'Mini HDMI, USB 3.0, Mic, Headphone',
      batteryLife: 'CIPA 1200 shots',
      weight: '980g'
    },
    scores: {
      imageQuality: 9.5,
      video: 6.0,
      autofocus: 8.0,
      handling: 9.5,
      value: 8.5
    },
    pros: [
      'Optical viewfinder provides zero lag',
      'Incredible battery life',
      'Rugged, weather-sealed build'
    ],
    cons: [
      'Outdated video specs',
      'Heavy body'
    ],
    verdict: 'Best for: Traditional photographers who prefer optical viewfinders and long battery life. Skip if: Video is a priority.',
    useCases: ['portrait']
  },
  {
    id: 'kinesis-go',
    name: 'Kinesis Action Go',
    brand: 'Kinesis',
    type: 'Action',
    price: 399,
    rating: 4.5,
    reviewsCount: 850,
    image: 'https://images.unsplash.com/photo-1571190144364-1da84d9ca448?q=80&w=800&auto=format&fit=crop',
    specs: {
      sensorSize: '1/1.9"',
      resolution: '27MP',
      maxVideo: '5.3K / 60fps',
      codecs: '10-bit HEVC',
      logProfile: 'Flat Profile',
      stabilizationType: 'Digital (HyperSmooth)',
      ratedStops: 'N/A',
      afSystem: 'Fixed Focus',
      subjectDetection: 'None',
      viewfinder: 'None',
      screen: '2.2" Touch (Rear), 1.4" (Front)',
      cardSlots: 'MicroSD (x1)',
      ports: 'USB-C',
      batteryLife: 'CIPA ~70 mins video',
      weight: '154g'
    },
    scores: {
      imageQuality: 7.5,
      video: 8.5,
      autofocus: 7.0,
      handling: 9.5,
      value: 9.0
    },
    pros: [
      'Incredible digital stabilization',
      'Waterproof without housing',
      'Mounts anywhere'
    ],
    cons: [
      'Poor low light performance',
      'Fixed focus lens'
    ],
    verdict: 'Best for: Action sports, POV filming, and rugged travel. Skip if: You need shallow depth of field or shoot in dark environments.',
    useCases: ['travel', 'vlog']
  }
];

const DEMO_LENSES = [
  {
    id: 'lumia-50mm',
    name: 'Lumia 50mm f/1.2 Art',
    brand: 'Lumia',
    mount: 'L-Mount',
    category: 'Prime',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=800&auto=format&fit=crop',
    specs: { focalLength: '50mm', maxAperture: 'f/1.2', stabilization: 'None' }
  },
  {
    id: 'aero-24-70',
    name: 'Aero 24-70mm f/2.8 Pro',
    brand: 'Aero',
    mount: 'A-Mount',
    category: 'Zoom',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?q=80&w=800&auto=format&fit=crop',
    specs: { focalLength: '24-70mm', maxAperture: 'f/2.8', stabilization: 'Optical' }
  },
  {
    id: 'vertex-85mm',
    name: 'Vertex 85mm f/1.4',
    brand: 'Vertex',
    mount: 'V-Mount',
    category: 'Telephoto',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=800&auto=format&fit=crop',
    specs: { focalLength: '85mm', maxAperture: 'f/1.4', stabilization: 'None' }
  },
  {
    id: 'aero-16-35',
    name: 'Aero 16-35mm f/4 Ultra-Wide',
    brand: 'Aero',
    mount: 'A-Mount',
    category: 'Wide',
    price: 999,
    image: 'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?q=80&w=800&auto=format&fit=crop',
    specs: { focalLength: '16-35mm', maxAperture: 'f/4', stabilization: 'Optical' }
  },
  {
    id: 'vertex-35mm',
    name: 'Vertex 35mm f/1.8 Compact',
    brand: 'Vertex',
    mount: 'V-Mount',
    category: 'Prime',
    price: 649,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop',
    specs: { focalLength: '35mm', maxAperture: 'f/1.8', stabilization: 'None' }
  },
  {
    id: 'lumia-100mm-macro',
    name: 'Lumia 100mm f/2.8 Macro',
    brand: 'Lumia',
    mount: 'L-Mount',
    category: 'Macro',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=800&auto=format&fit=crop',
    specs: { focalLength: '100mm', maxAperture: 'f/2.8', stabilization: 'Optical' }
  }
];

const DEMO_REVIEWS = [
  {
    id: 1,
    cameraId: 'lumia-r9',
    author: 'J.D.',
    rating: 5,
    date: 'Oct 12, 2023',
    title: 'Absolute game changer for indie film',
    body: 'The L-Log3 profile is incredibly flexible in post. The dynamic range feels closer to 15 stops. Worth every penny.',
    verified: true
  },
  {
    id: 2,
    cameraId: 'lumia-r9',
    author: 'Sarah M.',
    rating: 4,
    date: 'Sep 05, 2023',
    title: 'Great but heavy',
    body: 'Stunning image quality, but pairing it with a rig gets heavy fast. Wish the battery lasted slightly longer when shooting 8K.',
    verified: true
  },
  {
    id: 3,
    cameraId: 'aero-x5',
    author: 'Mike T.',
    rating: 5,
    date: 'Jan 22, 2024',
    title: 'Perfect hybrid camera',
    body: 'I shoot 50/50 photo and video. The autofocus is sticky and never misses an eye. Highly recommended.',
    verified: true
  },
  {
    id: 4,
    cameraId: 'vertex-d8',
    author: 'Elaine',
    rating: 3,
    date: 'Nov 11, 2023',
    title: 'Solid but aging',
    body: 'Built like a tank and takes great photos, but the lack of IBIS and modern video codecs is starting to show its age.',
    verified: false
  }
];

window.appData = {
  cameras: DEMO_CAMERAS,
  lenses: DEMO_LENSES,
  reviews: DEMO_REVIEWS
};
