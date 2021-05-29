import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

export const magic = new Magic('pk_live_7D91453D1AE94DA9', {
    extensions: [new OAuthExtension()],
});