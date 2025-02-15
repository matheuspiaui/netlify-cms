import React from 'react';
import { css, Global } from '@emotion/core';

/**
 * Font Stacks
 */
const fonts = {
  primary: `
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  `,
  mono: `
    'SFMono-Regular',
    Consolas,
    "Liberation Mono",
    Menlo,
    Courier,
    monospace;
  `,
};

/**
 * Theme Colors
 */
const colorsRaw = {
  white: '#fff',
  grayLight: '#eff0f4',
  gray: '#798291',
  grayDark: '#313d3e',
  blue: '#3a69c7',
  blueLight: '#e8f5fe',
  green: '#005614',
  greenLight: '#caef6f',
  brown: '#754e00',
  yellow: '#ffee9c',
  red: '#ff003b',
  redLight: '#fcefea',
  purple: '#70399f',
  purpleLight: '#f6d8ff',
  teal: '#17a2b8',
  tealLight: '#ddf5f9',
  verdin: '#14cc49',
  verdinClarin: '#e9faee',
};

const colors = {
  statusDraftText: colorsRaw.purple,
  statusDraftBackground: colorsRaw.purpleLight,
  statusReviewText: colorsRaw.Brown,
  statusReviewBackground: colorsRaw.yellow,
  statusReadyText: colorsRaw.green,
  statusReadyBackground: colorsRaw.greenLight,
  text: colorsRaw.gray,
  textLight: colorsRaw.white,
  textLead: colorsRaw.grayDark,
  background: '#f3f3f4',
  foreground: colorsRaw.white,
  active: colorsRaw.verdin,
  activeBackground: colorsRaw.verdinClarin,
  inactive: colorsRaw.gray,
  button: colorsRaw.verdin,
  buttonText: colorsRaw.white,
  inputBackground: colorsRaw.white,
  infoText: colorsRaw.verdin,
  infoBackground: colorsRaw.verdinClarin,
  successText: colorsRaw.green,
  successBackground: colorsRaw.greenLight,
  warnText: colorsRaw.brown,
  warnBackground: colorsRaw.yellow,
  errorText: colorsRaw.red,
  errorBackground: colorsRaw.redLight,
  textFieldBorder: '#dfdfe3',
  controlLabel: '#7a8291',
  checkerboardLight: '#f2f2f2',
  checkerboardDark: '#e6e6e6',
};

const lengths = {
  topBarHeight: '56px',
  inputPadding: '16px 20px',
  borderRadius: '5px',
  richTextEditorMinHeight: '300px',
  borderWidth: '2px',
  topCardWidth: '682px',
  pageMargin: '28px 18px',
  objectWidgetTopBarContainerPadding: '0 14px 14px',
};

const borders = {
  textField: `solid  ${lengths.borderWidth} ${colors.textFieldBorder}`,
};

const transitions = {
  main: '.2s ease',
};

const shadows = {
  drop: css`
    box-shadow: 0 2px 4px 0 rgba(19, 39, 48, 0.12);
  `,
  dropMain: css`
    box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.05), 0 1px 3px 0 rgba(68, 74, 87, 0.1);
  `,
  dropMiddle: css`
    box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.15), 0 1px 3px 0 rgba(68, 74, 87, 0.3);
  `,
  dropDeep: css`
    box-shadow: 0 4px 12px 0 rgba(68, 74, 87, 0.15), 0 1px 3px 0 rgba(68, 74, 87, 0.25);
  `,
  inset: css`
    box-shadow: inset 0 0 4px rgba(68, 74, 87, 0.3);
  `,
};

const gradients = {
  checkerboard: `
    linear-gradient(
      45deg,
      ${colors.checkerboardDark} 25%,
      transparent 25%,
      transparent 75%,
      ${colors.checkerboardDark} 75%,
      ${colors.checkerboardDark}
    )
  `,
};

const effects = {
  checkerboard: css`
    background-color: ${colors.checkerboardLight};
    background-size: 16px 16px;
    background-position: 0 0, 8px 8px;
    background-image: ${gradients.checkerboard}, ${gradients.checkerboard};
  `,
};

const badge = css`
  font-size: 13px;
  line-height: 1;
`;

const backgroundBadge = css`
  ${badge};
  display: block;
  border-radius: ${lengths.borderRadius};
  padding: 4px 10px;
  text-align: center;
`;

const textBadge = css`
  ${badge};
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
`;

const card = css`
  ${shadows.dropMain};
  border-radius: 5px;
  background-color: #fff;
`;

