import { Theme, ThemeItem, ThemeType } from './theme.config';

/**
 * Usage Example:
 *
 * const theme = new Themizer();
 * theme.generate();
 * theme.attach();
 *
 * or simpley: new Themizer().attach();
 */
export class Themizer {
  _theme: ThemeType = {};
  styles: string[] = [];
  variables: string[] = [];
  document: Document = document;

  get theme(): ThemeType {
    return this._theme;
  }

  set theme(config: ThemeType) {
    this._theme = config;
  }

  constructor(theme: ThemeType = Theme) {
    theme['button'].variants = { ...theme['button'].variants, ...{ zart: { 'background-color': '#000' } } };
    this.theme = theme;
    this.generate();

    return this;
  }

  generate(): void {
    Object.keys(this.theme).forEach((propName) => {
      const item = this.theme[propName];
      if (item.type === 'class') {
        this.generateClasses(item, propName);
      }
      if (item.type === 'variable') {
        this.generateVariables(item, propName);
      }
      if (item.type === 'element') {
        this.generateElements(item, propName);
      }
    });
  }

  /**
   * Generate a style tag to add to the head
   */
  attach(): void {
    // this.addAsLink();
    this.addAsSheet();
  }

  private generateClasses(item: ThemeItem, propName: string): void {
    item.values &&
      Object.keys(item.values as any).forEach((itemKey: string) => {
        item.alias
          ? item.alias.forEach((alias: string) => {
              const aliasName = alias.split(':');
              this.styles.push(
                `${
                  isNaN(Number(itemKey)) || parseFloat(itemKey) % 1 === 0
                    ? `.${aliasName[1].toString()}-${itemKey}`
                    : `.${aliasName[1].toString()}-${parseInt(itemKey, 10).toString()}-half`
                } {${aliasName[0].trim()}: ${(item.values as any)[itemKey]};}`,
              );
              ['margin', 'padding'].includes(aliasName[0]) && this.helperMarginAndPadding(aliasName[0], aliasName[1], itemKey, (item.values as any)[itemKey]);
            })
          : this.styles.push(`.${propName.trim()}-${itemKey} { ${propName.trim()}: ${(item.values as any)[itemKey]};}`);

        if (propName === 'spacing') {
          this.setProperty(`size-${itemKey}`, (item.values as any)[itemKey]);
        }
      });
  }

  private generateVariables(item: ThemeItem, propName: string): void {
    for (const key in item.values) {
      if (item.values.hasOwnProperty(key)) {
        this.setProperty(key, item.values[key]);
        if (propName === 'color') {
          // generate color tint and shade variations
          if (true === true) {
            // if (!['#000000', '#ffffff'].includes(item.values[key])) {
            this.helperColorTintAndShade(item.values[key], key);
          }
          // generate text color variations
          this.styles.push(`.text-${key}{color: ${item.values[key]};}`);
          // generate background color variations
          this.styles.push(`.bg-${key}{background-color: ${item.values[key]};color: ${this.helperTextColorContrastYIQ(item.values[key])};}`);
        }
      }
    }
  }

  private generateElements(item: ThemeItem, propName: string): void {
    if (item.default) {
      this.styles.push(
        `${item.alias?.join(',')} {${Object.entries(item.default)
          .map(([cssPropName, cssValue]: [string, any]) => `${cssPropName}: ${cssValue.toString().replaceAll(';', '')};`)
          .join('')}}`,
      );
    }
    if (item.variants) {
      Object.entries(item.variants).forEach(([variantPropName, value]) => {
        this.styles.push(
          `${item.alias
            ?.map(
              (alias) =>
                `${alias}${[':', '[', '+', '>', '&', '~'].some((item) => variantPropName.trim().includes(item)) ? `${variantPropName.trim()}` : `${variantPropName.trim()}`}`,
            )
            // ?.map((alias) => `${alias}${variantPropName}`)
            .join(',')} {${Object.entries(value)
            .map(([cssPropName, cssValue]: [string, any]) => `${cssPropName}: ${cssValue.toString().replaceAll(';', '')};`)
            .join('')}}`,
        );
      });
    }
    // generate color variations
    if (item.extendColors) {
      this.helperElementColorVariants(item, propName);
    }
  }

  /**
   * Generate a link tag to add to the head
   */
  private addAsLink(): void {
    const cssVariables = `:root{ ${this.variables.join('')}} ${this.styles.join(' ')}`;
    const blob = new Blob([cssVariables]);
    const url = URL.createObjectURL(blob);
    const cssElement = document.createElement('link');
    cssElement.setAttribute('rel', 'stylesheet');
    cssElement.setAttribute('type', 'text/css');
    cssElement.setAttribute('href', url);
    document.head.appendChild(cssElement);
  }

