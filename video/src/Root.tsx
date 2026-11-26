import { Composition } from "remotion";
import { FPS, TOTAL_FRAMES } from "./script";
import { Video } from "./Video";

// Two compositions with the same timing: with the voice, and with music and sound effects only.
// Silent cut: no voice files exist yet, so both render identically; the NoVoice variant stays
// registered per the motion skill for the later narrated render.
export function Root() {
  return <>
    <Composition id="Video" component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="VideoNoVoice" component={Video} defaultProps={{ voice: false }} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
  </>;
}
