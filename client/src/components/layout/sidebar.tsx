import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'fas fa-chart-line' },
  { name: 'Swarms', href: '/swarms', icon: 'fas fa-layer-group' },
  { name: 'Agents', href: '/agents', icon: 'fas fa-robot' },
  { name: 'Templates', href: '/templates', icon: 'fas fa-cubes' },
  { name: 'Security', href: '/security', icon: 'fas fa-shield-alt' },
  { name: 'Monitoring', href: '/monitoring', icon: 'fas fa-eye' },
  { name: 'API Docs', href: '/api-docs', icon: 'fas fa-code' },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 cyber-card border-r border-gray-700 flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%),
            linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Logo & Brand */}
      <div className="p-6 border-b neon-border relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-primary rounded-xl flex items-center justify-center shadow-lg relative">
            <div className="absolute inset-0 bg-primary/20 rounded-xl animate-pulse" />
            <i className="fas fa-layer-group text-white text-lg relative z-10"></i>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SwarmWare</span>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              <p className="text-xs text-muted-foreground">Neural Network OS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 relative z-10">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
              "before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300",
              isActive 
                ? "bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/50 shadow-lg" +
                  " before:bg-gradient-to-r before:from-primary/10 before:to-accent/10 before:opacity-100"
                : "text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10" +
                  " before:hover:opacity-100 before:bg-gradient-to-r before:from-primary/5 before:to-accent/5"
            )}>
              <div className="relative">
                <i className={cn(
                  item.icon, 
                  "w-5 h-5 transition-all duration-300 relative z-10",
                  isActive ? "text-primary drop-shadow-glow" : "group-hover:text-accent"
                )}></i>
                {isActive && (
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm animate-pulse" />
                )}
              </div>
              <span className={cn(
                "font-medium transition-colors duration-300",
                isActive ? "text-white" : "group-hover:text-white"
              )}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-gray-300 text-sm"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Alex Chen</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
