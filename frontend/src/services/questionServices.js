export const fetchAllQuestionsTextOnly = async () => {
  const urls = [
    "http://localhost:3000/api/dsa",
    "http://localhost:3000/api/os",
    "http://localhost:3000/api/dbms",
    "http://localhost:3000/api/cn",
  ];

  const allQuestions = [];

  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // Extract only question text
    data.forEach((q) => allQuestions.push(q.question));
  }

  return allQuestions;
};
