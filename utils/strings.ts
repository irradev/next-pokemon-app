const wordCapitalize = (name: string): string => {
  return name[0].toUpperCase() + name.substring(1);
};

const exportedFunctions = {
  wordCapitalize,
};

export default exportedFunctions;
