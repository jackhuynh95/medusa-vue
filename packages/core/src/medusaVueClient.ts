import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import Medusa from '@medusajs/medusa-js';
import Vue from "vue";

interface MedusaVueClientProps {
  baseUrl: string;
  maxRetries?: number;
  /**
   * Authentication token
   */
  apiKey?: string;
  /**
   * PublishableApiKey identifier that defines the scope of resources
   * available within the request
   */
  publishableApiKey?: string;

  queryClientProviderProps?: VueQueryPluginOptions;
}

export const createMedusaVueClient = (options: MedusaVueClientProps) => {
  const medusaVueClient = {
    install(app: typeof import('vue').default) {
      const medusa = new Medusa({
        baseUrl: options.baseUrl,
        apiKey: options.apiKey,
        publishableApiKey: options.publishableApiKey,
        maxRetries: options.maxRetries || 1,
      });

      const defaultVueQueryPluginOptions: VueQueryPluginOptions = {
        queryClientConfig: {
          defaultOptions: {
            queries: {
              cacheTime: 500,
              refetchOnWindowFocus: false,
              staleTime: 1000 * 60 * 60 * 24,
              retry: 1,
            },
          },
        },
      };

      // Provide the Medusa client
      Vue.prototype.$medusaClient = { client: medusa };

      app.use(
        VueQueryPlugin,
        options.queryClientProviderProps || defaultVueQueryPluginOptions
      );
    },
  };

  return medusaVueClient;
};