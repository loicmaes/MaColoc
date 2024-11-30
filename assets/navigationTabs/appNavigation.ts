import { User, Group, Community } from "@iconoir/vue";
import type { NavigationCategory } from "~/types/generics/frontSpecific";

const tabs: NavigationCategory[] = [
  {
    children: [
      {
        key: "overview",
        path: "",
      },
    ],
  },
  {
    label: "social",
    children: [
      {
        icon: User,
        key: "rentalProfile",
        path: "rentalProfile",
      },
    ],
  },
  {
    label: "flatSharing",
    prefix: "flatsharing",
    children: [
      {
        icon: Group,
        key: "flatSharing.home",
        path: "",
      },
      {
        icon: Community,
        key: "flatSharing.members",
        path: "members",
        renderCondition: false,
      },
    ],
  },
];
export default tabs;
