export const generateRefCode = () => {
  return `REF_AUTO_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};
