export default function SystemHealth() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Engine Health metrics</h1>
      <p className="text-muted-foreground">
        Track latency, uptime, and failing source configurations.
      </p>
      
      <div className="p-12 border border-dashed rounded-xl flex items-center justify-center bg-slate-50">
        <p className="text-muted-foreground text-center">
          Health Monitoring UI will be implemented in Phase 2.
        </p>
      </div>
    </div>
  );
}
