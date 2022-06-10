

const checkRole =  (permissions, reqType) => {
    const isRole = permissions.some((per) => {
      return per.method === reqType.method && per.uri === reqType.path;
    });
    return isRole;
  };

  module.exports = {checkRole}