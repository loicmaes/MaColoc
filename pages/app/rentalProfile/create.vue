<script setup lang="ts">
import * as z from "zod";
import { Plus } from "@iconoir/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  jobStatusRef,
  frequenciesRef,
  dietsRef,
  historyStatusRef,
  maritalStatusRef,
  type TDayMoment,
  type TDiet,
  type TFrequency,
  type THistoryStatus,
  type TJobStatus,
  type TLanguage,
  type TMaritalStatus, availabilitiesRef,
} from "~/types/generics/enums";
import { Switch } from "~/components/ui/switch";

const { t } = useI18n();
await useAuth(t, true);

if (useUser().value?.rentalProfile) {
  await navigateTo(useLocalePath()("/app/rentalProfile"));
}

const schema = toTypedSchema(z.object({
  jobStatus: z.string(), // done
  maritalStatus: z.string(), // done
  smoker: z.string(), // done
  drinker: z.string(), // done
  rentHistory: z.string(), // done
  animals: z.boolean().default(false), // done
  driverLicense: z.boolean().default(false), // done
  car: z.boolean().default(false), // done
  motorcycle: z.boolean().default(false), // done
  monthlyIncome: z.number().min(0).default(0), // done
  diet: z.string(), // done
  availability: z.string(),
  languages: z.string().array().nonempty().default(["french"]),
}));
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: schema,
});

const hasDriverLicense = ref<boolean>(false);

const loading = ref<boolean>(false);
const canLeave = ref<boolean>(false);

const submit = handleSubmit(async (values) => {
  loading.value = true;
  const value = await sendNewRentalProfileRequest(t, {
    ...values,
    smoker: values.smoker as TFrequency,
    drinker: values.drinker as TFrequency,
    maritalStatus: values.maritalStatus as TMaritalStatus,
    jobStatus: values.jobStatus as TJobStatus,
    diet: values.diet as TDiet,
    availability: values.availability as TDayMoment,
    rentHistory: values.rentHistory as THistoryStatus,
    languages: values.languages as TLanguage[],
  });
  canLeave.value = value;

  if (value) navigateTo(useLocalePath()("/app/rentalProfile"));

  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (canLeave.value) return;
  if (confirm("Êtes-vous sûr de vouloir quitter ?")) return;
  abortNavigation();
});
</script>

