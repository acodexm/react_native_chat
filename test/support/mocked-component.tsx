import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../src/theme/application';
import { render, RenderAPI } from '@testing-library/react-native';
import { isFunction } from 'lodash';
/**
 * Wraps a component in a ThemeProvider to allow testing
 * themed styled components
 */

interface MockedComponentProps {
  Component: any;
}

const MockedComponent = ({ Component }: MockedComponentProps) => {
  return (
    <ThemeProvider theme={theme.light}>
      <Component />
    </ThemeProvider>
  );
};
export const renderWithTheme = (component: any): RenderAPI =>
  render(
    <ThemeProvider theme={theme.light}>
      {isFunction(component) ? component() : component}
    </ThemeProvider>
  );
export default MockedComponent;
