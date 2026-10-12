// Membership and Pricing Data for NEXUS PLAY
// Concept developed by Kadam Digital

export const MEMBERSHIP_PLANS = [
  {
    id: 'free',
    name: 'FREE EXPLORER',
    price: '₹0',
    billingPeriod: 'Forever Free',
    badge: 'Popular for Casuals',
    highlight: false,
    description: 'Perfect for instant casual fun. Enjoy complete access to all responsive browser-based games and explore catalogue previews.',
    perks: [
      'Unlimited instant access to all browser games (Snake, Memory, Dodge)',
      'Basic game catalogue discovery and search',
      'Save local favourites and personal high scores',
      'Access to designated free cloud concept demos',
      'Standard guest profile dashboard',
      'No account registration or payment required',
    ],
    ctaText: 'Current Default Tier',
    accentColor: '#9CA8BD',
    isCurrentDefault: true,
  },
  {
    id: 'plus',
    name: 'NEXUS PLUS',
    price: '₹299',
    billingPeriod: 'per month (illustrative)',
    badge: 'Concept Tier',
    highlight: true,
    description: 'Designed for enthusiastic gamers seeking expanded catalogue exploration, prioritized latency testing, and enhanced organization.',
    perks: [
      'All Free Explorer perks included',
      'Full concept access to premium cloud game previews',
      'Enhanced library organisation & custom collection filters',
      'Simulated 1080p 60 FPS cloud stream profile tester',
      'Additional demo feature showcases',
      'Custom player avatar and profile banner accents',
    ],
    ctaText: 'Simulate Plus Tier',
    accentColor: '#8B5CF6',
    isCurrentDefault: false,
  },
  {
    id: 'ultimate',
    name: 'NEXUS ULTIMATE',
    price: '₹599',
    billingPeriod: 'per month (illustrative)',
    badge: 'Concept Flagship',
    highlight: false,
    description: 'The ultimate cloud gaming concept experience with top-tier streaming profiles, priority queues, and full customization.',
    perks: [
      'Everything in Nexus Plus included',
      'Concept premium catalogue full access & VIP previews',
      'Expanded profile customisation (animated banners, badges)',
      'Simulated 4K 60 FPS / 1440p 120 FPS streaming pipeline tester',
      'Priority-style interface telemetry & diagnostic panel',
      'Simulated multi-device session sync simulation',
    ],
    ctaText: 'Simulate Ultimate Tier',
    accentColor: '#22D3EE',
    isCurrentDefault: false,
  },
];

export const MEMBERSHIP_DISCLAIMER = {
  title: 'Portfolio Concept Notice & Payment Transparency',
  notice: 'All membership plans and pricing displayed on NEXUS PLAY (e.g., ₹299/mo, ₹599/mo) are strictly illustrative concept models created for the Kadam Digital portfolio demonstration. No real financial transactions, payment gateways, credit card processing, or commercial game licensing are implemented in this client-side web application.',
  technicalExplanation: 'In a production commercial deployment, actual membership access would require real backend user authentication (OAuth / JWT), payment processor integration (Stripe / Razorpay), entitlement verification services, and distributed cloud edge streaming infrastructure.',
};
