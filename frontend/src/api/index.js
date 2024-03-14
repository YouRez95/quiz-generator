const API_URL = import.meta.env.VITE_API_URL;

export async function createUser(data) {
  const response = await fetch(
    API_URL + "/user/signup",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.errors[0]?.msg;
    throw new Error(errorMessage);
  }

  return resData;
}


export async function loginUser(data) {
  const response = await fetch(
    API_URL + "/user/login",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.errors[0]?.msg;
    throw new Error(errorMessage);
  }

  return resData
}



export async function createQuiz(data, token) {
  const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await fetch(API_URL + "/quiz/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resMessage = await response.json();

    if (!response.ok) {
      const errorMessage = resMessage.message
      throw new Error(errorMessage)
    }

    return resMessage;
}


export async function createQuestion(data, token, id) {

  const response = await fetch(API_URL + "/quiz/" + id, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await response.json();

    if (!response.ok) {
      console.log(resData)
      const errorMessage = resData.message
      throw new Error(errorMessage)
    }

    return resData;
}


export async function getNumberOfQuestion(token, id) {
  const response = await fetch(
    API_URL + "/quiz/number/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.message
    throw new Error(errorMessage)
  }

  return resData;
}


export async function getQuizzesByTopic(topicName){
  const response = await fetch(
    API_URL + "/quiz/search/" + topicName
  );

  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.message
    throw new Error(errorMessage)
  }
  return resData;
}



export async function getTheThenPopularQuiz() {
    const response = await fetch(
      API_URL + "/quiz/popularQuiz"
    );

    const resData = await response.json();

    return resData;
}



export async function getMyQuizzesInDashboard(token){
  const response = await fetch(API_URL + "/user/quizzes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      const errorMessage = resData.message;
      throw new Error(errorMessage);
    }
    
    return resData;
}



export async function likeOrDislikeQuiz(token, quizId) {
  const response = await fetch(
    API_URL + "/user/like-quiz",
    {
      method: "POST",
      body: JSON.stringify({ quizId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message)
  }
  return resData;
}


export async function getSingleQuizToPlay(id){
  const response = await fetch(`${API_URL}/quiz/${id}`);
  const quizData = await response.json();

  if (!response.ok) {
    throw new Error(quizData.message);
  }

  return quizData
}