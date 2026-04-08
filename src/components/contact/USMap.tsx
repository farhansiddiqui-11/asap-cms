export default function USMap() {
  return (
    <svg viewBox="0 0 960 600" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* US States */}
      <g fill="#182b50" stroke="#243860" strokeWidth="0.8" strokeLinejoin="round">
        {/* Washington */}
        <path d="M108,70 L195,70 L205,68 L215,72 L218,95 L210,100 L200,108 L180,115 L140,118 L125,110 L108,95 Z" />
        {/* Oregon */}
        <path d="M108,95 L125,110 L140,118 L180,115 L200,108 L210,100 L218,95 L220,130 L215,160 L210,175 L108,175 Z" />
        {/* California */}
        <path d="M108,175 L210,175 L215,200 L218,230 L210,260 L200,290 L185,320 L175,345 L165,365 L155,385 L145,395 L130,400 L120,390 L115,370 L110,340 L108,300 Z" />
        {/* Nevada */}
        <path d="M210,175 L280,175 L270,270 L250,345 L218,345 L200,290 L210,260 L218,230 L215,200 Z" />
        {/* Idaho */}
        <path d="M218,95 L280,80 L290,85 L285,120 L290,160 L280,175 L210,175 L215,160 L220,130 Z" />
        {/* Utah */}
        <path d="M280,175 L350,175 L350,290 L250,345 L270,270 Z" />
        {/* Arizona */}
        <path d="M218,345 L250,345 L350,290 L350,390 L330,410 L310,420 L280,425 L240,420 L220,410 L210,395 Z" />
        {/* Montana */}
        <path d="M280,80 L420,65 L425,80 L420,120 L290,120 L285,120 L290,85 Z" />
        {/* Wyoming */}
        <path d="M290,120 L420,120 L420,195 L290,195 L290,160 Z" />
        {/* Colorado */}
        <path d="M290,195 L420,195 L420,280 L350,290 L350,175 L290,195" />
        <path d="M350,175 L420,195 L420,280 L350,290 Z" />
        {/* New Mexico */}
        <path d="M350,290 L420,280 L420,400 L395,420 L330,420 L330,410 L350,390 Z" />
        {/* North Dakota */}
        <path d="M420,65 L540,60 L540,115 L425,115 L425,80 Z" />
        {/* South Dakota */}
        <path d="M425,115 L540,115 L540,170 L420,170 L420,120 Z" />
        {/* Nebraska */}
        <path d="M420,170 L540,170 L545,220 L425,225 L420,195 Z" />
        {/* Kansas */}
        <path d="M425,225 L545,220 L545,280 L420,280 Z" />
        {/* Oklahoma */}
        <path d="M420,280 L545,280 L545,330 L530,340 L510,345 L480,350 L440,350 L420,340 L395,340 L395,310 L420,300 Z" />
        {/* Texas */}
        <path d="M395,340 L420,340 L440,350 L480,350 L510,345 L530,340 L545,330 L555,345 L560,370 L555,400 L545,430 L530,455 L510,475 L490,485 L470,490 L450,480 L430,465 L420,445 L410,430 L395,420 Z" />
        {/* Minnesota */}
        <path d="M540,60 L625,55 L630,60 L635,100 L635,150 L540,155 L540,115 Z" />
        {/* Iowa */}
        <path d="M540,155 L635,150 L640,200 L545,210 L545,170 L540,170 Z" />
        {/* Missouri */}
        <path d="M545,210 L640,200 L648,220 L650,260 L645,280 L640,300 L545,280 Z" />
        {/* Arkansas */}
        <path d="M545,280 L640,300 L640,350 L555,345 L545,330 Z" />
        {/* Louisiana */}
        <path d="M555,345 L640,350 L645,380 L650,400 L640,415 L625,420 L610,410 L595,415 L580,408 L570,395 L560,370 Z" />
        {/* Wisconsin */}
        <path d="M625,55 L680,50 L700,60 L705,90 L700,130 L635,135 L635,100 L630,60 Z" />
        {/* Illinois */}
        <path d="M635,135 L700,130 L705,155 L700,200 L695,230 L680,250 L648,220 L640,200 L635,150 Z" />
        {/* Michigan - Lower */}
        <path d="M700,60 L730,55 L745,80 L750,120 L740,145 L720,135 L705,130 L705,90 Z" />
        {/* Michigan - Upper */}
        <path d="M640,45 L680,40 L710,42 L700,55 L680,50 L640,50 Z" />
        {/* Indiana */}
        <path d="M700,130 L740,145 L740,220 L695,230 L700,200 L705,155 Z" />
        {/* Ohio */}
        <path d="M740,120 L780,115 L790,140 L790,200 L770,215 L740,220 L740,145 L750,120 Z" />
        {/* Kentucky */}
        <path d="M680,250 L695,230 L740,220 L770,215 L790,200 L800,220 L790,250 L770,260 L740,270 L710,275 L690,270 Z" />
        {/* Tennessee */}
        <path d="M680,270 L690,270 L710,275 L740,270 L770,260 L790,250 L800,260 L800,290 L680,295 Z" />
        {/* Mississippi */}
        <path d="M640,300 L680,295 L680,370 L675,390 L660,395 L645,380 L640,350 Z" />
        {/* Alabama */}
        <path d="M680,295 L730,290 L735,370 L720,385 L695,390 L680,395 L675,390 L680,370 Z" />
        {/* Georgia */}
        <path d="M730,290 L780,280 L790,300 L790,350 L780,375 L760,385 L735,390 L735,370 L730,290" />
        {/* Florida */}
        <path d="M695,390 L720,385 L735,390 L760,385 L780,375 L790,380 L795,395 L790,415 L780,430 L770,450 L755,470 L740,480 L730,475 L725,455 L720,435 L710,420 L700,410 Z" />
        {/* South Carolina */}
        <path d="M780,280 L820,265 L830,280 L815,305 L790,320 L790,300 Z" />
        {/* North Carolina */}
        <path d="M780,250 L800,260 L820,255 L850,245 L870,240 L865,260 L840,270 L820,265 L780,280 L770,260 L790,250" />
        {/* Virginia */}
        <path d="M790,200 L820,195 L850,200 L870,215 L870,235 L870,240 L850,245 L820,255 L800,260 L790,250 L800,220 Z" />
        {/* West Virginia */}
        <path d="M790,200 L800,190 L810,195 L820,195 L810,220 L800,230 L790,240 L790,250 L800,220 Z" />
        {/* Pennsylvania */}
        <path d="M780,115 L860,108 L870,115 L870,160 L800,165 L790,155 L790,140 Z" />
        {/* New York */}
        <path d="M800,55 L830,50 L860,55 L880,65 L890,80 L880,95 L870,108 L860,108 L780,115 L780,80 L790,60 Z" />
        {/* Vermont */}
        <path d="M860,40 L870,38 L875,55 L870,75 L860,55 Z" />
        {/* New Hampshire */}
        <path d="M870,38 L880,36 L885,50 L880,70 L875,55 L870,38" />
        {/* Maine */}
        <path d="M880,10 L900,8 L910,20 L905,45 L895,55 L885,50 L880,36 L870,38 L860,40 L865,25 Z" />
        {/* Massachusetts */}
        <path d="M870,75 L880,70 L890,72 L900,78 L895,85 L880,88 L870,85 Z" />
        {/* Connecticut */}
        <path d="M870,85 L880,88 L885,95 L878,100 L870,100 Z" />
        {/* Rhode Island */}
        <path d="M890,82 L895,85 L893,92 L888,92 Z" />
        {/* New Jersey */}
        <path d="M860,108 L870,108 L870,115 L875,130 L870,145 L860,140 L858,125 Z" />
        {/* Delaware */}
        <path d="M855,155 L862,150 L865,160 L860,168 Z" />
        {/* Maryland */}
        <path d="M800,165 L870,160 L865,175 L850,180 L830,185 L820,195 L810,195 L800,190 Z" />
        {/* DC */}
        <circle cx="840" cy="188" r="3" fill="#243860" stroke="#2a4570" />
      </g>

      {/* Dotted connection lines between offices */}
      {/* Everett, WA (172, 82) to Anaheim, CA (168, 360) */}
      <line x1="172" y1="82" x2="168" y2="360" stroke="#4a6a8e" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
      {/* Anaheim, CA (168, 360) to Macon, GA (748, 340) */}
      <line x1="168" y1="360" x2="748" y2="340" stroke="#4a6a8e" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
      {/* Everett, WA (172, 82) to Macon, GA (748, 340) */}
      <line x1="172" y1="82" x2="748" y2="340" stroke="#4a6a8e" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />

      {/* Location markers */}
      {/* Everett, WA */}
      <circle cx="172" cy="82" r="10" fill="none" stroke="#5a8abf" strokeWidth="1" opacity="0.4" />
      <circle cx="172" cy="82" r="5" fill="#3a6a9e" opacity="0.8" />
      <circle cx="172" cy="82" r="2.5" fill="white" />

      {/* Anaheim, CA - Southern California */}
      <circle cx="168" cy="360" r="10" fill="none" stroke="#5a8abf" strokeWidth="1" opacity="0.4" />
      <circle cx="168" cy="360" r="5" fill="#3a6a9e" opacity="0.8" />
      <circle cx="168" cy="360" r="2.5" fill="white" />

      {/* Macon, GA */}
      <circle cx="748" cy="340" r="10" fill="none" stroke="#5a8abf" strokeWidth="1" opacity="0.4" />
      <circle cx="748" cy="340" r="5" fill="#3a6a9e" opacity="0.8" />
      <circle cx="748" cy="340" r="2.5" fill="white" />

      {/* Location labels */}
      <text x="105" y="130" fill="#5a7a9e" fontSize="11" fontFamily="'Microsoft Sans Serif', sans-serif" letterSpacing="0.1em">EVERETT, WA</text>
      <text x="95" y="410" fill="#5a7a9e" fontSize="11" fontFamily="'Microsoft Sans Serif', sans-serif" letterSpacing="0.1em">ANAHEIM, CA</text>
      <text x="770" y="335" fill="#5a7a9e" fontSize="11" fontFamily="'Microsoft Sans Serif', sans-serif" letterSpacing="0.1em">MACON, GA</text>

      {/* Legend - bottom left */}
      <line x1="40" y1="560" x2="70" y2="560" stroke="#4a6a8e" strokeWidth="2" />
      <line x1="75" y1="560" x2="120" y2="560" stroke="#1a6fff" strokeWidth="2" />
      <text x="40" y="575" fill="#3a5a7e" fontSize="8" fontFamily="'Microsoft Sans Serif', sans-serif">0</text>
      <text x="70" y="575" fill="#3a5a7e" fontSize="8" fontFamily="'Microsoft Sans Serif', sans-serif">500</text>
      <text x="110" y="575" fill="#3a5a7e" fontSize="8" fontFamily="'Microsoft Sans Serif', sans-serif">1000 mi</text>

      {/* Legend - bottom right */}
      <circle cx="870" cy="558" r="4" fill="none" stroke="#5a8abf" strokeWidth="1" opacity="0.6" />
      <circle cx="870" cy="558" r="2" fill="#5a8abf" />
      <text x="880" y="562" fill="#3a5a7e" fontSize="9" fontFamily="'Microsoft Sans Serif', sans-serif">ASAP Office</text>
      <line x1="862" y1="575" x2="878" y2="575" stroke="#4a6a8e" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      <text x="880" y="578" fill="#3a5a7e" fontSize="9" fontFamily="'Microsoft Sans Serif', sans-serif">Network Link</text>
    </svg>
  );
}
