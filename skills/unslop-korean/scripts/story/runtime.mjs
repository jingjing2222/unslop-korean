// Adapted from unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.
// Split into modules; see ../../UPSTREAM.md for source and changes.
import { setup } from './setup.mjs';
import { overlays } from './overlays.mjs';
import { controller } from './controller.mjs';

export function runtime(steps) {
  return setup(steps) + overlays() + controller();
}
