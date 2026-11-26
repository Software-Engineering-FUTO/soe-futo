import { Config } from "@remotion/cli/config";

// Little compression, for a sharp upload; add --scale=2 for 4K.
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCodec("h264");
Config.setCrf(16);
