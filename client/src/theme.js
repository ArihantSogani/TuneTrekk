import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#f0e4ff',
    100: '#cbb2ff',
    200: '#a480ff',
    300: '#7c4dff',
    400: '#541aff',
    500: '#3b00e6',
    600: '#2d00b4',
    700: '#1f0082',
    800: '#110050',
    900: '#040020',
  },
};

const theme = extendTheme({
  config,
  colors,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'base',
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme; 