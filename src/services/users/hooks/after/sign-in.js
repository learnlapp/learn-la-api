module.exports = function() {
  return async context => {
    const { action } = context.params;

    if (action === 'phone-sign-up') {
      const { phone, password } = context.data;
      const response = await context.app.service('authentication').create({
        strategy: 'local',
        phone: '85296344902',
        password: '1234',
      });
      // const response = await context.app.authenticate({
      //   strategy: 'local',
      //   phone: '85296344902',
      //   password: '1234',
      // });
      console.log('signed', response);
      context.result = response;
      return context;
    }

    // return context;
  };
};
