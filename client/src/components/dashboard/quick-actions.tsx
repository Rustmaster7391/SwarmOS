import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onDeployTemplate?: () => void;
  onCreateAgent?: () => void;
  onViewSecurityReport?: () => void;
  onOpenApiDocs?: () => void;
}

export default function QuickActions({ 
  onDeployTemplate, 
  onCreateAgent, 
  onViewSecurityReport, 
  onOpenApiDocs 
}: QuickActionsProps) {
  const actions = [
    {
      title: "Deploy Template",
      description: "Start with pre-built swarms",
      icon: "fas fa-rocket",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      hoverBg: "group-hover:bg-primary/30",
      onClick: onDeployTemplate
    },
    {
      title: "Create Agent",
      description: "Build custom AI agents",
      icon: "fas fa-plus-circle",
      iconBg: "bg-success/20",
      iconColor: "text-success",
      hoverBg: "group-hover:bg-success/30",
      onClick: onCreateAgent
    },
    {
      title: "Security Report",
      description: "View Swarm Shield status",
      icon: "fas fa-shield-alt",
      iconBg: "bg-warning/20",
      iconColor: "text-warning",
      hoverBg: "group-hover:bg-warning/30",
      onClick: onViewSecurityReport
    },
    {
      title: "API Docs",
      description: "Integration guides",
      icon: "fas fa-book",
      iconBg: "bg-accent/20",
      iconColor: "text-accent",
      hoverBg: "group-hover:bg-accent/30",
      onClick: onOpenApiDocs
    }
  ];

  return (
    <Card className="bg-dark-100 border-gray-700 card-glow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <i className="fas fa-bolt mr-2 icon-glow"></i>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left p-4 h-auto bg-dark-300 hover:bg-dark-200 border border-gray-600 group justify-start card-glow hover:card-glow transition-all duration-300"
              onClick={action.onClick}
            >
              <div className="flex items-center space-x-3">
                <div className={`${action.iconBg} ${action.hoverBg} p-2 rounded-lg transition-colors gradient-border`}>
                  <i className={`${action.icon} ${action.iconColor} icon-glow`}></i>
                </div>
                <div>
                  <p className="font-medium text-white">{action.title}</p>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
