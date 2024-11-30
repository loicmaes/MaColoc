import type { NavigationCategory } from "~/types/generics/frontSpecific";

export function filterTabs(tabs: NavigationCategory[]) {
  return tabs.map(tab => ({
    ...tab,
    children: tab.children.filter(e => e.renderCondition === undefined || e.renderCondition === null || e.renderCondition),
  }));
}