const buttons = {
  button: css`
    border: 0;
    border-radius: ${lengths.borderRadius};
    cursor: pointer;
  `,
  default: css`
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    padding: 0 15px;
    background-color: ${colorsRaw.gray};
    color: ${colorsRaw.white};
  `,
  medium: css`
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 3px;
    padding: 0 24px 0 14px;
  `,
  small: css`
    height: 23px;
    line-height: 23px;
  `,
  gray: css`
    background-color: ${colors.button};
    color: ${colors.buttonText};

    &:focus,
    &:hover {
      color: ${colors.white};
      background-color: #555a65;
    }
  `,
  green: css`
    background-color: #aae31f;
    color: ${colorsRaw.green};
  `,
  lightRed: css`
    background-color: ${colorsRaw.redLight};
    color: ${colorsRaw.red};
  `,
  lightBlue: css`
    background-color: ${colorsRaw.blueLight};
    color: ${colorsRaw.blue};
  `,
  lightTeal: css`
    background-color: ${colorsRaw.tealLight};
    color: #1195aa;
  `,
  teal: css`
    background-color: ${colorsRaw.teal};
    color: ${colorsRaw.white};
  `,
  disabled: css`
    background-color: ${colorsRaw.grayLight};
    color: ${colorsRaw.gray};
  `,
};

const components = {
  card,
  caretDown: css`
    color: ${colorsRaw.white};
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid currentColor;
    border-radius: 2px;
  `,
  badge: css`
    ${backgroundBadge};
    color: ${colors.infoText};
    background-color: ${colors.infoBackground};
  `,
  badgeSuccess: css`
    ${backgroundBadge};
    color: ${colors.successText};
    background-color: ${colors.successBackground};
  `,
  badgeDanger: css`
    ${backgroundBadge};
    color: ${colorsRaw.red};
    background-color: #fbe0d7;
  `,
  textBadge: css`
    ${textBadge};
    color: ${colors.infoText};
  `,
  textBadgeSuccess: css`
    ${textBadge};
    color: ${colors.successText};
  `,
  textBadgeDanger: css`
    ${textBadge};
    color: ${colorsRaw.red};
  `,
  loaderSize: css`
    width: 2.28571429rem;
    height: 2.28571429rem;
  `,
  cardTop: css`
    ${card};
    width: ${lengths.topCardWidth};
    max-width: 100%;
    padding: 18px 20px;
    margin-bottom: 28px;
  `,
  cardTopHeading: css`
    font-size: 22px;
    font-weight: 600;
    line-height: 37px;
    margin: 0;
    padding: 0;
  `,
  cardTopDescription: css`
    max-width: 480px;
    color: ${colors.text};
    font-size: 14px;
    margin-top: 8px;
  `,
  objectWidgetTopBarContainer: css`
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
  dropdownList: css`
    ${shadows.dropDeep};
    background-color: ${colorsRaw.white};
    border-radius: ${lengths.borderRadius};
    overflow: hidden;
  `,
  dropdownItem: css`
    ${buttons.button};
    background-color: transparent;
    border-radius: 0;
    color: ${colorsRaw.gray};
    font-weight: 500;
    border-bottom: 1px solid #eaebf1;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-of-type {
      border-bottom: 0;
    }

    &:hover,
    &:active,
    &:focus {
      color: ${colors.active};
      background-color: ${colors.activeBackground};
    }
  `,
};

const reactSelectStyles = {
  control: styles => ({
    ...styles,
    border: 0,
    boxShadow: 'none',
    padding: '9px 0 9px 12px',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? `${colors.active}`
      : state.isFocused
      ? `${colors.activeBackground}`
      : 'transparent',
    paddingLeft: '22px',
  }),
  menu: styles => ({ ...styles, right: 0, zIndex: 2 }),
  container: styles => ({ ...styles, padding: '0 !important' }),
  indicatorSeparator: (styles, state) =>
    state.hasValue && state.selectProps.isClearable
      ? { ...styles, backgroundColor: `${colors.textFieldBorder}` }
      : { display: 'none' },
  dropdownIndicator: styles => ({ ...styles, color: `${colors.controlLabel}` }),
  clearIndicator: styles => ({ ...styles, color: `${colors.controlLabel}` }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: colors.background,
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: colors.textLead,
    fontWeight: 500,
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: colors.controlLabel,
    ':hover': {
      color: colors.errorText,
      backgroundColor: colors.errorBackground,
    },
  }),
};

const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }

      :focus {
        outline: -webkit-focus-ring-color auto ${lengths.borderRadius};
      }

      /**
       * Don't show outlines if the user is utilizing mouse rather than keyboard.
       */
      [data-whatintent='mouse'] *:focus {
        outline: none;
      }

      input {
        border: 0;
      }

      body {
        font-family: ${fonts.primary};
        font-weight: normal;
        background-color: ${colors.background};
        color: ${colors.text};
        margin: 0;
      }

      ul,
      ol {
        padding-left: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        font-family: ${fonts.primary};
        color: ${colors.textLead};
        font-size: 15px;
        line-height: 1.5;
        margin-top: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 500;
      }

      h1 {
        font-size: 24px;
        letter-spacing: 0.4px;
        color: ${colors.textLead};
      }

      a,
      button {
        font-size: 14px;
        font-weight: 500;
      }

      a {
        color: ${colors.text};
        text-decoration: none;
      }

      img {
        max-width: 100%;
      }

      textarea {
        resize: none;
      }
    `}
  />
);

export {
  fonts,
  colorsRaw,
  colors,
  lengths,
  components,
  buttons,
  shadows,
  borders,
  transitions,
  effects,
  reactSelectStyles,
  GlobalStyles,
};
