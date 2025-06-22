import 'i18next'
import { TranslationResources } from "@/i18n/resources";

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: TranslationResources;
  }
}