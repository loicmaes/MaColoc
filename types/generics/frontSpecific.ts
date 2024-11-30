import type { ComposerTranslation, DefineLocaleMessage } from "vue-i18n";
import type { RemoveIndexSignature } from "@intlify/core-base";

export type InternalizationTool = ComposerTranslation<RemoveIndexSignature<{ [p: string]: DefineLocaleMessage[string] }>>;

export interface NavigationCategory {
  label?: string;
  prefix?: string;
  children: NavigationTab[];
}
export interface NavigationTab {
  key: string;
  path: string;
  icon?: Component;
  renderCondition?: boolean;
}
