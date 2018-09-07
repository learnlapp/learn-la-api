module.exports = function processDataFromFacebook() {
  return context => {
    const { profile } = context.data;

    const { id, email, name, gender, birthday, picture } = profile._json;
    const data = {
      facebookId: id,
      email,
      name,
      gender: gender ? gender.toLowerCase() : undefined,
      birthday: birthday ? birthday : undefined,
      avatar: picture && picture.data ? picture.data.url : undefined,
    };

    context.data = data;
    return context;
  };
};
