import toPersianDigits from "./toPersianDigits";

export default function addSizePrefix(size = 0) {
  const postfix = size > 10 ** 9 ? "گیگابایت" : "مگابایت";
  const decimal = size > 10 ** 9 ? 9 : 6;

  return {
    size:
      toPersianDigits(
        (Math.round((size / 10 ** decimal) * 100) / 100).toString()
      ) +
      " " +
      postfix,
    postfix
  };
}
