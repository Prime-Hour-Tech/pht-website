import { Card, Stack, Heading, Text, Button, Flex, Box } from "@sanity/ui";
import { useState } from "react";

// Sanity Studio tool that triggers a Vercel deploy by POSTing to the deploy
// hook URL configured via the SANITY_STUDIO_VERCEL_DEPLOY_HOOK env var.
//
// Replaces sanity-plugin-vercel-deploy (officially unmaintained as of 2026).
// Threat model: the hook URL is embedded in the Studio JS bundle, visible to
// anyone with Studio access. This matches the old plugin's posture (it stored
// the same URL in a Sanity document any editor could read).

type Status = "idle" | "deploying" | "success" | "error";

export function DeployTool() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  // process.env access works in the browser bundle because Sanity's Vite
  // setup replaces SANITY_STUDIO_* references at build time. Same pattern
  // as apps/studio/lib/env.ts.
  const hookUrl = process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK;

  async function handleDeploy() {
    if (!hookUrl) {
      setStatus("error");
      setMessage(
        "SANITY_STUDIO_VERCEL_DEPLOY_HOOK env var is not set. Add it to apps/studio/.env and redeploy the Studio.",
      );
      return;
    }
    setStatus("deploying");
    setMessage("Sending deploy hook request to Vercel...");
    try {
      const res = await fetch(hookUrl, { method: "POST" });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      setStatus("success");
      setMessage(
        `Deploy queued at ${new Date().toLocaleString()}. Vercel will rebuild the public site shortly.`,
      );
    } catch (err) {
      setStatus("error");
      setMessage(
        `Deploy failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  const tone =
    status === "error"
      ? "critical"
      : status === "success"
        ? "positive"
        : "default";

  return (
    <Box padding={5}>
      <Card padding={5} radius={3} shadow={1}>
        <Stack space={4}>
          <Heading as="h1" size={3}>
            Deploy to Vercel
          </Heading>
          <Text size={2} muted>
            Trigger a production rebuild of the public PHT website. Vercel will
            pull the latest content from Sanity and redeploy. Typically takes 1–2
            minutes.
          </Text>
          <Flex>
            <Button
              text={status === "deploying" ? "Deploying..." : "Deploy now"}
              tone="primary"
              disabled={status === "deploying"}
              onClick={handleDeploy}
            />
          </Flex>
          {message && (
            <Card tone={tone} padding={3} radius={2}>
              <Text size={1}>{message}</Text>
            </Card>
          )}
        </Stack>
      </Card>
    </Box>
  );
}
