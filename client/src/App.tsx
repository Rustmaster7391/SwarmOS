import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard";
import Swarms from "./pages/swarms";
import Agents from "./pages/agents";
import Templates from "./pages/templates";
import Security from "./pages/security";
import Monitoring from "./pages/monitoring";
import ApiDocs from "./pages/api-docs";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/swarms" component={Swarms} />
      <Route path="/agents" component={Agents} />
      <Route path="/templates" component={Templates} />
      <Route path="/security" component={Security} />
      <Route path="/monitoring" component={Monitoring} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