<template>
  <div data-page="app_rentalProfile_create">
    <header class="flex flex-col gap-2 px-6 pt-4 mb-6">
      <h1 class="text-2xl font-bold">
        {{ t("rentalProfile.create.title") }}
      </h1>

      <p class="text-muted-foreground leading-relaxed max-w-[60ch]">
        {{ t("rentalProfile.create.description") }}
      </p>
    </header>

    <form
      class="flex flex-col gap-8"
      @submit="submit"
    >
      <div class="grid gap-4">
        <!-- mobility -->
        <Card>
          <CardHeader class="pb-4">
            <CardTitle class="text-xl">
              {{ t("rentalProfile.form.mobility.title") }}
            </CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4">
            <FormField
              v-slot="{ value, handleChange }"
              name="driverLicense"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.mobility.fields.driverLicense.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.mobility.fields.driverLicense.caption") }}
                  </FormDescription>
                </div>
                <div class="item-field-sm">
                  <FormControl>
                    <Switch
                      :checked="value"
                      @update:checked="(v) => {
                        handleChange(v)
                        hasDriverLicense = v;
                      }"
                    />
                  </FormControl>
                </div>
              </FormItem>
            </FormField>
            <Separator />
            <FormField
              v-slot="{ value, handleChange }"
              name="car"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.mobility.fields.car.label") }}
                  </FormLabel>
                </div>
                <div class="item-field-sm">
                  <FormControl>
                    <Switch
                      :disabled="!hasDriverLicense"
                      :checked="value"
                      @update:checked="handleChange"
                    />
                  </FormControl>
                </div>
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ value, handleChange }"
              name="motorcycle"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.mobility.fields.motorcycle.label") }}
                  </FormLabel>
                </div>
                <div class="item-field-sm">
                  <FormControl>
                    <Switch
                      :disabled="!hasDriverLicense"
                      :checked="value"
                      @update:checked="handleChange"
                    />
                  </FormControl>
                </div>
              </FormItem>
            </FormField>
          </CardContent>
        </Card>
        <!-- personal -->
        <Card>
          <CardHeader class="pb-4">
            <CardTitle class="text-xl">
              {{ t("rentalProfile.form.personalSituation.title") }}
            </CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4">
            <FormField
              v-slot="{ componentField }"
              name="smoker"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.personalSituation.fields.smoker.label") }}
                  </FormLabel>
                </div>

                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.personalSituation.fields.smoker.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="entry in frequenciesRef"
                          :key="entry"
                          :value="entry"
                        >
                          {{ t(`labels.frequency.${entry}`) }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField }"
              name="drinker"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.personalSituation.fields.drinker.label") }}
                  </FormLabel>
                </div>

                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.personalSituation.fields.drinker.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="entry in frequenciesRef"
                          :key="entry"
                          :value="entry"
                        >
                          {{ t(`labels.frequency.${entry}`) }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <Separator />
            <FormField
              v-slot="{ componentField }"
              name="maritalStatus"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.personalSituation.fields.maritalStatus.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.personalSituation.fields.maritalStatus.caption") }}
                  </FormDescription>
                </div>

                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.personalSituation.fields.maritalStatus.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="entry in maritalStatusRef"
                          :key="entry"
                          :value="entry"
                        >
                          {{ t(`labels.maritalStatus.${entry}`) }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <Separator />
            <FormField
              v-slot="{ value, handleChange }"
              name="animals"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.personalSituation.fields.animals.label") }}
                  </FormLabel>
                </div>

                <div class="item-field-sm">
                  <FormControl>
                    <Switch
                      :checked="value"
                      @update:checked="handleChange"
                    />
                  </FormControl>
                </div>
              </FormItem>
            </FormField>
            <Separator />
            <FormField
              v-slot="{ componentField }"
              name="diet"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.personalSituation.fields.diet.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.personalSituation.fields.diet.caption") }}
                  </FormDescription>
                </div>
                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.personalSituation.fields.diet.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="entry in dietsRef"
                          :key="entry"
                          :value="entry"
                        >
                          {{ t(`labels.diet.${entry}`) }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <Separator />
            <FormField
              v-slot="{ componentField }"
              name="rentHistory"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.personalSituation.fields.historyStatus.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.personalSituation.fields.historyStatus.caption") }}
                  </FormDescription>
                </div>

                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.personalSituation.fields.historyStatus.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="entry in historyStatusRef"
                          :key="entry"
                          :value="entry"
                        >
                          {{ t(`labels.historyStatus.${entry}`) }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
          </CardContent>
        </Card>
        <!-- professional -->
        <Card>
          <CardHeader class="pb-4">
            <CardTitle class="text-xl">
              {{ t("rentalProfile.form.professionalSituation.title") }}
            </CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4">
            <FormField
              v-slot="{ componentField }"
              name="jobStatus"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.professionalSituation.fields.jobStatus.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.professionalSituation.fields.jobStatus.caption") }}
                  </FormDescription>
                </div>
                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.professionalSituation.fields.jobStatus.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="job in jobStatusRef"
                          :key="job"
                          :value="job"
                        >
                          {{
                            t(`labels.jobStatus.${job}`)
                          }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <Separator />
            <FormField
              v-slot="{ value }"
              name="monthlyIncome"
            >
              <FormItem class="item">
                <div>
                  <FormLabel>
                    {{ t("rentalProfile.form.professionalSituation.fields.monthlyIncome.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.professionalSituation.fields.monthlyIncome.caption") }}
                  </FormDescription>
                </div>

                <div class="item-field">
                  <NumberField
                    :min="0"
                    :format-options="{
                      style: 'decimal',
                    }"
                    :model-value="value"
                    class="item-field"
                    placeholder="1400"
                    @update:model-value="(v) => setFieldValue('monthlyIncome', v !== undefined && v !== null ? v : 0)"
                  >
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <FormControl>
                        <NumberFieldInput />
                      </FormControl>
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
          </CardContent>
        </Card>
        <!-- communication -->
        <Card>
          <CardHeader class="pb-4">
            <CardTitle class="text-xl">
              {{ t("rentalProfile.form.communication.title") }}
            </CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4">
            <FormField
              v-slot="{ componentField }"
              name="availability"
            >
              <FormItem class="item">
                <div class="flex-1">
                  <FormLabel>
                    {{ t("rentalProfile.form.communication.fields.availability.label") }}
                  </FormLabel>
                  <FormDescription class="item-desc">
                    {{ t("rentalProfile.form.communication.fields.availability.caption") }}
                  </FormDescription>
                </div>

                <div class="item-field">
                  <FormControl v-bind="componentField">
                    <Select>
                      <SelectTrigger>
                        <SelectValue :placeholder="t('rentalProfile.form.communication.fields.availability.placeholder')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="entry in availabilitiesRef"
                          :key="entry"
                          :value="entry"
                        >
                          {{ t(`labels.dayMoment.${entry}`) }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </FormItem>
            </FormField>
          </CardContent>
        </Card>
      </div>

      <Button class="self-end">
        <Plus />
        <span>Créer mon profil</span>
      </Button>
    </form>
  </div>
</template>

<style scoped>
.item {
  @apply flex items-center justify-between gap-20;
}
.item-field {
  @apply w-[min(15rem,100%)];

  &-sm {
    @apply w-min;
  }
}
.item-desc {
  @apply max-w-[45ch];
}
</style>
