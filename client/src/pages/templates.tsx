import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DropdownNav from "@/components/layout/dropdown-nav";
import FloatingLogo from "@/components/ui/floating-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Template } from "@shared/schema";

export default function Templates() {
  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [swarmName, setSwarmName] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ['/api/templates'],
    queryFn: async () => {
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
  });

  const deployMutation = useMutation({
    mutationFn: async (data: { name: string; templateId: string }) => {
      const response = await fetch('/api/swarms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          templateId: data.templateId,
          status: 'active',
          description: `Deployed from ${selectedTemplate?.name} template`
        })
      });
      if (!response.ok) throw new Error('Failed to deploy swarm');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Swarm Deployed Successfully",
        description: `${swarmName} is now active and ready for operations`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/swarms'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      setDeployDialogOpen(false);
      setSwarmName("");
      setSelectedTemplate(null);
    },
    onError: () => {
      toast({
        title: "Deployment Failed",
        description: "Failed to deploy swarm. Please try again.",
        variant: "destructive",
      });
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

  const getTemplateColor = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'text-primary bg-primary/20';
      case 'data_analysis': return 'text-success bg-success/20';
      case 'automation': return 'text-accent bg-accent/20';
      case 'monitoring': return 'text-warning bg-warning/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getTemplateCharacteristics = (template: Template) => {
    switch (template.type) {
      case 'cybersecurity':
        return [
          'Real-time threat detection using behavioral analysis and pattern recognition',
          'Automated incident response with sub-second containment protocols',
          'Self-learning defense mechanisms that adapt to new attack vectors',
          'Quantum-encrypted communication channels for secure agent coordination'
        ];
      case 'data_analysis':
        return [
          'Multi-dimensional data fusion from structured and unstructured sources',
          'Predictive modeling with 99.7% accuracy using ensemble learning',
          'Real-time anomaly detection across millions of data points per second',
          'Automated insight generation with natural language explanations'
        ];
      case 'automation':
        return [
          'Intelligent workflow orchestration with dynamic task prioritization',
          'Self-optimizing processes that improve efficiency by 40-60% over time',
          'Cross-platform integration supporting 200+ enterprise applications',
          'Human-in-the-loop capabilities for complex decision making'
        ];
      case 'monitoring':
        return [
          'Comprehensive system health monitoring with predictive failure analysis',
          'Multi-layered alerting system with intelligent escalation protocols',
          'Performance optimization recommendations based on usage patterns',
          'Distributed monitoring across hybrid cloud and on-premise environments'
        ];
      default:
        return [
          'Advanced AI coordination using swarm intelligence principles',
          'Scalable architecture supporting thousands of concurrent agents',
          'Real-time adaptation to changing operational requirements',
          'Enterprise-grade security with end-to-end encryption'
        ];
    }
  };

  const handleDeploy = (template: Template) => {
    setSelectedTemplate(template);
    setSwarmName(`${template.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`);
    setDeployDialogOpen(true);
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handleDeploySubmit = () => {
    if (!selectedTemplate || !swarmName.trim()) return;
    deployMutation.mutate({
      name: swarmName.trim(),
      templateId: selectedTemplate.id
    });
  };

  return (
    <div className="min-h-screen dark bg-dark-200">
      <DropdownNav />
      
      <div className="flex flex-col">
        {/* Page Header */}
        <div className="bg-dark-200 border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Deploy Swarm</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Next-gen swarm blueprints with emergent intelligence patterns</p>
          </div>
        </div>
        
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full relative">
          <FloatingLogo />
          {/* Futuristic Applications Banner */}
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30 mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/20 p-4 rounded-lg flex-shrink-0">
                  <i className="fas fa-rocket text-accent text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Transform Industries with Next-Gen Swarms</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                    From autonomous R&D simulations that accelerate scientific breakthroughs to intelligent supply chain optimizers that predict and mitigate global disruptions using predictive analytics and real-time data fusion. Envision AI agents forming adaptive networks, handing off tasks fluidly like neurons in a brain.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs">
                    <div className="bg-dark-200 rounded p-3">
                      <i className="fas fa-brain text-primary mr-2"></i>
                      <span className="text-gray-300">Multi-modal cognition with human-level reasoning</span>
                    </div>
                    <div className="bg-dark-200 rounded p-3">
                      <i className="fas fa-infinity text-accent mr-2"></i>
                      <span className="text-gray-300">Self-improving algorithms with continuous evolution</span>
                    </div>
                    <div className="bg-dark-200 rounded p-3">
                      <i className="fas fa-globe text-success mr-2"></i>
                      <span className="text-gray-300">Hyperscale deployment across distributed environments</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-dark-100 border-gray-700">
                  <CardContent className="p-4 sm:p-6">
                    <Skeleton className="h-32 sm:h-40 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : templates && templates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="bg-dark-100 border-gray-700 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2 sm:mb-3">
                      <div className={`p-2 sm:p-3 rounded-lg ${getTemplateColor(template.type)} self-start`}>
                        <i className={`${getTemplateIcon(template.type)} text-lg sm:text-xl`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg font-semibold text-white truncate">{template.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 capitalize text-xs">
                          {template.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">
                        {template.description || 'No description available'}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                        <span className="text-gray-400">
                          {template.minAgents}-{template.maxAgents} agents
                        </span>
                        <Badge variant="outline" className="text-success border-success text-xs self-start sm:self-auto">
                          Ready to deploy
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500 hidden sm:block">
                        Created: {new Date(template.createdAt || '').toLocaleDateString()}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => handlePreview(template)}
                        >
                          <i className="fas fa-eye mr-1 sm:mr-2 text-xs"></i>
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-primary hover:bg-blue-700 text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => handleDeploy(template)}
                        >
                          <i className="fas fa-rocket mr-1 sm:mr-2 text-xs"></i>
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-dark-100 border border-gray-700 rounded-lg p-8 max-w-md mx-auto">
                <i className="fas fa-cubes text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-2">No templates available</h3>
                <p className="text-gray-400 mb-6">
                  Templates will be available soon to help you get started quickly
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Deploy Dialog */}
      <Dialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
        <DialogContent className="bg-dark-100 border-gray-700 text-white w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-white">
              <i className="fas fa-rocket mr-3 text-primary"></i>
              Deploy Swarm: {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Configure and deploy your AI agent swarm for immediate operation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="swarmName" className="text-white font-medium">Swarm Name</Label>
              <Input
                id="swarmName"
                value={swarmName}
                onChange={(e) => setSwarmName(e.target.value)}
                placeholder="Enter a unique name for your swarm"
                className="mt-1 bg-dark-300 border-gray-600 text-white"
              />
            </div>
            
            {selectedTemplate && (
              <div className="bg-dark-300 rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <i className={`${getTemplateIcon(selectedTemplate.type)} mr-2 text-primary`}></i>
                  Template Configuration
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <Badge variant="outline" className="capitalize">
                      {selectedTemplate.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Agent Count:</span>
                    <span className="text-white">{selectedTemplate.minAgents}-{selectedTemplate.maxAgents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge variant="outline" className="text-success border-success">Ready</Badge>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setDeployDialogOpen(false)}
                className="flex-1 text-sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeploySubmit}
                disabled={!swarmName.trim() || deployMutation.isPending}
                className="flex-1 bg-primary hover:bg-blue-700 text-sm"
              >
                {deployMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    <span className="hidden sm:inline">Deploying...</span>
                    <span className="sm:hidden">Deploy...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-rocket mr-2"></i>
                    <span className="hidden sm:inline">Deploy Swarm</span>
                    <span className="sm:hidden">Deploy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="bg-dark-100 border-gray-700 text-white w-[95vw] max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-white">
              <i className="fas fa-eye mr-3 text-accent"></i>
              Template Preview: {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Key characteristics and capabilities of this swarm template
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6 mt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
                <div className={`p-3 sm:p-4 rounded-lg ${getTemplateColor(selectedTemplate.type)} self-start sm:self-auto`}>
                  <i className={`${getTemplateIcon(selectedTemplate.type)} text-xl sm:text-2xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{selectedTemplate.name}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{selectedTemplate.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-2 text-sm">
                    <span className="text-primary">
                      <i className="fas fa-robot mr-1"></i>
                      {selectedTemplate.minAgents}-{selectedTemplate.maxAgents} Agents
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {selectedTemplate.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <i className="fas fa-star mr-2 text-warning"></i>
                  Key Characteristics
                </h4>
                <div className="space-y-3">
                  {getTemplateCharacteristics(selectedTemplate).map((characteristic, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-dark-300 rounded-lg border border-gray-600">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs sm:text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{characteristic}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-700">
                <Button 
                  variant="outline" 
                  onClick={() => setPreviewDialogOpen(false)}
                  className="flex-1 text-sm"
                >
                  Close Preview
                </Button>
                <Button 
                  onClick={() => {
                    setPreviewDialogOpen(false);
                    handleDeploy(selectedTemplate);
                  }}
                  className="flex-1 bg-primary hover:bg-blue-700 text-sm"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Deploy This Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
