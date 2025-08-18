import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function SwarmActivity() {
  const [timeframe, setTimeframe] = useState("24h");

  return (
    <Card className="lg:col-span-2 bg-dark-100 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Swarm Activity</CardTitle>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-48 bg-dark-300 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-300 border-gray-600">
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart placeholder */}
        <div className="h-64 bg-dark-300 rounded-lg flex items-center justify-center border border-gray-600">
          <div className="text-center text-gray-400">
            <i className="fas fa-chart-line text-3xl mb-2"></i>
            <p>Real-time activity monitoring chart</p>
            <p className="text-sm mt-1">Shows agent performance, coordination metrics</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
