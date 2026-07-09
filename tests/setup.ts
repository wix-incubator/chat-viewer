import { act } from '@testing-library/react';
import { configMocks } from 'jsdom-testing-mocks';
import { afterAll, afterEach } from 'vitest';

import { installDomMeasurementMocks } from './utils/dom-utils';
import { installResizeObserverMock } from './utils/resize-observer-mock';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
configMocks({ afterAll, afterEach, act });
installDomMeasurementMocks();
installResizeObserverMock();
