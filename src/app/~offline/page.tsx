import { Code } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <main className="container mx-auto flex min-h-screen max-w-4xl items-center px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            DNA Transcoder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground text-sm">
          <p>You are offline. Reconnect and refresh to continue.</p>
          <p>当前处于离线状态，请恢复网络连接后刷新页面。</p>
        </CardContent>
      </Card>
    </main>
  );
}
