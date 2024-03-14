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


export async function getCommentsForQuiz(quizId, token){
  const response = await fetch(
    `${API_URL}/user/comment-quiz/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();

  return resData;
}

export async function postCreateComments(quizId, text, token){
  const response = await fetch(
    `${API_URL}/user/comment-quiz`,
    {
      method: "POST",
      body: JSON.stringify({ quizId: quizId, text: text }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();

  return resData;
}


export async function getTheDraftQuiz(token){
  const response = await fetch(`${API_URL}/user/draft`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw Error(resData.message);
  }
  return resData;
}


export async function getSingleQuizToDashboard(quizId, token){
  const response = await fetch(
    `${API_URL}/quiz/update/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const quizData = await response.json();

  return quizData;
}


export async function putHandleUpdateQuiz(quizUpdated, quizId, token){
  const formData = new FormData();
  for (const key in quizUpdated) {
    formData.append(key, quizUpdated[key]);
  }
  const response = await fetch(`${API_URL}/user/update-quiz/${quizId}`,
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("");
  }

  const resMessage = await response.json();
}


export async function putUpdateUserData(updateUserData, token) {
  const response = await fetch(API_URL + "/user/profile", {
      method: "PUT",
      body: JSON.stringify(updateUserData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    const resData = await response.json();
    return resData;
}


export async function postTheScore(quizId, score, token){
  const response = await fetch(
    `${API_URL}/user/score-quiz/${quizId}`,
    {
      method: "POST",
      body: JSON.stringify({ score }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();
}