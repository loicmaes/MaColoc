import { User, Group, Community } from "@iconoir/vue";
import type { NavigationCategory } from "~/types/generics/frontSpecific";
import type { IUser } from "~/types/user";

const tabs = (user: IUser): NavigationCategory[] => ([
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
    prefix: "rentalProfile",
    children: [
      {
        icon: User,
        key: "rentalProfile.create",
        path: "new",
        renderCondition: !user.rentalProfile,
      },
      {
        icon: User,
        key: "rentalProfile",
        path: "",
        renderCondition: !!user.rentalProfile,
      },
    ],
  },
  {
    label: "flatSharing",
    prefix: "flatsharing",
    children: [
      {
        icon: Group,
        key: "flatSharing.new",
        path: "new",
        renderCondition: true,
      },
      {
        icon: Group,
        key: "flatSharing.home",
        path: "",
        renderCondition: false,
      },
      {
        icon: Community,
        key: "flatSharing.members",
        path: "members",
        renderCondition: false,
      },
    ],
  },
]);
export default tabs;
