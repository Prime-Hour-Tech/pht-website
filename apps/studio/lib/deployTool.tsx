import { Card, Stack, Heading, Text, Button, Flex, Box } from "@sanity/ui";
import { useState } from "react";

// Sanity Studio tool that triggers Vercel deploys by POSTing to deploy hook
// URLs. Two cards: "Deploy to Preview" (no confirmation, hits the preview
// hook) and "Deploy to Production" (inline confirmation prompt, hits the
// production hook). Each card tracks status independently.
//
// Env vars (must be prefixed SANITY_STUDIO_ for Vite to expose them to the
// browser bundle, same pattern as apps/studio/lib/env.ts):
//   SANITY_STUDIO_VERCEL_PREVIEW_DEPLOY_HOOK: preview Vercel deploy hook URL
//   SANITY_STUDIO_VERCEL_DEPLOY_HOOK:         production Vercel deploy hook URL (existing)
//   SANITY_STUDIO_VERCEL_PREVIEW_URL:         optional; rendered as a "Visit preview" link on the preview card
//
// Threat model: hook URLs are embedded in the Studio JS bundle, visible to
// anyone with Studio access. This matches the old plugin's posture (it stored
// the same URL in a Sanity document any editor could read).

type Status = "idle" | "deploying" | "success" | "error";

interface DeployCardProps {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonTone: "default" | "primary";
  hookUrl: string | undefined;
  hookEnvVarName: string;
  requireConfirm?: boolean;
  previewUrl?: string;
}

function DeployCard(props: DeployCardProps) {
  const {
    heading,
    description,
    buttonLabel,
    buttonTone,
    hookUrl,
    hookEnvVarName,
    requireConfirm,
    previewUrl,
  } = props;

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function postDeploy() {
    if (!hookUrl) return;
    setStatus("deploying");
    setMessage("Sending deploy hook request to Vercel...");
    // Abort a hung request so the button can't sit on "Deploying..." forever.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(hookUrl, { method: "POST", signal: controller.signal });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      setStatus("success");
      setMessage(
        `Deploy queued at ${new Date().toLocaleString()}. Vercel will rebuild shortly (typically 1–2 minutes).`,
      );
    } catch (err) {
      setStatus("error");
      const failed =
        err instanceof Error && err.name === "AbortError"
          ? "Deploy request timed out after 15s. Check your connection and Vercel's status, then try again."
          : `Deploy failed: ${err instanceof Error ? err.message : String(err)}`;
      setMessage(failed);
    } finally {
      clearTimeout(timeout);
      setConfirming(false);
    }
  }

  function handleClick() {
    if (requireConfirm && !confirming) {
      setConfirming(true);
      return;
    }
    void postDeploy();
  }

  const tone =
    status === "error"
      ? "critical"
      : status === "success"
        ? "positive"
        : "default";

  return (
    <Card padding={4} radius={3} shadow={1}>
      <Stack space={3}>
        <Heading as="h2" size={2}>
          {heading}
        </Heading>
        <Text size={1} muted>
          {description}
        </Text>
        {!hookUrl && (
          <Card tone="caution" padding={3} radius={2}>
            <Text size={1}>
              {hookEnvVarName} is not set. Add it to apps/studio/.env and
              redeploy the Studio.
            </Text>
          </Card>
        )}
        {hookUrl && !confirming && (
          <Flex>
            <Button
              text={status === "deploying" ? "Deploying..." : buttonLabel}
              tone={buttonTone}
              disabled={status === "deploying"}
              onClick={handleClick}
            />
          </Flex>
        )}
        {hookUrl && confirming && (
          <Card tone="caution" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1}>
                This will publish current Sanity content to the public site.
                Continue?
              </Text>
              <Flex gap={2}>
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setConfirming(false)}
                />
                <Button
                  text={
                    status === "deploying"
                      ? "Deploying..."
                      : "Yes, deploy to production"
                  }
                  tone="critical"
                  disabled={status === "deploying"}
                  onClick={() => void postDeploy()}
                />
              </Flex>
            </Stack>
          </Card>
        )}
        {message && (
          <Card tone={tone} padding={3} radius={2}>
            <Text size={1}>{message}</Text>
          </Card>
        )}
        {previewUrl && (
          <Text size={1} muted>
            Preview URL:{" "}
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {previewUrl}
            </a>
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export function DeployTool() {
  const previewHook = process.env.SANITY_STUDIO_VERCEL_PREVIEW_DEPLOY_HOOK;
  const productionHook = process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK;
  const previewUrl = process.env.SANITY_STUDIO_VERCEL_PREVIEW_URL;

  return (
    <Box padding={5}>
      <Stack space={4}>
        <Heading as="h1" size={3}>
          Deploy
        </Heading>
        <Text size={2} muted>
          Two-stage workflow. Publish content in Sanity, then deploy to preview
          to sanity-check the rendered output. When satisfied, deploy to
          production.
        </Text>

        <DeployCard
          heading="Deploy to Preview"
          description="Rebuild the preview URL with current published content. Use this to sanity-check changes before going live."
          buttonLabel="Deploy to Preview"
          buttonTone="default"
          hookUrl={previewHook}
          hookEnvVarName="SANITY_STUDIO_VERCEL_PREVIEW_DEPLOY_HOOK"
          previewUrl={previewUrl}
        />

        <DeployCard
          heading="Deploy to Production"
          description="Publish current Sanity content to the public site. Vercel rebuilds main and pushes live within 1–2 minutes."
          buttonLabel="Deploy to Production"
          buttonTone="primary"
          hookUrl={productionHook}
          hookEnvVarName="SANITY_STUDIO_VERCEL_DEPLOY_HOOK"
          requireConfirm
        />
      </Stack>
    </Box>
  );
}
