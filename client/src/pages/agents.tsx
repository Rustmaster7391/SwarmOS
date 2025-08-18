import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Agents() {
  return (
    <div className="flex h-screen overflow-hidden dark">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Agents"
          subtitle="Manage individual AI agents across all swarms"
        />
        
        <main className="flex-1 overflow-auto p-6">
          <Card className="bg-dark-100 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Agent Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <i className="fas fa-robot text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Agent Management</h3>
                <p className="text-gray-400">
                  Detailed agent management interface coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
