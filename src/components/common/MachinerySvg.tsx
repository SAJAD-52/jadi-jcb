import React from 'react';

interface MachinerySvgProps {
  type: string;
  className?: string;
}

export const MachinerySvg: React.FC<MachinerySvgProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'jcb_3cx':
    case 'backhoe_loader':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ground shadow */}
          <ellipse cx="200" cy="215" rx="160" ry="12" fill="#000000" fillOpacity="0.4" />
          
          {/* Rear Digger Arm (JCB Signature) */}
          <path d="M70 170 L40 120 L25 80 L15 110 L30 160 Z" fill="#F59E0B" />
          <circle cx="40" cy="120" r="5" fill="#334155" />
          <circle cx="25" cy="80" r="4" fill="#334155" />
          <path d="M15 110 L5 125 L18 140 Z" fill="#1E293B" /> {/* Bucket */}

          {/* Machine Body & Cabin */}
          <rect x="90" y="110" width="130" height="60" rx="8" fill="#F59E0B" />
          <path d="M110 110 L130 65 L190 65 L200 110 Z" fill="#0F172A" stroke="#F59E0B" strokeWidth="4" />
          {/* Cabin glass */}
          <path d="M125 105 L138 72 L185 72 L192 105 Z" fill="#38BDF8" fillOpacity="0.3" stroke="#94A3B8" strokeWidth="1.5" />
          
          {/* Engine Hood & Grille */}
          <path d="M210 120 L280 120 L290 170 L210 170 Z" fill="#F59E0B" />
          <rect x="250" y="130" width="28" height="25" rx="2" fill="#0F172A" />
          {/* JCB Stripe */}
          <rect x="100" y="145" width="160" height="8" fill="#0F172A" />
          <text x="145" y="152" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">JADI JCB</text>
          
          {/* Front Loader Arm & Bucket */}
          <path d="M220 150 L310 140 L345 160" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />
          <path d="M335 140 L375 140 L380 185 L335 185 Z" fill="#1E293B" /> {/* Front bucket */}
          <path d="M375 140 L380 148 L375 156 L380 164 L375 172 L380 180" stroke="#F59E0B" strokeWidth="3" /> {/* Teeth */}

          {/* Large Rear Wheel */}
          <circle cx="115" cy="180" r="32" fill="#0F172A" />
          <circle cx="115" cy="180" r="22" fill="#1E293B" />
          <circle cx="115" cy="180" r="14" fill="#F59E0B" />
          <circle cx="115" cy="180" r="6" fill="#0F172A" />
          {/* Deep treads */}
          <path d="M90 175 L85 185 M140 175 L145 185 M115 150 L115 155 M115 205 L115 210" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

          {/* Front Wheel */}
          <circle cx="260" cy="185" r="24" fill="#0F172A" />
          <circle cx="260" cy="185" r="16" fill="#1E293B" />
          <circle cx="260" cy="185" r="10" fill="#F59E0B" />
          <circle cx="260" cy="185" r="4" fill="#0F172A" />

          {/* Exhaust pipe */}
          <rect x="215" y="85" width="6" height="30" fill="#334155" />
          <path d="M221 85 L225 80" stroke="#334155" strokeWidth="3" />
        </svg>
      );

    case 'crawler_excavator':
    case 'komatsu_pc210':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="200" cy="220" rx="160" ry="12" fill="#000000" fillOpacity="0.4" />
          {/* Tracks */}
          <rect x="90" y="180" width="180" height="34" rx="17" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <circle cx="110" cy="197" r="12" fill="#334155" />
          <circle cx="150" cy="197" r="10" fill="#475569" />
          <circle cx="180" cy="197" r="10" fill="#475569" />
          <circle cx="210" cy="197" r="10" fill="#475569" />
          <circle cx="250" cy="197" r="12" fill="#334155" />
          {/* Track treads */}
          <path d="M95 180 L265 180 M95 214 L265 214" stroke="#64748B" strokeWidth="2" strokeDasharray="6 4" />
          
          {/* Upper Body Turret */}
          <path d="M110 180 L110 135 L260 135 L265 180 Z" fill="#F59E0B" />
          {/* Counterweight */}
          <rect x="110" y="130" width="45" height="50" rx="4" fill="#1E293B" />
          {/* Cabin */}
          <path d="M190 135 L190 95 L245 95 L255 135 Z" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <rect x="195" y="100" width="45" height="30" rx="2" fill="#38BDF8" fillOpacity="0.3" stroke="#94A3B8" strokeWidth="1" />
          
          {/* Boom and Arm */}
          <path d="M245 150 L290 85 L350 120" stroke="#F59E0B" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="290" cy="85" r="6" fill="#1E293B" />
          <path d="M350 120 L370 170" stroke="#F59E0B" strokeWidth="10" strokeLinecap="round" />
          <circle cx="350" cy="120" r="5" fill="#1E293B" />
          {/* Excavator Bucket */}
          <path d="M365 170 L345 195 L375 210 L385 185 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          <path d="M345 195 L340 205 L350 207 L360 210" stroke="#F59E0B" strokeWidth="3" />
        </svg>
      );

    case 'wheel_loader':
    case 'cat_966h':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="200" cy="220" rx="160" ry="12" fill="#000000" fillOpacity="0.4" />
          {/* Chassis */}
          <rect x="110" y="130" width="130" height="50" rx="6" fill="#F59E0B" />
          {/* Central Articulation Joint */}
          <circle cx="185" cy="155" r="7" fill="#0F172A" />
          {/* Cabin */}
          <path d="M145 130 L160 80 L210 80 L220 130 Z" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
          <rect x="165" y="85" width="40" height="40" rx="3" fill="#38BDF8" fillOpacity="0.3" stroke="#94A3B8" strokeWidth="1" />
          {/* Front loader arm */}
          <path d="M210 145 L290 135 L330 170" stroke="#F59E0B" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          {/* Giant Bucket */}
          <path d="M320 150 L375 140 L380 205 L315 205 Z" fill="#1E293B" />
          
          {/* Massive Wheels */}
          <circle cx="130" cy="180" r="34" fill="#0F172A" />
          <circle cx="130" cy="180" r="22" fill="#F59E0B" />
          <circle cx="130" cy="180" r="8" fill="#0F172A" />
          
          <circle cx="250" cy="180" r="34" fill="#0F172A" />
          <circle cx="250" cy="180" r="22" fill="#F59E0B" />
          <circle cx="250" cy="180" r="8" fill="#0F172A" />
        </svg>
      );

    case 'telescopic_handler':
    case 'jcb_telescopic':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="200" cy="220" rx="160" ry="12" fill="#000000" fillOpacity="0.4" />
          {/* Main Body */}
          <rect x="100" y="125" width="150" height="55" rx="8" fill="#F59E0B" />
          {/* Cabin on left */}
          <path d="M175 125 L185 75 L235 75 L245 125 Z" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
          <rect x="190" y="80" width="40" height="40" rx="2" fill="#38BDF8" fillOpacity="0.3" />
          {/* High Telescopic Boom extending up and right */}
          <path d="M110 120 L310 60" stroke="#F59E0B" strokeWidth="18" strokeLinecap="round" />
          <path d="M280 68 L360 45" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
          {/* Fork Carriage */}
          <path d="M355 45 L355 85 L385 85" stroke="#1E293B" strokeWidth="6" strokeLinecap="square" />
          {/* Four equal big steering wheels */}
          <circle cx="130" cy="180" r="30" fill="#0F172A" />
          <circle cx="130" cy="180" r="18" fill="#F59E0B" />
          <circle cx="230" cy="180" r="30" fill="#0F172A" />
          <circle cx="230" cy="180" r="18" fill="#F59E0B" />
        </svg>
      );

    case 'spare_parts':
    case 'jcb_pump_part':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="200" cy="215" rx="120" ry="10" fill="#000000" fillOpacity="0.4" />
          {/* Heavy Machined Hydraulic Cast Iron Body */}
          <rect x="130" y="70" width="140" height="110" rx="12" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <rect x="150" y="85" width="100" height="80" rx="8" fill="#1E293B" />
          {/* Dual Gear Chambers */}
          <circle cx="175" cy="125" r="25" fill="#475569" stroke="#F59E0B" strokeWidth="3" />
          <circle cx="225" cy="125" r="25" fill="#475569" stroke="#F59E0B" strokeWidth="3" />
          <circle cx="175" cy="125" r="8" fill="#F59E0B" />
          <circle cx="225" cy="125" r="8" fill="#F59E0B" />
          {/* High Pressure Inlets / Flanges */}
          <rect x="100" y="110" width="30" height="30" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="115" cy="125" r="8" fill="#F59E0B" />
          <rect x="270" y="110" width="30" height="30" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="285" cy="125" r="8" fill="#F59E0B" />
          {/* Splined Drive Shaft */}
          <rect x="185" y="40" width="30" height="30" rx="4" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <path d="M190 40 L190 70 M200 40 L200 70 M210 40 L210 70" stroke="#0F172A" strokeWidth="2" />
          {/* JCB Genuine hologram badge */}
          <rect x="165" y="172" width="70" height="15" rx="3" fill="#F59E0B" />
          <text x="175" y="183" fill="#0F172A" fontSize="8" fontWeight="bold" fontFamily="sans-serif">GENUINE JCB</text>
        </svg>
      );

    case 'dump_truck':
    case 'mercedes_arocs':
    default:
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="200" cy="220" rx="160" ry="12" fill="#000000" fillOpacity="0.4" />
          {/* Cabin */}
          <rect x="80" y="90" width="70" height="95" rx="6" fill="#F59E0B" />
          <rect x="85" y="95" width="45" height="40" rx="4" fill="#38BDF8" fillOpacity="0.3" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="80" y="150" width="60" height="25" rx="2" fill="#0F172A" />
          {/* Dump Box */}
          <path d="M165 95 L320 95 L300 175 L165 175 Z" fill="#334155" stroke="#475569" strokeWidth="3" />
          <path d="M165 95 L150 175" stroke="#F59E0B" strokeWidth="6" />
          {/* Wheels: 3 Axles (6x4) */}
          <circle cx="115" cy="185" r="24" fill="#0F172A" />
          <circle cx="115" cy="185" r="14" fill="#F59E0B" />
          <circle cx="230" cy="185" r="24" fill="#0F172A" />
          <circle cx="230" cy="185" r="14" fill="#F59E0B" />
          <circle cx="280" cy="185" r="24" fill="#0F172A" />
          <circle cx="280" cy="185" r="14" fill="#F59E0B" />
        </svg>
      );
  }
};
