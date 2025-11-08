export const fetchAllQuestionsTextOnly = async () => {
  const urls = [
    "http://localhost:3000/api/os",
    "http://localhost:3000/api/dbms",
    "http://localhost:3000/api/cn",
    "http://localhost:3000/api/oops",
  ];
  const allQuestions = [];

  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log("✅ Fetched from:", url, data);
    data.forEach((q) => allQuestions.push(q.question));
  }

  return allQuestions;
};
