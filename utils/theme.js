import colors from 'vuetify/es5/util/colors'

export const theme = {
  dark: {
    primary: '#2F80ED', // azul
    secondary: '#E0E0E0', // cinza claro
    gray300: '#4F4F4F',
    gray: '#828282', // cinza médio
    background: '#252329',
    backgroundLogged: '#252329',
    text: '#E0E0E0',
    red: '#EB5757',
    accent: colors.grey.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
  light: {
    primary: '#2F80ED;', // azul
    secondary: '#333333', // cinza escuro
    gray300: '#4F4F4F',
    gray: '#828282', // cinza médio
    background: '#FFFFFF',
    backgroundLogged: '#FAFAFB',
    text: '#333',
    red: '#EB5757',
    accent: colors.grey.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
}
