import Vue from 'vue';
import Medusa from '@medusajs/medusa-js';

/**
 * Returns the medusa Client.
 */
export function useMedusa(): { client: Medusa } {
  return Vue.prototype.$medusaClient;
}
