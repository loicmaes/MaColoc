<script setup lang="ts">
import { formatDate } from "~/lib/utils";
import InviteMemberDialog from "~/components/composed/flatSharing/InviteMemberDialog.vue";

const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc' · ${t("flatSharing.members.tabLabel")}`,
});

const user = useUser();
const flatSharing = useFlatSharing();

const members = computed(() => flatSharing.value?.members?.map(member => ({
  me: member.userUid === user.value?.uid,
  firstName: member.user?.data?.firstName,
  lastName: member.user?.data?.lastName,
  email: member.user?.email,
  joinedAt: formatDate(t, new Date(member.joinedAt)),
})) ?? []);
</script>

<template>
  <div
    v-if="user && flatSharing"
    data-page="flatsharing-members"
    class="flex flex-col gap-4"
  >
    <header class="flex items-center justify-between px-4 py-2">
      <h1 class="text-4xl font-extrabold">
        {{ t("flatSharing.members.title") }}
      </h1>

      <InviteMemberDialog />
    </header>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{{ t("flatSharing.members.table.firstName") }}</TableHead>
          <TableHead>{{ t("flatSharing.members.table.lastName") }}</TableHead>
          <TableHead>{{ t("flatSharing.members.table.email") }}</TableHead>
          <TableHead>{{ t("flatSharing.members.table.joinedAt") }}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="member in members"
          :key="member.email"
          class="cursor-pointer"
        >
          <TableCell class="flex items-center gap-2">
            <span>{{ member.firstName }}</span>
            <Badge
              v-if="member.me"
              variant="secondary"
              size="sm"
            >
              {{ t("flatSharing.members.table.me") }}
            </Badge>
          </TableCell>
          <TableCell>{{ member.lastName }}</TableCell>
          <TableCell class="text-muted-foreground">
            {{ member.email }}
          </TableCell>
          <TableCell>{{ member.joinedAt }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
