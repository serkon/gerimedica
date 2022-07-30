export interface ThemeType {
  [key: string]: ThemeItem;
}

export interface ThemeItem {
  type: string;
  values?: { [key: string]: any };
  alias?: string[];
  variants?: { [key: string]: any };
  default?: { [key: string]: any };
  extendColors?: boolean;
}

export const Theme: ThemeType = {
  'color': {
    type: 'variable',
    values: {
      primary: '#0d6efd',
      secondary: '#6c757d',
      success: '#198754',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#0dcaf0',
      light: '#f8f9fa',
      dark: '#212529',
      white: '#ffffff',
      black: '#000000',
    },
  },
  'button': {
    type: 'element',
    alias: ['.btn'],
    default: {
      'display': 'inline-block',
      'font-weight': '400',
      'line-height': 'normal',
      'color': 'var(--dark)',
      'text-align': 'center',
      'text-decoration': 'none',
      'vertical-align': 'middle',
      'cursor': 'pointer',
      'user-select': 'none',
      'background-color': 'transparent',
      'border': '1px solid transparent',
      'padding': '0.375rem 0.75rem',
      'border-radius': 'var(--size-2)',
      'height': 'var(--size-19)',
      'font-size': 'var(--size-8)',
      'border-color': 'transparent',
      'border-style': 'solid',
      'transition': `color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out`,
    },
    extendColors: true, // generates color variants
    variants: {
      'sm': {
        'border-radius': 'var(--size-1)',
        'padding': '0.25rem 0.5rem',
        'height': 'var(--size-16)',
      },
      'md': {
        'border-color': 'red',
      },
      'lg': {
        padding: '0.5rem 1rem',
        height: 'var(--size-24)',
      },
      'xl': {
        padding: '0.5rem 1rem',
        height: 'var(--size-28)',
      },
      'debug': {
        border: '1px solid red',
      },
      ':hover': {
        position: 'relative',
        // background: 'red',
      },
      ':disabled': {
        'pointer-events': 'none',
        'opacity': 0.65,
      },
    },
  },
  'input': {
    type: 'element',
    alias: ['.input-text', '.form-control'],
    default: {
      'display': 'block',
      'width': '100%',
      'padding': '0.375rem 0.75rem',
      'font-size': '1rem',
      'font-weight': '400',
      'line-height': '1.5',
      'color': 'var(--dark)',
      'background-color': 'var(--white)',
      'background-clip': 'padding-box',
      'border': '1px solid #ced4da',
      'appearance': 'none',
      'border-radius': '0.25rem',
      'transition': 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
      'box-sizing': 'border-box',
    },
    variants: {
      'sm': {
        'border-radius': 'var(--size-1)',
        'padding': '0.25rem 0.5rem',
        'height': 'var(--size-16)',
      },
      'md': {
        'border-color': 'red',
      },
      'lg': {
        padding: '0.5rem 1rem',
        height: 'var(--size-24)',
      },
      'xl': {
        padding: '0.5rem 1rem',
        height: 'var(--size-28)',
      },
      ':focus': {
        'color': 'var(--dark)',
        'background-color': 'var(--white)',
        'outline': 0,
        'box-shadow': '0 0 0 0.25rem rgb(13 110 253 / 25%)',
      },
      'debug': {
        border: '1px solid red',
      },
    },
  },
  'select': {
    type: 'element',
    alias: ['.select', '.form-select'],
    default: {
      'display': 'block',
      'width': '100%',
      'padding': '0.375rem 2.25rem 0.375rem 0.75rem',
      '-moz-padding-start': 'calc(0.75rem - 3px)',
      'font-size': '1rem',
      'font-weight': '400',
      'line-height': '1.5',
      'color': 'var(--dark)',
      'background-color': 'var(--white)',
      'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
      'background-repeat': 'no-repeat',
      'background-position': 'right 0.75rem center',
      'background-size': '16px 12px',
      'border': '1px solid #ced4da',
      'border-radius': '0.25rem',
      'transition': 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
      'appearance': 'none',
    },
    variants: {
      ':focus': {
        'color': 'var(--dark)',
        'background-color': 'var(--white)',
        'border-color': '#86b7fe',
        'outline': 0,
        'box-shadow': '0 0 0 0.25rem rgb(13 110 253 / 25%)',
      },
      '.sercan': {
        border: '1px solid red',
      },
    },
  },
  'check': {
    type: 'element',
    alias: ['.form-check-input', '.input-checkbox'],
    default: {
      'width': '1rem',
      'height': '1rem',
      'margin-top': '0.25em',
      'vertical-align': 'top',
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'background-size': 'contain',
      'border': '1px solid rgba(0,0,0,.25)',
      'appearance': 'none',
      '-webkit-print-color-adjust': 'exact',
      'color-adjust': 'exact',
      // 'background-color': 'var(--light-500)',
    },
    extendColors: true, // generates color variants
    variants: {
      ':focus': {
        'outline': 0,
        'box-shadow': '0 0 0 0.25rem rgb(13 110 253 / 25%)',
      },
      ':checked': {
        'background-color': 'var(--primary-500)',
        'border-color': 'var(--primary-500)',
      },
      ':active': {
        'border-color': 'var(--primary-300)',
      },
      '[type=checkbox]': {
        'border-radius': '0.25em',
      },
      '[type=radio]': {
        'border-radius': '50%',
      },
      ':checked[type=checkbox]': {
        'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")`,
      },
      ':checked[type=radio]': {
        'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")`,
      },
      '+ label': {
        border: '1px solid #ced4da',
      },
    },
  },
  'body': {
    type: 'element',
    alias: ['body', 'html'],
    default: {
      'display': 'block',
      'width': '100%',
      'height': '100%',
      'margin': 0,
      'padding': '0',
      'font-family': 'sans-serif',
      'font-size': '1rem',
      'font-weight': '400',
      'line-height': '1.5',
      'color': 'var(--dark)',
      'text-align': 'left',
      'background-clip': 'padding-box',
      'box-sizing': 'border-box',
      'overflow': 'auto',
    },
    variants: {
      debug: {
        background: '#f0f0f0',
      },
    },
  },
  'opacity': {
    type: 'class',
    alias: ['opacity:o'],
    values: {
      0: '0',
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
  },
  'z-index': {
    type: 'class',
    values: {
      low: '0',
      medium: '1',
      high: '2',
      max: '3',
    },
  },
  'spacing': {
    type: 'class',
    alias: ['padding:p', 'margin:m', 'width:w', 'height:h'],
    values: {
      '0': 0,
      '1': '0.125rem', // 2px
      '2': '0.25rem', // 4px
      '3': '0.375rem', // 6px
      '4': '0.5rem', // 8px
      '5': '0.625rem', // 10px
      '6': '0.75rem', // 12px
      '7': '0.875rem', // 14px
      '8': '1rem', // 16px
      '9': '1.125rem', // 18px
      '10': '1.25rem', // 20px
      '11': '1.375rem', // 22px
      '12': '1.5rem', // 24px
      '13': '1.675rem', // 26px
      '14': '1.75rem', // 28px
      '15': '1.875rem', // 30px
      '16': '2rem', // 32px
      '18': '2.25rem', // 36px
      '19': '2.375rem', // 38px
      '20': '2.5rem', // 40px
      '24': '3rem', // 48px
      '28': '3.5rem', // 56px
      '32': '4rem', // 64px
      '36': '4.5rem', // 72px
      '38': '4.75rem', // 76px
      '40': '5rem', // 80px
      '48': '6rem', // 96px
      '56': '7rem', // 112px
      '64': '8rem', // 128px
      '72': '9rem', // 144px
      '80': '10rem', // 160px
      '88': '11rem', // 176px
      '96': '12rem', // 192px
      '104': '13rem', // 208px
      '112': '14rem', // 224px
      '120': '15rem', // 240px
      '128': '16rem', // 256px
      '144': '18rem', // 288px
      '160': '20rem', // 320px
      '192': '24rem', // 384px
      'auto': 'auto',
      'full': '100%',
      'half': '50%',
      '3xs': '14rem', // 224px
      '2xs': '16rem', // 256px
      'xs': '20rem', // 320px
      'sm': '24rem', // 384px
      'md': '28rem', // 448px
      'lg': '32rem', // 512px
      'xl': '36rem', // 576px
      '2xl': '42rem', // 640px
      '3xl': '48rem', // 768px
      '4xl': '56rem', // 896px
      '5xl': '64rem', // 1024px
      '6xl': '72rem', // 1152px
      '7xl': '80rem', // 1280px
      '8xl': '90rem', // 1408px
      'inherit': 'inherit',
    },
  },
  'border-radius': {
    type: 'class',
    values: {
      '0': 0,
      '1': '0.125rem', // 2px
      '2': '0.25rem', // 4px
      '3': '0.375rem', // 6px
      '4': '0.5rem', // 8px
      '5': '0.625rem', // 10px
      '6': '0.75rem', // 12px
      '7': '0.875rem', // 14px
      '8': '1rem', // 16px
      '9': '1.125rem', // 16px
      '10': '1.25rem', // 20px
      '11': '1.375rem', // 22px
      '12': '1.5rem', // 24px
      '13': '1.675rem', // 26px
      '14': '1.75rem', // 28px
      '15': '1.875rem', // 30px
      '16': '2rem', // 32px
      'full': '50%',
      'pill': '9999px',
    },
  },
  'box-shadow': {
    type: 'class',
    values: {
      'none': 'none',
      'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)',
    },
  },
};
