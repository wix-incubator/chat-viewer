import { act } from 'react';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { configMocks } from 'jsdom-testing-mocks';

import {
  installDomMeasurementMocks,
  resetDomScrollState,
} from './utils/dom-utils';
import { getResizeObserver } from './utils/resize-observer';

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

configMocks({ act, afterAll, afterEach, beforeAll, beforeEach });
installDomMeasurementMocks();
getResizeObserver();

afterEach(() => {
  cleanup();
  resetDomScrollState();
});
