'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function PlaceholderSection({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Content coming soon.</p>
        <Button onClick={onBack}>Back</Button>
      </CardContent>
    </Card>
  )
}
