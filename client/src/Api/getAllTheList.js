export const getAllTheLists = (email) => {
  let x = new Promise(async (resolve, reject) => {
    const result = await fetch(
      `${process.env.REACT_APP_BASE_URL}getAllTheListOfTheUser`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    ).then((response) => resolve(response.json()));
  });
  return x.then((data) => data).catch((err) => err);
};
