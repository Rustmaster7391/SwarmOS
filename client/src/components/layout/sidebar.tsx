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
    <div className="w-64 bg-dark-100 border-r border-gray-700 flex flex-col">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-layer-group text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold text-white">SwarmWare</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">AI Agent Orchestration</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-gray-300 hover:bg-dark-300 hover:text-white"
              )}>
                <i className={`${item.icon} w-5`}></i>
                <span>{item.name}</span>
              </a>
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
