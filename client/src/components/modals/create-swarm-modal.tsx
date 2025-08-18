import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Template } from "@shared/schema";

const createSwarmSchema = z.object({
  name: z.string().min(1, "Swarm name is required"),
  description: z.string().optional(),
  templateId: z.string().optional(),
  agentCount: z.number().min(1).max(1000),
  maxAgents: z.number().min(1).max(1000),
  autoScaling: z.boolean().default(true),
  securityConfig: z.object({
    encryptionEnabled: z.boolean().default(true),
    anomalyDetection: z.boolean().default(true),
    agentIsolation: z.boolean().default(false),
  }),
});

type CreateSwarmFormData = z.infer<typeof createSwarmSchema>;

interface CreateSwarmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateSwarmModal({ open, onOpenChange }: CreateSwarmModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateSwarmFormData>({
    resolver: zodResolver(createSwarmSchema),
    defaultValues: {
      name: "",
      description: "",
      templateId: "none",
      agentCount: 12,
      maxAgents: 100,
      autoScaling: true,
      securityConfig: {
        encryptionEnabled: true,
        anomalyDetection: true,
        agentIsolation: false,
      },
    },
  });

  const { data: templates } = useQuery<Template[]>({
    queryKey: ['/api/templates'],
    queryFn: async () => {
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
  });

  const createSwarmMutation = useMutation({
    mutationFn: async (data: CreateSwarmFormData) => {
      const swarmData = {
        ...data,
        ownerId: "demo-user", // In real app, get from auth context
        status: "deploying" as const,
      };
      return await apiRequest("POST", "/api/swarms", swarmData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Swarm created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/swarms'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create swarm: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CreateSwarmFormData) => {
    createSwarmMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark-100 border-gray-700 max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Create New Swarm</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure and deploy a new AI agent swarm with your desired settings and security options.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Configuration */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Swarm Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter swarm name..."
                      className="bg-dark-300 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter swarm description..."
                      className="bg-dark-300 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Template</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-dark-300 border-gray-600 text-white">
                        <SelectValue placeholder="Select a template..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-300 border-gray-600">
                      <SelectItem value="none">Custom Configuration</SelectItem>
                      {templates?.filter(template => template.id && template.name).map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="agentCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Initial Agents</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        max={1000}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        className="bg-dark-300 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxAgents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Max Agents</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        max={1000}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        className="bg-dark-300 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="autoScaling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-600"
                    />
                  </FormControl>
                  <FormLabel className="text-white">Enable auto-scaling</FormLabel>
                </FormItem>
              )}
            />

            {/* Security Settings */}
            <div className="border border-gray-600 rounded-lg p-4 bg-dark-300">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <i className="fas fa-shield-alt text-primary mr-2"></i>
                Security Configuration
              </h4>

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="securityConfig.encryptionEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600"
                        />
                      </FormControl>
                      <FormLabel className="text-white">Enable Swarm Shield encryption</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityConfig.anomalyDetection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600"
                        />
                      </FormControl>
                      <FormLabel className="text-white">Anomaly detection monitoring</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityConfig.agentIsolation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600"
                        />
                      </FormControl>
                      <FormLabel className="text-white">Agent isolation on threat detection</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createSwarmMutation.isPending}
                className="bg-primary hover:bg-blue-700"
              >
                {createSwarmMutation.isPending ? "Creating..." : "Create Swarm"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
