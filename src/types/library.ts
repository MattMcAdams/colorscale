import type { config } from './config';
import type { group } from './group';

export type library = {
  configs: config[],
  groups: group[],
}

export default library;
