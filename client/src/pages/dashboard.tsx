import { useState } from "react";
import DropdownNav from "@/components/layout/dropdown-nav";
import TopBar from "@/components/layout/topbar";
import StatsCards from "@/components/dashboard/stats-cards";
import SwarmActivity from "@/components/dashboard/swarm-activity";
import QuickActions from "@/components/dashboard/quick-actions";
import ActiveSwarms from "@/components/dashboard/active-swarms";
import SecurityOverview from "@/components/dashboard/security-overview";
import DefensiveMechanisms from "@/components/dashboard/defensive-mechanisms";
import CreateSwarmModal from "@/components/modals/create-swarm-modal";
import { useWebSocket } from "@/hooks/use-websocket";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const [isCreateSwarmModalOpen, setIsCreateSwarmModalOpen] = useState(false);
  const { lastMessage } = useWebSocket();
  const queryClient = useQueryClient();

  // Handle real-time updates
  useEffect(() => {
    if (lastMessage) {
      console.log('Received WebSocket message:', lastMessage);
      
      // Invalidate relevant queries based on message type
      switch (lastMessage.type) {
        case 'swarm_created':
        case 'swarm_updated':
        case 'swarm_deleted':
          queryClient.invalidateQueries({ queryKey: ['/api/swarms'] });
          queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
          break;
        case 'agent_created':
        case 'agent_updated':
        case 'agent_deleted':
          queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
          break;
        case 'security_alert':
          queryClient.invalidateQueries({ queryKey: ['/api/security/alerts'] });
          queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
          break;
      }
    }
  }, [lastMessage, queryClient]);

  return (
    <div className="min-h-screen dark bg-dark-200">
      <DropdownNav />
      
      <div className="flex flex-col">
        {/* Page Header */}
        <div className="bg-dark-200 border-b border-gray-700 px-3 sm:px-6 py-3 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Neural Dashboard</h1>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">Swarm intelligence orchestration with quantum-grade security protocols</p>
          </div>
        </div>
        
        <main className="flex-1 px-3 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto w-full">
          <StatsCards />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <SwarmActivity />
            <QuickActions
              onDeployTemplate={() => setIsCreateSwarmModalOpen(true)}
              onCreateAgent={() => console.log('Create agent')}
              onViewSecurityReport={() => console.log('View security report')}
              onOpenApiDocs={() => console.log('Open API docs')}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <ActiveSwarms />
            <SecurityOverview />
          </div>
          
          <DefensiveMechanisms />
        </main>
      </div>

      <CreateSwarmModal
        open={isCreateSwarmModalOpen}
        onOpenChange={setIsCreateSwarmModalOpen}
      />
    </div>
  );
}
