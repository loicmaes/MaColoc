<script setup lang="ts">
import { Eye, LogOut, WarningCircle, BadgeCheck, Palette, Language } from "@iconoir/vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import UserVerificationSheet from "~/components/layouts/user/UserVerificationSheet.vue";

const { locale } = useI18n();
const user = useUser();
const colorMode = useColorMode();

const switchLocale = useSwitchLocalePath();
const selectLanguage = (lang: string) => {
  navigateTo(`${switchLocale(lang)}`);
};

const verification = ref<boolean>(false);
</script>

<template>
  <div
    v-if="user"
    class="flex items-center gap-1"
  >
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          class="pl-0 gap-2"
        >
          <Avatar shape="square">
            <AvatarImage
              v-if="user.data?.avatarUrl"
              :src="user.data?.avatarUrl"
            />
            <AvatarFallback>
              {{ user.data?.firstName.substring(0, 1) }}{{ user.data?.lastName.substring(0, 1) }}
            </AvatarFallback>
          </Avatar>

          <div class="flex flex-col items-start">
            <span class="font-medium leading-none">
              {{ user.data?.firstName }} {{ user.data?.lastName }}
            </span>
            <span class="text-xs font-light text-muted-foreground">{{ user.email }}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <!-- user -->
        <DropdownMenuGroup>
          <DropdownMenuItem as-child>
            <NuxtLinkLocale :to="`/usr/${user?.uid}`">
              <Eye />
              <span>{{ $t("btn.seeMyProfile") }}</span>
            </NuxtLinkLocale>
          </DropdownMenuItem> <!-- see profile -->
          <DropdownMenuItem
            v-if="!user.verified"
            class="text-primary"
            @click="verification = true"
          >
            <BadgeCheck />
            <span>{{ $t("settings.verification.action") }}</span>
          </DropdownMenuItem> <!-- verify -->
        </DropdownMenuGroup>
        <Separator class="my-1" />
        <!-- config -->
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette />
              <span>{{ $t("settings.appearance.label") }}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup v-model="colorMode.preference">
                <DropdownMenuRadioItem value="light">
                  {{ $t("settings.appearance.theme.light") }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  {{ $t("settings.appearance.theme.dark") }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub> <!-- appearance -->
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Language />
              <span>{{ $t("settings.language.label") }}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup :model-value="locale">
                <DropdownMenuRadioItem
                  value="fr"
                  @click.prevent="selectLanguage('fr')"
                >
                  {{ $t("settings.language.locales.fr") }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="en"
                  @click.prevent="selectLanguage('en')"
                >
                  {{ $t("settings.language.locales.en") }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub> <!-- language -->
        </DropdownMenuGroup>
        <Separator class="my-1" />
        <!-- auth -->
        <DropdownMenuGroup>
          <DropdownMenuItem class="text-destructive-light">
            <LogOut />
            <span>{{ $t("labels.logOut") }}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <TooltipProvider v-if="!user.verified">
      <Tooltip>
        <TooltipTrigger>
          <WarningCircle
            class="text-destructive-light"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p class="text-destructive-light">
            {{ $t("settings.verification.notVerified") }}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <UserVerificationSheet
      :open="verification"
      @update:open="verification = $event"
    />
  </div>
</template>
