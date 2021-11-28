export const registerUser = (mail, pw, name) => {
  let x = new Promise(async (resolve, reject) => {
    const result = await fetch(`${process.env.REACT_APP_BASE_URL}register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: mail, password: pw, name: name }),
    }).then((response) => resolve(response.json()));
  });
  return x.then((data) => data).catch((err) => err);
};
