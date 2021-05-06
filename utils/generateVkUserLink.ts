const generateVkUserLink = (userId: number, firstName?: string): string => {
  if (firstName === undefined) {
    return `@id${userId}`;
  } else {
    return `@id${userId} (${firstName})`;
  }
};

export default generateVkUserLink;
