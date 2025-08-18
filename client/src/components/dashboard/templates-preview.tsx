import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Template } from "@shared/schema";

export default function TemplatesPreview() {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ['/api/templates'],
    queryFn: async () => {
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
  });

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'fas fa-shield-alt';
      case 'data_analysis': return 'fas fa-chart-bar';
      case 'automation': return 'fas fa-cogs';
      case 'monitoring': return 'fas fa-eye';
      default: return 'fas fa-cubes';
    }
  };

  const getTemplateIconColor = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'text-primary';
      case 'data_analysis': return 'text-success';
      case 'automation': return 'text-accent';
      case 'monitoring': return 'text-warning';
      default: return 'text-gray-400';
    }
  };

  const getTemplateIconBg = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'bg-primary/20 group-hover:bg-primary/30';
      case 'data_analysis': return 'bg-success/20 group-hover:bg-success/30';
      case 'automation': return 'bg-accent/20 group-hover:bg-accent/30';
      case 'monitoring': return 'bg-warning/20 group-hover:bg-warning/30';
      default: return 'bg-gray-600/20 group-hover:bg-gray-600/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-dark-100 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">Popular Templates</CardTitle>
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show only first 3 templates
  const popularTemplates = templates?.slice(0, 3) || [];

  return (
    <Card className="bg-dark-100 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Popular Templates</CardTitle>
          <Button variant="link" className="text-primary hover:text-blue-400 text-sm p-0">
            Browse All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTemplates.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              <i className="fas fa-cubes text-3xl mb-2"></i>
              <p>No templates available</p>
              <p className="text-sm">Check back later for pre-built templates</p>
            </div>
          ) : (
            popularTemplates.map((template) => (
              <Button
                key={template.id}
                variant="ghost"
                className="p-4 h-auto bg-dark-300 hover:bg-dark-200 border border-gray-600 hover:border-primary/50 transition-colors cursor-pointer group justify-start"
              >
                <div className="w-full">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`${getTemplateIconBg(template.type)} p-2 rounded-lg transition-colors`}>
                      <i className={`${getTemplateIcon(template.type)} ${getTemplateIconColor(template.type)}`}></i>
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-white">{template.name}</h4>
                      <p className="text-xs text-gray-400 capitalize">{template.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3 text-left">
                    {template.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {template.minAgents}-{template.maxAgents} agents
                    </span>
                    <span className="text-success">Ready to deploy</span>
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
