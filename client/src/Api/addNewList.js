export const addNewList = (title, description, email) => {
  let x = new Promise(async (resolve, reject) => {
    const result = await fetch(`${process.env.REACT_APP_BASE_URL}newList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        email: email,
      }),
    }).then((response) => resolve(response.json()));
  });
  return x.then((data) => data).catch((err) => err);
};
