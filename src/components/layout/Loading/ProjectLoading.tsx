import React from 'react';
import { Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectWithSections } from '@/types';

const ProjectLoading: React.FC<{ project: ProjectWithSections }> = ({ project }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[450px]">
        <CardHeader className="flex flex-row justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
          <Badge className="flex items-center text-xs px-2 py-0 text-muted-foreground" variant="outline">
            <Loader className="h-4 w-4 animate-spin mr-2" />
            Setting up project
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">We are ingesting your data</h2>
            <p className="text-sm text-muted-foreground">This may take a few minutes</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">While you wait</h3>
            <p className="text-sm flex items-center">
              <span className="mr-2">→</span>
              Browse the{" "}
              <a href="#" className="text-sky-500 hover:underline">
                documentation
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Not working?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">→</span>
                Try refreshing after a couple of minutes.
              </li>
              <li className="flex items-center">
                <span className="mr-2">→</span>
                If your dashboard hasn&apos;t connected within 2 minutes, you can open a support ticket.
              </li>
            </ul>
          </div>

          <Button variant="outline" className="w-full">
            Contact support team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectLoading;
