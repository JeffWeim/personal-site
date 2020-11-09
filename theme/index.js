const light = {
  bg: {
    primary: '#eff0f5',
    opposite: '#212121',
    secondary: '#ffffff',
    inset: '#e2e4e8',
    input: 'rgba(65,67,78,0.12)',
    header: 'rgb(0 150 136 / 0.1)',
  },
  text: {
    primary: '#050505',
    secondary: '#2f3037',
    tertiary: '#525560',
    quarternary: '#9194a1',
    placeholder: 'rgba(82,85,96,0.5)',
    onPrimary: '#ffffff',
  },
}

const dark = {
  bg: {
    primary: '#212121',
    opposite: '#eff0f5',
    secondary: '#111111',
    inset: '#111111',
    input: 'rgba(191,193,201,0.12)',
    header: 'rgb(65 65 65 / 20%)',
  },
  text: {
    primary: '#fbfbfc',
    secondary: '#e3e4e8',
    tertiary: '#a9abb6',
    quarternary: '#6c6f7e',
    placeholder: 'rgba(145,148,161,0.5)',
    onPrimary: '#212121',
  },
}

const defaultTheme = {
  screen: {
    xxs: '375px',
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    xxl: '1920px',
    xxxl: '2450px',
  },
  fontSizes: [
    '14px', // 0
    '16px', // 1
    '18px', // 2
    '22px', // 3
    '26px', // 4
    '32px', // 5
    '40px', // 6
    '50px', // 7
    '62px', // 8
  ],
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
  focus: 'rebeccapurple',
}

export const lightTheme = { ...defaultTheme, ...light }
export const darkTheme = { ...defaultTheme, ...dark }
