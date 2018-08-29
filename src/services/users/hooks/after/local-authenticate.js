module.exports = function() {
  return async context => {
    const res = await context.app.service('authentication').create({
      strategy: 'local',
      phone: context.data.phone,
      password: context.data.password,
    });

    return context;
  };
};
