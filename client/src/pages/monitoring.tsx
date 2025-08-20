import DropdownNav from "@/components/layout/dropdown-nav";
import FloatingLogo from "@/components/ui/floating-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Monitoring() {
  return (
    <div className="min-h-screen dark bg-dark-200">
      <DropdownNav />
      
      <div className="flex flex-col">
        {/* Page Header */}
        <div className="bg-dark-200 border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Monitoring</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Real-time monitoring and analytics for your swarms</p>
          </div>
        </div>
        
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full relative">
          <FloatingLogo />
          <Card className="bg-dark-100 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <i className="fas fa-eye text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Monitoring Dashboard</h3>
                <p className="text-gray-400">
                  Advanced monitoring interface with real-time metrics coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
