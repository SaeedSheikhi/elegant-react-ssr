export default data => {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return data.replace(/[0-9]/g, w => id[+w]);
};
