import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { ProvidersWrapper } from '../../../../utils/testUtils';
import { ErrorMessages } from '../../useApiForm.types';
import { useTranslatedErrors } from '../useTranslatedErrors.hook';

describe('useTranslatedErrors: Hook', () => {
  const render = (args?: ErrorMessages) =>
    renderHook(() => useTranslatedErrors(args), {
      wrapper: ({ children }) => <ProvidersWrapper>{children}</ProvidersWrapper>,
    });

  describe('provided with custom messages', () => {
    const customMessages = { email: { CUSTOM_ERROR: 'custom error message' } };

    it('should return default translation if exists', () => {
      const { result } = render(customMessages);
      expect(result.current.translateErrorMessage('email', { code: 'CUSTOM_ERROR' })).toBe('custom error message');
    });

    it('should return input if no translation exists', () => {
      const { result } = render(customMessages);
      expect(result.current.translateErrorMessage('email', { code: 'NON_EXISTING_ERROR' })).toBe('NON_EXISTING_ERROR');
    });
  });
});
