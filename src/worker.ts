import startHandler from "@tanstack/react-start/server-entry";

export default {
  ...startHandler,
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    await env.DB.prepare(
      "DELETE FROM page_view_ips WHERE date < date('now', '-30 days')",
    ).run();
  },
};
