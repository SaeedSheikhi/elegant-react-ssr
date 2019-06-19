import { css } from 'glamor';

export default function isLtr (str) {
  return str.charCodeAt(0) < 1570;
}

export const rules = {
  compress: css({
    lineHeight: '1.2',
  }),
};
