import swarmwareLogo from "../../assets/swarmware-logo.svg";

interface FloatingLogoProps {
  className?: string;
}

export default function FloatingLogo({ className = "" }: FloatingLogoProps) {
  return (
    <div className={`absolute top-4 right-4 opacity-30 hover:opacity-60 transition-opacity duration-500 pointer-events-none z-10 ${className}`}>
      <img 
        src={swarmwareLogo} 
        alt="SwarmWare" 
        className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-lg"
      />
    </div>
  );
}