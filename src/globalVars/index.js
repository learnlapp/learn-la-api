module.exports = function globalVars() {
  return async app => {
    try {
      const [studentAppSettings, teacherAppSettings] = await Promise.all([
        app
          .service('settings')
          .find({ query: { platform: 'student' }, paginate: false }),
        app
          .service('settings')
          .find({ query: { platform: 'teacher' }, paginate: false }),
      ]);

      app.set('appSettings', {
        student: studentAppSettings[0],
        teacher: teacherAppSettings[0],
      });

      app.service('settings').on('patched', data => {
        const appSettings = app.get('appSettings');
        app.set('appSettings', { ...appSettings, [data.platform]: data });
        // console.log('updated settings', app.get('appSettings'));
      });
    } catch (err) {
      console.log('Eroor fetching app settings: ', err);
    }
  };
};