  /**
   * Generate a style tag to add to the head
   */
  private addAsSheet(): void {
    const styleSheetElement: HTMLStyleElement = this.document.createElement('style');
    this.document.head.appendChild(styleSheetElement);
    styleSheetElement.type = 'text/css';
    const styleSheet: CSSStyleSheet | null = styleSheetElement.sheet;
    this.styles.forEach((style) => {
      styleSheet?.insertRule(style, styleSheet.cssRules.length);
    });
    const cssVariables = `:root{ ${this.variables.join('')}}`;
    styleSheet?.insertRule(cssVariables);
  }

  /**
   * Generate margin and padding variations
   * @param aliasName - alias name prefix
   * @param key - value
   * @returns string
   */
  private helperMarginAndPadding(property: string, alias: string, key: string, value: any): void {
    const variations: string[] = ['top:t', 'bottom:b', 'left:s', 'right:e', 'x', 'y'];
    variations.map((variant) => {
      const variantName = variant.split(':');
      let content = ``;
      if (variantName[0] === 'x') {
        content = `${property.trim()}-left: ${value};${property.trim()}-right: ${value};`;
      } else if (variantName[0] === 'y') {
        content = `${property.trim()}-top: ${value};${property.trim()}-bottom: ${value};`;
      } else {
        content = `${property.trim()}-${variantName[0]}: ${value};`;
      }
      this.styles.push(
        `.${alias}${variantName[1] || variantName[0]}-${isNaN(Number(key)) || parseFloat(key) % 1 === 0 ? `${key}` : `${parseInt(key, 10).toString()}-half`}{${content}}`,
      );
    });
  }

  private helperElementColorVariants(item: ThemeItem, propName: string): void {
    const config = {
      states: { checked: 600, hover: 600, focus: 700, active: 800, visited: 900, disabled: 300 },
      styles: { solid: '', outline: 'outline', ghost: 'ghost' },
    };
    // generate states using function
    const generate = (selector: string, colorName: string, hex: string): void => {
      Object.entries(config.states).forEach(([state, value]: [string, number]) => {
        const variation = `${selector
          .split(',')
          ?.map((aliasName) => `${aliasName}:${state}`)
          .join(',')} {
            background-color: ${state === 'active' && propName === 'check' ? `var(--light-500)` : `var(--${colorName}-${value})`};
            border-color: ${state === 'active' && propName === 'check' ? `var(--${colorName}-300)` : `var(--${colorName}-${value})`};
            ${
              !['hover', 'disabled', 'checked'].includes(state)
                ? `box-shadow: 0 0 0 0.25rem ${['light', 'white'].includes(colorName) ? this.adjustColor(hex, -10) : `${hex}80`};`
                : `box-shadow: none;`
            };
            color: ${this.helperTextColorContrastYIQ(hex)};}`;
        propName !== 'check' && !['checked', 'disabled'].includes(state) && this.styles.push(variation);
        propName === 'check' && this.styles.push(variation);
      });
    };
    if (this.theme['color'].values) {
      Object.entries(this.theme['color'].values).map(([colorName, hex]: [string, string]) => {
        // generate styles
        Object.entries(config.styles).forEach(([style, value]: [string, string]) => {
          const variation =
            item.alias
              ?.map((aliasName) => {
                const selector = `${aliasName}-${style}-${colorName}${
                  style === 'solid' ? `, ${aliasName}-${colorName}` : colorName === 'primary' ? `, ${aliasName}-${style}` : ''
                }`;
                generate(selector, colorName, hex);

                return selector;
              })
              .join(',') +
            `{background-color: ${style === 'solid' ? `var(--${colorName}-500)` : `transparent`};
              border-color: ${style === 'ghost' ? `transparent` : `var(--${colorName}-500)`};
              color: ${style === 'solid' ? `${this.helperTextColorContrastYIQ(hex)}` : `var(--${colorName}-500)`};}`;
          this.styles.push(variation);
        });
      });
    }
  }

  /**
   * Color contrast calculation
   *
   * @param color Given color in hex format
   * @param amount Amount of contrast to generate
   * @returns string
   */
  private helperColorTintAndShade(color: string, colorName: string): void {
    const ratios: number[] = [-60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
    ratios.forEach((item: number, index: number) => {
      const variable = this.adjustColor(color, item);
      this.setProperty(`${colorName}-${(ratios.length - index - 1) * 100}`, variable);
    });
  }

  // Source: https://stackoverflow.com/a/57401891/2184182
  private adjustColor(color: string, amount: number): string {
    return '#' + color.replace(/^#/, '').replace(/../g, (color) => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  /**
   * Add style variable to variable list
   * @param property - css property name
   * @param value - css property value
   */
  private setProperty(property: string, value: string): void {
    this.variables.push(`--${property}: ${value};`);
  }

  // Source: https://24ways.org/2010/calculating-color-contrast
  private helperTextColorContrastYIQ(hexcolor: string): string {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    // eslint-disable-next-line no-mixed-operators
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? this.theme['color']?.values?.['dark'] || '#000000' : this.theme['color']?.values?.['white'] || '#ffffff';
  }
}
