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


export async function getQuizzesByTopic(topicName, page){
  const response = await fetch(
    API_URL + "/quiz/search/" + topicName + "?page=" + page
  );

  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.message
    throw new Error(errorMessage)
  }
  return resData;
}

export async function getQuizzesByTopicAuth(topicName, token, page){
  const response = await fetch(
    API_URL + "/quiz/search/auth/" + topicName + '?page='+page,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
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

    console.log("response", resData)
    return resData;
}

export async function getTheThenPopularQuizAuth(token, page) {
  const response = await fetch(
    API_URL + "/quiz/auth/popularQuiz?page="+page, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();

  return resData;
}



export async function getMyQuizzesInDashboard(token, page){
  const response = await fetch(API_URL + "/quiz/quizzes?page="+page, {
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


export async function getTheDraftQuiz(token, page){
  const response = await fetch(`${API_URL}/quiz/draft?page=${page}`, {
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


export async function getQuestionForSpecificQuiz(quizId, token) {
  const response = await fetch(
    `${API_URL}/user/my-questions/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data } = await response.json();
  return data;
}

export async function postQuestionFromDashboard(quizId, data, token) {
  const response = await fetch(
    `${API_URL}/quiz/add-question/${quizId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message)
  }
  return resData;
}

export async function putQuestionFromDashboard(quizId, data, token, questionId) {
  const response = await fetch(
    `${API_URL}/user/update-question/${quizId}/${questionId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message)
  }
  return resData;
}

export async function deleteNotification(notificationId, token){
  const response = await fetch(
    API_URL + "/user/notifications/" + notificationId,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}


export async function getStatistiques(token){
  const response = await fetch(
    API_URL + "/user/statistique",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const dataStatistique = await response.json();

  return dataStatistique;
}


export async function notifications(token){
  const response = await fetch(
    API_URL + "/user/notifications",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const resData = await response.json();

  return resData;
}