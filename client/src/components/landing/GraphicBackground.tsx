export default function GraphicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[20%] -left-20 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[20%] -right-20 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Code Snippets Overlay */}
      <div className="absolute inset-0 opacity-[0.03] font-mono text-[10px] leading-4 text-white p-4 select-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap animate-scrolling-text" style={{ animationDuration: `${20 + i * 2}s`, opacity: Math.random() }}>
            {`> INITIALIZING_CORE_SYSTEMS [${Math.random().toFixed(4)}] :: OPTIMIZING_CONVERSION_RATES :: DEPLOYING_ALGORITHMIC_BIDDING :: ANALYZING_USER_BEHAVIOR_MATRIX :: ROI_CALCULATION_PENDING :: DATA_STREAM_ACTIVE :: `}
            {`> INITIALIZING_CORE_SYSTEMS [${Math.random().toFixed(4)}] :: OPTIMIZING_CONVERSION_RATES :: DEPLOYING_ALGORITHMIC_BIDDING :: ANALYZING_USER_BEHAVIOR_MATRIX :: ROI_CALCULATION_PENDING :: DATA_STREAM_ACTIVE :: `}
          </div>
        ))}
      </div>
    </div>
  );
}
