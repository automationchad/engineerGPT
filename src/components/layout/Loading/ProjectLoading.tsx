import React from 'react';
import { Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Processing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Loader className="h-4 w-4 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Your questions are being ingested...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectLoading;
