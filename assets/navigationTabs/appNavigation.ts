import { User, Group, Community } from "@iconoir/vue";
import type { NavigationCategory } from "~/types/generics/frontSpecific";
import type { IUser } from "~/types/user";
import type { IFlatSharing } from "~/types/flatSharing";

const tabs = (user: IUser, flatSharing: IFlatSharing): NavigationCategory[] => ([
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
        renderCondition: !flatSharing,
      },
      {
        icon: Group,
        key: "flatSharing.home",
        path: "",
        renderCondition: !!flatSharing,
      },
      {
        icon: Community,
        key: "flatSharing.members",
        path: "members",
        renderCondition: !!flatSharing,
      },
    ],
  },
]);
export default tabs;
